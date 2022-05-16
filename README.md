# Dobby Treats

A present for Dobby (a.k.a. Dobişko) :)

The contracts are:

- [DobbyToken](./contracts/contracts/DobbyToken.sol) is the utility token
- [DobbyTreats](./contracts/contracts/DobbyTreatsNFT.sol) are unique NFTs. Each NFT is represented by a dog treat. It may have the following properties, defined by its 32-digit DNA:
  - **(x4) Treat Flavor**: Chicken (0, 1, 2), Beef (3, 4, 5), Fish (5, 6, 7), Bacon (8, 9)
  - **(x5) Package Color**: Blue (0, 1), Green (2, 3), Orange (4, 5), White (6, 7), Red (8, 9)
  - **(x4) Background**: Beach (0, 1, 2), Mountain (3, 4, 5), Park (5, 6, 7), Moon (8, 9)
  - **(x4) Plate**: Plastic, Metal, Ceramic, Bed
- [DobbyDAO](./contracts/contracts/DobbyDAO.sol) a decentralized autonomous organization, where voting power is determined by NFTs that are owned.
