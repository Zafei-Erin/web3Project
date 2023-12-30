import { provider } from "./InfuraProvider";
import { ESRespType } from "./getEthPrice";

export const getTxn = async (txnHash: string) => {
  const txn = await provider.getTransaction(txnHash);
  return txn;
};

export const getTxnReceipt = async (txnHash: string) => {
    const txnReceipt = await provider.getTransactionReceipt(txnHash);
    return txnReceipt;
  };

const ES_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export const getTxnStatus = async (txnHash: string) => {
  const url = new URL(
    `https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${txnHash}&apikey=${ES_API_KEY}`
  );
  const resp = await fetch(url);
  const data: ESRespType = await resp.json();
  console.log("transaction status: ", data);

  if (!resp.ok) {
    throw new Error("Fail to fetch transaction status");
  }

  return data.result;
};
