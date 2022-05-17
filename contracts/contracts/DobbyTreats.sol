// contracts/BadgeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DobbyTreats is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string public baseTokenURI;
  uint256 public totalSupply;

  constructor() ERC721("DobbyTreats", "DOBBY") {
    baseTokenURI = "";
    totalSupply = 10000;
  }

  function mintNFT(address receiver) external onlyOwner returns (uint256) {
    _tokenIds.increment();
    require(totalSupply >= _tokenIds.current(), "Total Supply reached");
    uint256 newNftTokenId = _tokenIds.current();
    _mint(receiver, newNftTokenId);
    return newNftTokenId;
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    return string(abi.encodePacked(_baseURI(), Strings.toString(_tokenId)));
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
    baseTokenURI = _baseTokenURI;
  }
}
