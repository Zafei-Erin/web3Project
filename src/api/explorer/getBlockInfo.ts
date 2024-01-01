import { EthBlockWithTxnsType } from "~/types/types";
import { provider } from "./InfuraProvider";

export const getBlock = async (blockNumber: string | number) => {
  if (typeof blockNumber === "string") {
    blockNumber = parseInt(blockNumber);
  }
  const block = await provider.getBlock(blockNumber);
  return block;
};

type ESBlockWithTxnsRespType = {
  status: string;
  message: string;
  result: EthBlockWithTxnsType[];
};

const ES_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const MAX_TXN_COUNT = 10_000;
export const getBlockTxns = async (blockNumber: string | number) => {
  const url = new URL(
    `https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=${blockNumber}&endblock=${blockNumber}&page=1&offset=${MAX_TXN_COUNT}&sort=desc&apikey=${ES_API_KEY}`
  );
  const resp = await fetch(url);
  const data: ESBlockWithTxnsRespType = await resp.json();

  if (!resp.ok) {
    throw new Error("Fail to fetch ether price");
  }

  return data.result;
};
