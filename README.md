# Remote 🚀

Remote is project built during ETHGlobal Prague. It's a chain abstraction protocol that simplifies access to DeFi across any blockchain. It uses cross-chain messaging and remote smart accounts tied to the same wallet address across networks, allowing users to interact with top DeFi protocols through a single transaction, no matter which chain they are on.

## How is it made?

The Remote frontend is built with Next.js, and the smart contracts are written using Foundry. At the heart of the system is the Remote contract, which is based on Safe smart accounts and includes custom logic to support cross-chain messaging through Stargate by LayerZero.

When a user wants to make a deposit, their funds are bridged to the destination chain along with a message. This message tells the Safe account on the destination chain what to do, such as swapping tokens and depositing into Aave on Base. A user can open several positions on different chains with just one transaction.

When withdrawing, the user sends a message to the destination chain that includes instructions to withdraw from a protocol like Aave and send the funds back to the original chain. These deposit and withdrawal processes are handled in a single transaction using Stargate’s Compose feature.

Remote smart accounts are deployed on Flow, Flare, Rootstock, Base, and Arbitrum, but potentially many more L2. These accounts are built with Safe so users always have full control and a backup mechanism in emergency cases.

To help users find the best DeFi opportunities, Remote uses the Portals.fi API, which makes it easier to discover and interact with protocols across chains.

## Bounties

- **Layer0**: Remote uses Layer0 cross-chain messaging system, through Stargate, to send transactions and tokens from a source chain to a destination chain, where the desired DeFi protocol lives
- **Flow**: We deployed the smart account and the factory on Flow blockchain and performed many transactions from Flow to other chains
- **Rootstock**: Similarly as above, we deployed on the Rootstock blockchain to give access to many DeFi protocols to every Bitcoin user

## Installation Steps

Choose your preferred package manager:

```bash
# Using npm
npm install && npm run dev

# Using yarn
yarn install && yarn dev

# Using pnpm
pnpm install && pnpm dev
```

## Useful links

- [ETHGlobal](https://ethglobal.com/showcase/remote-913v9)
- [Vercel dApp](https://remote-eight.vercel.app/)
- [Smart Contract Repo](https://github.com/builders-garden/remote-smart-contracts)

## Team

This project was build by:

- [blackicon.eth](https://x.com/TBlackicon)
- [Frankc](https://x.com/Frankc_eth)
- [Drone](https://x.com/SolidityDrone)
