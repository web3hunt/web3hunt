import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

describe("Counter", function () {
  let accounts: Signer[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("should do something right", async function () {
    const [owner] = accounts;

    const Counter = await ethers.getContractFactory("Counter");

    const counter = await Counter.deploy();

    let currentCount = await counter.get(); // big number
    expect(Number(currentCount)).to.equal(0);
  });
});
