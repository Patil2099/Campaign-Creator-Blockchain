const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "enter your sentence here",
  "https://rinkeby.infura.io/v3/621e172cef2f4d08bf15e7e4f440ed10"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting To Deploy From Account", accounts[0]);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({
      gas: "1000000",
      from: accounts[0],
    });

  console.log("Contract Deploy To", result.options.address);
};

deploy();
