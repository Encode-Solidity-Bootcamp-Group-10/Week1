# Group 10

# Weekend Project

- Form groups of 3 to 5 students
- Structure scripts to
  - Deploy
  - Query proposals
  - Give vote right passing an address as input
  - Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment
  - Delegate my vote passing user address as input and using the wallet in environment
  - Query voting result and print to console
- Publish the project in Github
- Run the scripts with a set of proposals, cast and delegate votes and inspect results
- Write a report detailing the addresses, transaction hashes, description of the operation script being executed and console output from script execution for each step (Deployment, giving voting rights, casting/delegating and querying results).
- (Extra) Use TDD methodology

# 1-Deploy

## Execution

yarn run ts-node --files ./scripts/Ballot/deployment.ts Proposal1 Proposal2 Proposal3 Proposal4

## Console.log

Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99

Wallet balance 5

Deploying Ballot contract

Proposals:

Proposal N. 1: Proposal1

Proposal N. 2: Proposal2

Proposal N. 3: Proposal3

Proposal N. 4: Proposal4

Awaiting confirmations

Completed

Contract deployed at 0x84cBdaC8288061750a97Dc0631482712AcE616d2

# 2-Query Proposals

## Execution

yarn run ts-node --files ./scripts/Ballot/2-query-proposals.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2

## Console.log

Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Query Proposals:

Proposal N. 1: Proposal1

Proposal N. 2: Proposal2

Proposal N. 3: Proposal3

Proposal N. 4: Proposal4

# 3-Give vote right passing an address as input

## Execution

yarn run ts-node --files ./scripts/Ballot/3-giveVotingRights.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2 0x4377CCB6c89659c47675a1f99315FCDDa9F48E0a

yarn run ts-node --files ./scripts/Ballot/3-giveVotingRights.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2 0x732e645406536097EF5238753113728812284fE6

yarn run ts-node --files ./scripts/Ballot/3-giveVotingRights.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2 0xF233d122F96fFb3A283E712B4c439cba176C548d

yarn run ts-node --files ./scripts/Ballot/3-giveVotingRights.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2 0x3dF475F4c39912e142955265e8f5c38dAd286FE3

## Console.log

Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99

Wallet balance 4.998275191991951

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Giving right to vote to 0x4377CCB6c89659c47675a1f99315FCDDa9F48E0a

Awaiting confirmations

Transaction completed. Hash: 0x82a00af531398aa0f211e49c072d70d9010df3b6dfca82b65a1023c940e82ccb

Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99

Wallet balance 4.998202206491562

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Giving right to vote to 0x732e645406536097EF5238753113728812284fE6

Awaiting confirmations

Transaction completed. Hash: 0xb8163a8566ac36966b427372000610c615dc07a510a1f089e094a8fde3acd060

Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99

Wallet balance 4.998129220991221

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Giving right to vote to 0xF233d122F96fFb3A283E712B4c439cba176C548d

Awaiting confirmations

Transaction completed. Hash: 0xf49ae2fe5abeeab463ba589ff823d3b9141681ea72db0cbac78748bfbd583a09

Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99

Wallet balance 4.99805623549088

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Giving right to vote to 0x3dF475F4c39912e142955265e8f5c38dAd286FE3

Awaiting confirmations

Transaction completed. Hash: 0x8ed5c83749f5a5b6bc8f9984b061322c9b56701c731a0d835b1df2b726308b64

# 4-Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment

## Execution

yarn run ts-node --files ./scripts/Ballot/4-cast-vote.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2 0

## Console.log

Using address 0x3dF475F4c39912e142955265e8f5c38dAd286FE3

Wallet balance 0.1

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Cast a vote to proposal 0 for Wallet 0x3dF475F4c39912e142955265e8f5c38dAd286FE3

Awaiting confirmations

Transaction completed. Hash: 0xada71f57d976e69fc9914b5c331c991b32054848150fd188db2ddc19d3d31e6a

# 5-Delegate my vote passing user address as input and using the wallet in environment

## Execution

yarn run ts-node --files ./scripts/Ballot/5-delegate-vote.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2 0x95C1593f28d4623CB31E3510A929106283dE0D99

## Console.log

Using address 0xF233d122F96fFb3A283E712B4c439cba176C548d

Wallet balance 0.1

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Delegate vote from 0xF233d122F96fFb3A283E712B4c439cba176C548d to 0x95C1593f28d4623CB31E3510A929106283dE0D99

Awaiting confirmations

Transaction completed. Hash: 0xd34c4ef10e2abb47a339d2458ec385ca95baa4e913eefcf97f0cf8dc8bc95ff0

# 6-Query voting result and print to console

## Execution

yarn run ts-node --files ./scripts/Ballot/6-query-voting-results.ts 0x84cBdaC8288061750a97Dc0631482712AcE616d2

## Console.log

Using address 0xF233d122F96fFb3A283E712B4c439cba176C548d

Attaching ballot contract interface to address 0x84cBdaC8288061750a97Dc0631482712AcE616d2

Voting Results:

Proposal N. 1 (Proposal1) : 1

Proposal N. 2 (Proposal2) : 0

Proposal N. 3 (Proposal3) : 0

Proposal N. 4 (Proposal4) : 0
