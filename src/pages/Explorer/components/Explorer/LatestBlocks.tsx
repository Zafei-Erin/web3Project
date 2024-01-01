import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestBlocks, getMoreBlocks } from "~/api/explorer/getEthPrice";
import { ArrowDown } from "~/assets";
import BoxIcon from "~/assets/BoxIcon";
import { Loader } from "~/pages/Swap/components";

export const LatestBlocks: React.FC = () => {
  const [blocks, setBlocks] = useState<ethers.providers.Block[]>([]);
  const [lastBlockNumber, setLastBlockNumber] = useState<number>();
  const [loadingMore, setLoadingMore] = useState(false);

  const initBlocks = async () => {
    const blocksDetails = await getLatestBlocks();
    setBlocks(blocksDetails);
    setLastBlockNumber(blocksDetails[blocksDetails.length - 1].number);
  };

  useEffect(() => {
    initBlocks();
  }, []);

  const fetchData = async () => {
    setLoadingMore(true);
    if (lastBlockNumber) {
      const newBlocks = await getMoreBlocks(lastBlockNumber - 1);
      setBlocks((prev) => [...prev, ...newBlocks]);
    }
    setLoadingMore(false);
  };

  blocks?.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="border rounded-lg divide-y shadow-lg shadow-gray-100">
      <div className="text-sm font-semibold py-4 px-3">Lastest Blocks</div>
      {blocks.length === 0 ? (
        <div className="h-[20rem] flex items-center justify-center">
          <Loader className="w-20 h-20" />
        </div>
      ) : (
        <>
          <div className="px-3 divide-y overflow-y-auto h-[20.2rem]">
            {blocks &&
              blocks.map((block, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="py-4 flex gap-2 items-center">
                      <BoxIcon className="w-12 h-12 p-3 text-gray-600 bg-gray-100 rounded-lg" />
                      <div>
                        <Link to={`block/${block.number}`}>
                          <div className="text-sky-600">{block.number}</div>
                        </Link>
                        <div className="text-gray-500">{block.timestamp}</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        Miner:{" "}
                        <Link to={`account/${block.miner}`}>
                          <div className="text-sky-600 hover:text-sky-700">
                            {block.miner.slice(0, 8)}...{block.miner.slice(34)}
                          </div>
                        </Link>
                      </div>
                      <div className="flex gap-1">
                        <Link to={`block/${block.number}`}>
                          <div className="text-sky-600 hover:text-sky-700">
                            {block.transactions.length} txns
                          </div>
                        </Link>
                        <div className="text-gray-400">in 12 secs</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <button
            onClick={fetchData}
            className="flex w-full items-center hover:cursor-pointer hover:text-sky-700 justify-center rounded-b-lg py-4 font-semibold text-gray-500 bg-gray-50 text-xs"
          >
            {loadingMore ? (
              "LOADING..."
            ) : (
              <div className="flex items-center gap-2 justify-center">
                "VIEW MORE BLOCKS"{" "}
                <ArrowDown className="w-4 h-4 hover:stroke-sky-700 stroke-2" />
              </div>
            )}
          </button>
        </>
      )}
    </div>
  );
};
