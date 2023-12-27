import { ethers } from "ethers";
import { Link } from "react-router-dom";
import BoxIcon from "~/assets/BoxIcon";

type LatestBlockType = {
  blocks: ethers.providers.Block[] | undefined;
};

export const LatestBlocks: React.FC<LatestBlockType> = ({ blocks }) => {
  const formatEthGas = (amount: ethers.BigNumberish) => {
    const gasFee = ethers.utils.formatUnits(amount, "ether");
    return gasFee;
  };

  return (
    <div className="border rounded-lg divide-y shadow-lg shadow-gray-100">
      <div className="text-sm font-semibold py-4 px-3">Lastest Blocks</div>
      <div className="px-3 divide-y">
        {blocks &&
          blocks.map((block, index) => (
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
              <div className="border rounded-lg p-2 font-semibold text-xs">
                {formatEthGas(block.baseFeePerGas || BigInt(0))} Eth
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center hover:cursor-pointer hover:text-sky-700 justify-center rounded-b-lg py-4 font-semibold text-gray-500 bg-gray-50 text-xs">
        VIEW ALL BLOCKS
      </div>
    </div>
  );
};
