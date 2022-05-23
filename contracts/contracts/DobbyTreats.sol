// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./DobbyToken.sol";

contract DobbyTreats is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  DobbyToken public token;
  address public dobbyTokenAddress;

  string private baseTokenURI = "";
  uint256 public totalSupply;

  constructor(address _dobbytokenAddress, uint256 _totalSupply) ERC721("DobbyTreats", "DOBBY") {
    totalSupply = _totalSupply;
    token = DobbyToken(_dobbytokenAddress);
    dobbyTokenAddress = _dobbytokenAddress;
  }

  /**
   * @dev mints an NFT to the receiver. Only the owner can execute this.
   */
  function mintNFT(address receiver) external onlyOwner returns (uint256) {
    _tokenIds.increment();
    require(totalSupply >= _tokenIds.current(), "Total Supply reached");
    uint256 newNftTokenId = _tokenIds.current();
    _mint(receiver, newNftTokenId);
    return newNftTokenId;
  }

  /**
   * @dev the base URI for all tokens, used by ERC-721 within.
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /**
   * @dev change the base URI
   */
  function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
    baseTokenURI = _baseTokenURI;
  }
}
