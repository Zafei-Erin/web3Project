import { TokenBalance } from "alchemy-sdk";

const API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export const getBalance = async (
  accountAddress: string,
  tokenAddresses: string[]
) => {
  const url = new URL(`https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`);
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    headers: {
      "Content-Type": "application/json",
    },
    params: [accountAddress, tokenAddresses],
    id: 42,
  });

  const response = await fetch(url, {
    method: "POST",
    body: raw,
    redirect: "follow",
  });
  const balanceRespJSON = await response.json();
  const resp: TokenBalance[] = balanceRespJSON.result.tokenBalances;
  if (!response.ok) {
    throw new Error(JSON.stringify("fail to get balance"));
  }

  return resp;
};

export const formatBalance = (rawBalance: string): string => {
  const balance = parseInt(rawBalance) / 10 ** 18;
  if (balance == 0) {
    return "0.00";
  } else {
    return balance.toString();
  }
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};
