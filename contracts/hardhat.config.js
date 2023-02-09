require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');

task("accounts", "Prints the list of accounts")
    .setAction(async (taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners();

        for (const account of accounts) {
            console.log(account.address);
        }
    });

task("increment", "Increments the nonce by 1")
    .setAction(async (taskArgs, hre) => {
        const [deployer] = await ethers.getSigners();
        console.log(`✅ Connected to ${deployer.address}`);

        console.log('✅ Incrementing nonce by 1')
        await deployer.sendTransaction({ to: deployer.address, value: 0 })

        console.log('✅ Done')
    });

task("deploy", "Deploy a contract")
    .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
    .setAction(async (taskArgs, hre) => {
        await hre.run("compile");

        const [deployer] = await ethers.getSigners();
        console.log(`✅ Connected to ${deployer.address}`);

        const chainId = await deployer.getChainId();
        console.log(`✅ Connected to chain ${chainId}`);

        const JourneySingleton = await ethers.getContractFactory("Journey");
        const journeySingleton = await JourneySingleton.deploy();
        await journeySingleton.deployed();

        const JourneyFactory = await ethers.getContractFactory("JourneyFactory");
        const journeyFactory = await JourneyFactory.deploy();
        await journeyFactory.deployed();

        console.log("JourneyFactory deployed to:", journeyFactory.address);

        if (taskArgs.verify) {
            console.log('✅ Verifying contract on Etherscan')
            await hre.run("verify:verify", {
                address: contract.address,
                args: ['Hello, Hardhat!'],
            });
        }

        console.table({
            "Deployer": deployer.address,
            "Chain ID": chainId,
            "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
            "MetricToken Address": metricToken.address,
        })
    });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: { // Keeps the amount of gas used in check
                        enabled: true,
                        runs: 1000000000
                    }
                }
            }
        ],
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    }
};
