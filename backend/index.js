/* eslint @typescript-eslint/no-var-requires: "off" */

const express = require("express");
const app = express();
const port = 3001;
const Moralis = require("moralis").default;
const cors = require("cors");

require("dotenv").config({ path: ".env" });

app.use(cors());
app.use(express.json());

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/getlatesttxns", async (req, res) => {
  try {
    const latestBlock = await Moralis.EvmApi.block.getDateToBlock({
      chain: "0x1",
      date: Date.now(),
    });
    const block = await Moralis.EvmApi.block.getBlock({
      chain: "0x1",
      blockNumberOrHash: latestBlock.toJSON().block,
    });

    let txns = [];
    txns.push(
      block.toJSON().transactions.map((i) => {
        return {
          transactionHash: i.hash,
          time: i.block_timestamp,
          fromAddress: i.from_address,
          toAddress: i.to_address,
          value: i.value,
        };
      })
    );
    console.log(txns);

    return res.status(200).json(txns);
  } catch (e) {
    console.log(`Somthing went wrong ${e}`);
    return res.status(400).json();
  }
});

app.get("/address", async (req, res) => {
  try {
    const { query } = req;
    const chain = "0x1";

    const response =
      await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
        address: query.address,
        chain,
      });

    return res.status(200).json(response);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
