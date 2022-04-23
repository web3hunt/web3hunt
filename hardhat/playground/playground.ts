import { run } from "hardhat";

async function main() {
  const response = await run("compile");
  console.log(response);
}

main();
