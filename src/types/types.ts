export type EthPriceType = {
  ethusd: string;
  ethbtc: string;
};

export type BlockInfoType = {
  blockNumber: string;
  totalTransactions: string;
  gasUsed: string;
  miner: string;
  time: string;
};

export type TxnsType = {
  transactions: TxnType[];
};

export type TxnType = {
  fromAddress: string;
  time: string;
  toAddress: string;
  transactionHash: string;
  value: string;
};
