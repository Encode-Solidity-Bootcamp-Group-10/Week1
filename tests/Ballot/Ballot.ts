import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function giveRightToVote(ballotContract: Ballot, voterAddress: any) {
  const tx = await ballotContract.giveRightToVote(voterAddress);
  await tx.wait();
}

describe("Ballot", function () {
  let ballotContract: Ballot;
  let accounts: SignerWithAddress[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(proposal.voteCount.toNumber()).to.eq(0);
      }
    });

    it("sets the deployer address as chairperson", async function () {
      const chairperson = await ballotContract.chairperson();
      expect(chairperson).to.eq(accounts[0].address);
    });

    it("sets the voting weight for the chairperson as 1", async function () {
      const chairpersonVoter = await ballotContract.voters(accounts[0].address);
      expect(chairpersonVoter.weight.toNumber()).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      const voterAddress = accounts[1].address;
      const tx = await ballotContract.giveRightToVote(voterAddress);
      await tx.wait();
      const voter = await ballotContract.voters(voterAddress);
      expect(voter.weight.toNumber()).to.eq(1);
    });

    it("can not give right to vote for someone that has voted", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      await expect(
        giveRightToVote(ballotContract, voterAddress)
      ).to.be.revertedWith("The voter already voted.");
    });

    it("can not give right to vote for someone that already has voting rights", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await expect(
        giveRightToVote(ballotContract, voterAddress)
      ).to.be.revertedWith("");
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    it("should increase voteCount of selected proposal", async function () {
      const voterAddress = accounts[1].address;
      const voter = accounts[1];
      await giveRightToVote(ballotContract, voterAddress);
      const voteCountBefore = (await ballotContract.proposals(0)).voteCount;
      await ballotContract.connect(voter).vote(0);
      const voteCountAfter = (await ballotContract.proposals(0)).voteCount;

      expect(voteCountBefore.toNumber()).to.equal(0);
      expect(voteCountAfter.toNumber()).to.equal(1);
    });

    it("should update voter's struct details", async function () {
      const voterAddress = accounts[1].address;
      const voter = accounts[1];
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(voter).vote(0);
      const hasVoted = (await ballotContract.voters(voterAddress)).voted;
      const proposalVoted = (await ballotContract.voters(voterAddress)).vote;

      expect(hasVoted).to.equal(true);
      expect(proposalVoted.toNumber()).to.equal(0);
    });

    it("should not allow voter with no weight", async function () {
      const voter = accounts[1];

      await expect(ballotContract.connect(voter).vote(0)).to.be.revertedWith(
        "Has no right to vote"
      );
    });

    it("should NOT allow previously voted voters", async function () {
      const voterAddress = accounts[1].address;
      const voter = accounts[1];
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(voter).vote(0);

      await expect(ballotContract.connect(voter).vote(0)).to.have.revertedWith(
        "Already voted."
      );
    });
  });

  describe("when the voter interact with the delegate function in the contract", function () {
    it("should delegate their vote to another voter", async function () {
      const voterAddress = accounts[1].address;
      const delegateAddress = accounts[2].address;
      const voter = accounts[1];
      await giveRightToVote(ballotContract, voterAddress);
      await giveRightToVote(ballotContract, delegateAddress);
      const voterDelegateBefore = (await ballotContract.voters(voterAddress))
        .delegate;
      const delegateWeightBefore = (
        await ballotContract.voters(delegateAddress)
      ).weight;
      await ballotContract.connect(voter).delegate(delegateAddress);
      const delegateWeightAfter = (await ballotContract.voters(delegateAddress))
        .weight;
      const voterDelegateAfter = (await ballotContract.voters(voterAddress))
        .delegate;

      // Default delegate address value is 0x00...
      expect(voterDelegateBefore).to.equal(ethers.constants.AddressZero);
      // delegate address' weight is 1 initially
      expect(delegateWeightBefore.toNumber()).to.equal(1);
      // voter's delegated address has been set
      expect(voterDelegateAfter).to.equal(delegateAddress);
      // Increment delegate's weight by 1
      expect(delegateWeightAfter.toNumber()).to.equal(2);
    });
  });

  describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the vote function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the delegate function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function before any votes are cast", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });
});
