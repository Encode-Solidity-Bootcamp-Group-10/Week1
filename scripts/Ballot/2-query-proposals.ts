import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
import { Ballot } from "../../typechain";

if (process.env.PRIVATE_KEY === "" || process.env.MNEMONIC === "") {
  console.warn("Must provide PRIVATE_KEY or MNEMONIC environment variable");
  process.exit(1);
}

if (process.env.INFURA_PROJECT_ID === "") {
  console.warn("Must provide INFURA_PROJECT_ID environment variable");
  process.exit(1);
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY!);
  console.log(`Using address ${wallet.address}`);
  // const provider = ethers.providers.getDefaultProvider("ropsten");
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );
  const signer = wallet.connect(provider);
  // Attach to the Ballot Contract
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;
  // Query proposals until error
  console.log("Query Proposals: ");
  const proposals: any[] = [];
  let lastProposal = false;
  let i = 0;
  while (!lastProposal) {
    try {
      const proposal = await ballotContract.proposals(i);
      proposals.push(proposal);
      i++;
    } catch (error) {
      // console.log(error);
      lastProposal = true;
    }
  }
  proposals.forEach((proposal, index) => {
    console.log(
      `Proposal N. ${index + 1}: ${ethers.utils.parseBytes32String(
        proposal.name
      )}`
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
