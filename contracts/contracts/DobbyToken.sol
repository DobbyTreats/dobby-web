// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DobbyToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("Dobby Treats", "DOBBI") {
    _mint(msg.sender, initialSupply);
  }
}
