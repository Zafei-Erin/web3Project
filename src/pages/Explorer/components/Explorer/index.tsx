import { ethers } from "ethers";
import { useEffect, useState } from "react";

import EtherInfoBox from "./EtherInfoBox";
import { LatestBlocks } from "./LatestBlocks";
import { LatestTxns } from "./LatestTxns";
import SearchSection from "./SearchSection";
import {
  getLatestBlocks,
  getLatestTransactions,
} from "~/api/explorer/getEthPrice";

export const Explorer = () => {
  const [transactionDetails, setTransactionDetails] =
    useState<ethers.providers.TransactionReceipt[]>();
  const [data, setData] = useState<{
    blockNumber: number;
    blocksDetails: ethers.providers.Block[];
    gasPrice: string;
  }>();

  const initBlocks = async () => {
    const blocksDetails = await getLatestBlocks();
    setData(blocksDetails);
  };

  const initTxns = async () => {
    const details = await getLatestTransactions();
    setTransactionDetails(details);
  };

  // update on every refresh
  useEffect(() => {
    initBlocks();
    initTxns();
  }, []);

  return (
    <div className="space-y-6 xl:w-4/5 xl:ml-[10rem] px-4 pb-10">
      {/* <SideBar></SideBar> */}
      <SearchSection />
      <EtherInfoBox blockNumber={data?.blockNumber} />

      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
        <LatestBlocks blocks={data?.blocksDetails} gasPrice={data?.gasPrice} />
        <LatestTxns transaction={transactionDetails} />
      </div>
    </div>
  );
};
