import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/utils/math/SafeMath.sol";

contract DobbyTreatFactory is Ownable {
  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event NewTreat(uint256 treatId, string name, uint256 dna);

  uint256 dnaDigits = 32;
  uint256 reservedModulus = 1000; // last 3 digits will be reserved
  uint256 dnaModulus = 10**dnaDigits;

  struct Treat {
    string name;
    uint256 dna;
  }

  Treat[] public treats;

  mapping(uint256 => address) public treatToOwner;
  mapping(address => uint256) ownerTreatCount;

  function _createTreat(string memory _name, uint256 _dna) internal {
    uint256 id = treats.push(Treat(_name, _dna)) - 1;
    treatToOwner[id] = msg.sender;
    ownerTreatCount[msg.sender] = ownerTreatCount[msg.sender].add(1);
    emit NewTreat(id, _name, _dna);
  }

  function _generateRandomDna(string memory _str) private view returns (uint256) {
    uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomTreat(string memory _name) public {
    require(ownerTreatCount[msg.sender] == 0);
    uint256 randDna = _generateRandomDna(_name);

    // reserve last few digits for future use
    randDna = randDna - (randDna % reservedModulus);

    _createTreat(_name, randDna);
  }
}
