// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../contracts/DobbyToken.sol";

contract DobbyDEX {
  DobbyToken public token;
  address public dobbyTokenAddress;
  uint256 public price = 0.001 ether;

  event Bought(uint256 amount);
  event Sold(uint256 amount);

  constructor(uint256 initialSupply) {
    token = new DobbyToken(initialSupply); // deploy the DobbyToken contract
    dobbyTokenAddress = address(token);
  }

  function _getAmount(uint256 value) internal view returns (uint256) {
    return value / price;
  }

  function buy() public payable {
    uint256 amountTobuy = _getAmount(msg.value);
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
  }

  function sell(uint256 amount) public {
    // Check if amount is positive
    require(amount > 0, "You need to sell at least some tokens");

    // Check if sender has allowed DEX to take this much
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");

    // Transfer amount from sender to this DEX
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount * price);

    emit Sold(amount);
  }
}
