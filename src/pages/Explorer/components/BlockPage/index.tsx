import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlock } from "~/api/explorer/getBlockInfo";
import { Loader } from "~/pages/Swap/components";
import { calculateTime } from "~/utils";

export const BlockPage = () => {
  const { blockId } = useParams();
  const [block, setBlock] = useState<ethers.providers.Block>();

  const init = async (blockId: string) => {
    const b = await getBlock(blockId);
    setBlock(b);
  };

  useEffect(() => {
    if (blockId !== undefined) {
      init(blockId);
    }
  }, [blockId]);

  if (block === undefined) {
    return (
      <div className="px-3 bg-gray-50 space-y-4 py-3">
        <div className="flex gap-2 items-center">
          <div className=" font-semibold text-lg">Block</div>
          <p className="text-sm text-gray-500">#{blockId}</p>
        </div>
        <div className="border bg-white rounded-lg p-4 space-y-4 h-[36rem] flex items-center justify-center">
          <Loader className="w-16 h-16" />
        </div>
      </div>
    );
  }

  const baseFeePerGasEther = ethers.utils.formatEther(block.baseFeePerGas || 0);
  const baseFeePerGasGwei = ethers.utils.formatUnits(
    block.baseFeePerGas || 0,
    9
  );
  const burntFee = block.gasUsed.mul(block.baseFeePerGas || 0);
  const burntFeeFormat = ethers.utils.formatEther(burntFee);

  console.log(block);

  return (
    <div className="px-3 bg-gray-50 space-y-4 py-3">
      <div className="flex gap-2 items-center">
        <div className=" font-semibold text-lg">Block</div>
        <p className="text-sm text-gray-500">#{blockId}</p>
      </div>
      <hr />
      <div>
        <div className="border bg-white rounded-lg p-4 space-y-4">
          {/* first section */}
          <div className="space-y-2">
            <div className="font-semibold text-sm flex gap-6 py-2">
              Block Height: <span className="font-normal">{blockId}</span>
            </div>
            <div className="font-semibold text-sm md:flex md:gap-6">
              <div className=" py-2">Timestamp:</div>
              <div className="font-normal py-2 flex gap-1">
                {calculateTime(block.timestamp)}
                <span>({new Date(block.timestamp * 1000).toUTCString()})</span>
              </div>
            </div>
            <div className="font-semibold text-sm md:flex md:gap-6">
              <div className=" py-2">Transactions:</div>
              <span className="font-normal py-2">
                {block.transactions.length} transactions in this block
              </span>
            </div>
            <div className="font-semibold text-sm md:flex md:gap-6">
              <div className=" py-2">Fee Recipient:</div>
              <Link to={`/expolorer/account/${block.miner}`}>
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
              <span className="font-normal py-2">(Hex:{block.extraData})</span>
            </div>
          </div>
          <hr />

          {/* third section */}
          <div className="space-y-2">
            <div className="font-semibold text-sm md:flex md:gap-6">
              <div className=" py-2">Hash:</div>
              <div className="font-normal py-2">{block.hash}</div>
            </div>
            <div className="font-semibold text-sm md:flex md:gap-6">
              <div className=" py-2">Parent Hash:</div>
              <Link to={`/explorer/block/${block.parentHash}`}>
                <div className="font-normal py-2 text-sky-600 hover:text-sky-700 transition">
                  {block.parentHash}
                </div>
              </Link>
            </div>
            <div className="font-semibold text-sm md:flex md:gap-6">
              <div className=" py-2">Nonce:</div>
              <span className="font-normal py-2">{block.nonce}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
