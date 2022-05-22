// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../contracts/DobbyToken.sol";

contract DobbyDEX is Ownable {
  DobbyToken public token;
  address public dobbyTokenAddress;
  uint256 public price = 0.001 ether;

  event Bought(uint256 amount);
  event Sold(uint256 amount);

  constructor(address _dobbytokenAddress) {
    token = DobbyToken(_dobbytokenAddress);
    dobbyTokenAddress = _dobbytokenAddress;
  }

  /**
   * @dev returns the amount of tokens for a given amount of ether value
   */
  function _getAmount(uint256 value) internal view returns (uint256) {
    return value / price; // @todo  is this vulnerable?
  }

  /**
   * @dev sets the price of 1 Dobby Token to given value
   */
  function setPrice(uint256 value) external onlyOwner {
    price = value;
  }

  function buy() public payable {
    // find the amount to buy w.r.t price
    uint256 amountTobuy = _getAmount(msg.value);
    require(amountTobuy > 0, "You need to send some ether");

    // see if the DEX has that many
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");

    // transfer tokens from DEX to the sender
    // no allowance needed as DEX is the owner
    token.transfer(msg.sender, amountTobuy);

    emit Bought(amountTobuy);
  }

  function sell(uint256 amount) public {
    // check if amount is positive
    require(amount > 0, "You need to sell at least some tokens");

    // check if sender has allowed DEX to take this much
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");

    // transfer amount from sender to this DEX
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount * price);

    emit Sold(amount);
  }
}
