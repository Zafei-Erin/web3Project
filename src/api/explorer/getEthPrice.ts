import { ethers } from "ethers";
import { EthPriceType } from "~/types/types";
import { provider } from "./InfuraProvider";

export const endPoint = "https://api.etherscan.io/api";

type ResponseType = {
  status: string;
  message: string;
  result: EthPriceType;
};

const ES_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export const getEthPrice = async () => {
  const url = new URL(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ES_API_KEY}`
  );
  const resp = await fetch(url);
  const data: ResponseType = await resp.json();

  if (!resp.ok) {
    throw new Error("Fail to fetch ether price");
  }

  return data.result;
};

const DISPLAYNUMBER = 4;

export const getLatestBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const getLatestBlocks = async () => {
  const currentBlockNumber = await getLatestBlockNumber();
  const block = await provider.getBlock(currentBlockNumber);

  // LAST FINALIZED BLOCK
  const blockNumber = block.number;
  // Gas Price
  const gasPriceBigNum = await provider.getGasPrice();
  const gasPrice = ethers.utils.formatUnits(gasPriceBigNum);
  // Top 10 Blocks Numbers
  const blockNumberArray: number[] = [];
  for (let i = 0; i < DISPLAYNUMBER; i++) {
    blockNumberArray.push(blockNumber - i);
  }
  // Blocks details
  const blocksDetails: ethers.providers.Block[] = [];
  const result = Promise.all(
    blockNumberArray.map(async (blockNumber) => {
      const blockData = await provider.getBlock(blockNumber);
      blocksDetails.push(blockData);
    })
  ).then(() => {
    return { blockNumber, gasPrice, blocksDetails };
  });

  return result;
};

export const getLatestTransactions = async () => {
  const currentBlockNumber = await getLatestBlockNumber();
  const block = await provider.getBlock(currentBlockNumber);
  // Latest Transactions
  const txns = block.transactions.slice(0, DISPLAYNUMBER);
  const txnsDetails: ethers.providers.TransactionReceipt[] = [];
  const result = Promise.all(
    txns.map(async (txn) => {
      const txnReceipt = await provider.getTransactionReceipt(txn);
      txnsDetails.push(txnReceipt);
    })
  ).then(() => {
    return txnsDetails;
  });
  return result;
};
