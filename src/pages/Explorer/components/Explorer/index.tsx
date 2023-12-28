import { ethers } from "ethers";
import { useEffect, useState } from "react";

import EtherInfoBox from "./EtherInfoBox";
import { LatestBlocks } from "./LatestBlocks";
import { LatestTxns } from "./LatestTxns";
import SearchSection from "./SearchSection";
import { getLatestBlocks } from "~/api/explorer/getEthPrice";

export const Explorer = () => {
  const [data, setData] = useState<{
    blockNumber: number;
    txns: string[];
    blocksDetails: ethers.providers.Block[];
    gasPrice: string;
  }>();

  const init = async () => {
    const result = await getLatestBlocks();
    setData(result);
  };

  // update on every refresh
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="space-y-6 xl:w-4/5 xl:ml-[10rem] px-4 pb-10">
      {/* <SideBar></SideBar> */}
      <SearchSection />
      <EtherInfoBox blockNumber={data?.blockNumber} />

      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
        <LatestBlocks blocks={data?.blocksDetails} />
        <LatestTxns transaction={data?.txns} />
      </div>
    </div>
  );
};
