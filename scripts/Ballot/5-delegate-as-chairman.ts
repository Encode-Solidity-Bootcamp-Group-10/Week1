import { Contract, ethers, BigNumber } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
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
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Delegate address missing");
  const delegateAddress = process.argv[3];
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  console.log(`Delegate vote from ${wallet.address} to ${delegateAddress}`);
  const tx = await ballotContract.delegate(delegateAddress);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
