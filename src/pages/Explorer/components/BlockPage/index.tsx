import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlock } from "~/api/explorer/getBlockInfo";
import { getLatestBlockNumber } from "~/api/explorer/getEthPrice";
import { ChevronDownIcon } from "~/assets";
import { Tooltip } from "~/components/Tooltip";
import { Loader } from "~/pages/Swap/components";
import { calculateTime } from "~/utils";

export const BlockPage = () => {
  const { blockId } = useParams();
  const [block, setBlock] = useState<ethers.providers.Block>();
  const [latestBlockNumber, setLatestBlockNumber] = useState<number>();

  const init = async (blockId: string) => {
    const b = await getBlock(blockId);
    if (b !== null) {
      setBlock(b);
    }

    const latestBlockNb = await getLatestBlockNumber();
    setLatestBlockNumber(latestBlockNb);
  };

  useEffect(() => {
    if (blockId !== undefined) {
      init(blockId);
    }
  }, [blockId]);

  const baseFeePerGasEther = ethers.utils.formatEther(
    block?.baseFeePerGas || 0
  );
  const baseFeePerGasGwei = ethers.utils.formatUnits(
    block?.baseFeePerGas || 0,
    9
  );
  const burntFee = block?.gasUsed.mul(block?.baseFeePerGas || 0);
  const burntFeeFormat = ethers.utils.formatEther(burntFee || 0);

  if (blockId && latestBlockNumber && parseInt(blockId) > latestBlockNumber) {
    return (
      <div className=" p-2 flex items-center justify-center  h-[calc(100dvh-6rem)]">
        <div className="border rounded-lg bg-gray-50 min-w-80 p-4 space-y-2 ">
          <p className="font-semibold">Block Details</p>
          <div className="rounded-lg border bg-sky-200/50 border-sky-200 px-3 py-2">
            <div className="text-xs">CURRENT BLOCK:</div>
            <div className="text-sky-600 font-semibold text-sm">
              #{latestBlockNumber}
            </div>
          </div>
          <div className="rounded-lg border bg-white px-3 py-2">
            <div className="text-xs">REMAINING BLOCKS:</div>
            <div className="font-semibold text-sm">
              #{parseInt(blockId) - latestBlockNumber}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="px-3 bg-gray-50 py-3 flex items-center justify-center">
      <div className="w-full xl:w-[85%] space-y-4">
        <div className="flex gap-2 items-center">
          <div className=" font-semibold text-lg">Block</div>
          <p className="text-sm text-gray-500">#{blockId}</p>
        </div>
        <hr />
        <div>
          {block === undefined ? (
            <div className="border bg-white rounded-lg p-4 space-y-4 h-[36rem] flex items-center justify-center">
              <Loader className="w-16 h-16" />
            </div>
          ) : (
            <div className="border bg-white rounded-lg p-4 space-y-4">
              {/* first section */}
              <div className="space-y-2">
                <div className="font-semibold text-sm flex gap-6 py-2 items-center">
                  Block Height: <span className="font-normal">{blockId}</span>{" "}
                  <div className="flex gap-1">
                    <Link
                      to={`/explorer/block/${block.number - 1}`}
                      onClick={(e) => {
                        block.number === 0 && e.preventDefault();
                      }}
                    >
                      <ChevronDownIcon
                        className={`w-6 h-6 p-[0.15rem] stroke-2 rotate-90 bg-gray-200 transistion hover:bg-gray-300 rounded-lg ${
                          block.number === 0 &&
                          "text-gray-400 hover:bg-gray-200 hover:cursor-not-allowed"
                        }`}
                      />
                    </Link>
                    <Link
                      to={`/explorer/block/${block.number + 1}`}
                      onClick={(e) => {
                        block.number === latestBlockNumber &&
                          e.preventDefault();
                      }}
                    >
                      <ChevronDownIcon
                        className={`w-6 h-6 p-[0.15rem] stroke-2 -rotate-90 bg-gray-200 hover:bg-gray-300 rounded-lg ${
                          block.number === latestBlockNumber &&
                          "text-gray-400 hover:bg-gray-200 hover:cursor-not-allowed"
                        }`}
                      />
                    </Link>
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Timestamp:</div>
                  <div className="font-normal py-2 flex gap-1">
                    {calculateTime(block.timestamp)}
                    <span>
                      ({new Date(block.timestamp * 1000).toUTCString()})
                    </span>
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Transactions:</div>
                  <span className="font-normal py-2 flex items-center gap-1">
                    <Tooltip content="click to view internal transactions">
                      <Link
                        to={{
                          pathname: "/explorer/txs",
                          search: `?block=${block.number}`,
                        }}
                        className="text-sky-600 hover:text-sky-700"
                      >
                        {block.transactions.length} transactions
                      </Link>
                    </Tooltip>{" "}
                    in this block
                  </span>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6 md:items-center">
                  <div className=" py-2">Fee Recipient:</div>
                  <Link to={`/explorer/account/${block.miner}`}>
                    <span className="font-normal py-2 text-sky-600 hover:text-sky-700 transition">
                      {block.miner}
                    </span>
                  </Link>
                </div>
              </div>
              <hr />

              {/* second section */}
              <div className="space-y-2">
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Gas Used:</div>
                  <div className="font-normal py-2">
                    {block.gasUsed.toNumber().toLocaleString()}
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Gas Limit:</div>
                  <div className="font-normal py-2">
                    {block.gasLimit.toNumber().toLocaleString()}
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Base Fee Per Gas:</div>
                  <div className="font-normal py-2">
                    {baseFeePerGasEther}
                    <span className="pl-1 text-gray-500">
                      ({baseFeePerGasGwei} Gwei)
                    </span>
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Burnt Fees:</div>
                  <span className="font-normal py-2">{burntFeeFormat} ETH</span>
                </div>

                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Extra Data:</div>
                  <span className="font-normal py-2">
                    (Hex:{block.extraData})
                  </span>
                </div>
              </div>
              <hr />

              {/* third section */}
              <div className="space-y-2">
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className="py-2">Hash:</div>
                  <div className="font-normal py-2">{block.hash}</div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Parent Hash:</div>

                  <div className="font-normal py-2">{block.parentHash}</div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Nonce:</div>
                  <span className="font-normal py-2">{block.nonce}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
