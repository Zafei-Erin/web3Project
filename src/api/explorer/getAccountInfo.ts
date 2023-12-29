const ES_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export const getAccountBalance = async (address: string): Promise<string> => {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${ES_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("fail to get account balance");
  }

  return data.result;
};

export type TxnReqType = {
  address: string;
  offset: number;
};
export const getAccountTxns = async (address: string, offset: number) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${offset}&sort=desc&apikey=${ES_API_KEY}`;

  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("fail to fetch account transactions");
  }

  return data.result;
};

export const getAccountInternalTxns = async (
  address: string,
  offset: number
) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=999999999&page=1&offset=${offset}&sort=desc&apikey=${ES_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("fail to fetch account internal transactions");
  }

  return data.result;
};

export const getAccountERC20TokenTransfer = async (
  address: string,
  offset: number
) => {
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=${offset}&startblock=0&endblock=27025780&sort=desc&apikey=${ES_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("fail to fetch account token transfers");
  }

  return data.result;
};

export const getAccountNFTTokenTransfer = async (
  address: string,
  offset: number
) => {
  const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&page=1&offset=${offset}&startblock=0&endblock=999999999&sort=desc&apikey=${ES_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("fail to fetch account token transfers");
  }

  return data.result;
};

export const getAccountERC1155TokenTransfer = async (
  address: string,
  offset: number
) => {
  const url = `https://api.etherscan.io/api?module=account&action=token1155tx&address=${address}&page=1&offset=${offset}&startblock=0&endblock=99999999&sort=desc&apikey=${ES_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("fail to fetch account token transfers");
  }

  return data.result;
};
