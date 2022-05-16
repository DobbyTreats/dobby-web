// contracts/BadgeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./DobbyTreatFactory.sol";

contract DobbyTreats is DobbyTreatsFactory, ERC721 {
  using SafeMath for uint256;

  mapping(uint256 => address) treatApprovals;

  function balanceOf(address _owner) external view returns (uint256) {
    return ownerTreatCount[_owner];
  }

  function ownerOf(uint256 _tokenId) external view returns (address) {
    return treatToOwner[_tokenId];
  }

  function _transfer(
    address _from,
    address _to,
    uint256 _tokenId
  ) private {
    ownerTreatCount[_to] = ownerTreatCount[_to].add(1);
    ownerTreatCount[msg.sender] = ownerTreatCount[msg.sender].sub(1);
    treatToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  ) external payable {
    require(treatToOwner[_tokenId] == msg.sender || treatApprovals[_tokenId] == msg.sender);
    _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
    treatApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }
}
