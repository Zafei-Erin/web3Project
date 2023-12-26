import EtherInfoBox from "./components/EtherInfoBox";
import { LatestBlocks } from "./components/LatestBlocks";
import { LastestTxns } from "./components/LatestTxns";
import SearchSection from "./components/SearchSection";

export const Explorer = () => {
  return (
    <div className="space-y-6 xl:w-4/5 xl:ml-[10rem] px-4 pb-10">
      {/* <SideBar></SideBar> */}
      <SearchSection />
      <EtherInfoBox />

      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
        <LatestBlocks />
        <LastestTxns />
      </div>
    </div>
  );
};
