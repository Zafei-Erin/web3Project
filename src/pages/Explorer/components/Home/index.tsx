import EtherInfoBox from "./EtherInfoBox";
import { LatestBlocks } from "./LatestBlocks";
import { LatestTxns } from "./LatestTxns";
import SearchSection from "./SearchSection";

export const ExplorerHomePage = () => {
  return (
    <div className="">
      <div className="bg-[url('/src/assets/bg-img.jpeg')] bg-center h-72 ">
        <div className="space-y-6 pt-14 xl:w-4/5 xl:ml-[10rem] px-4 pb-10">
          <SearchSection />
          <EtherInfoBox />

          <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
            <LatestBlocks />
            <LatestTxns />
          </div>
        </div>
      </div>
    </div>
  );
};
