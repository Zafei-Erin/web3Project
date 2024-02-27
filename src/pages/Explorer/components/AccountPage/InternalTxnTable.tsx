import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAccountInternalTxns } from "~/api/explorer/getAccountInfo";
import { formatPrice } from "../Home/EtherInfoBox";
import { calculateTime } from "~/utils";
import { Loader } from "~/pages/Swap/components";

type InternalTxnType = {
  hash: string;
  timeStamp: string;
  blockNumber: string;
  from: string;
  to: string;
  value: string;
};

const gridTemplateColumns =
  "minmax(10rem, 1fr) minmax(6rem, 8rem) minmax(6rem, 8rem) minmax(9rem, 1fr) minmax(9rem, 1fr) minmax(7rem, 1fr)";

export const InternalTxnTable: React.FC = () => {
  const { address } = useParams();
  const [data, setData] = useState<InternalTxnType[]>();

  const init = async (address: string) => {
    const resp = await getAccountInternalTxns(address, 15);
    setData(resp);
  };

  useEffect(() => {
    if (address) {
      init(address);
    }
  }, [address]);

  if (data == undefined) {
    return (
      <div className="border rounded-xl h-[32rem] w-full break-normal bg-white flex items-center justify-center">
        <Loader className="w-20 h-20" />
      </div>
    );
  }

  return (
    <div className="border rounded-xl h-full w-full break-normal bg-white p-4 overflow-x-auto overflow-y-auto">
      <p className="mb-6 text-sm">
        {`Latest ${
          data && (data?.length > 15 ? "15" : data.length)
        } ERC-20 Token Transfer Events`}
      </p>
      <table className="w-full border-collapse text-xs ">
        <thead>
          <tr
            className="grid p-4 gap-4 border-b"
            style={{
              gridTemplateColumns: gridTemplateColumns,
            }}
          >
            <th className="text-start">Parent Txn Hash</th>
            <th className="text-start">Block</th>
            <th className="text-start">Age</th>
            <th className="text-start">From</th>
            <th className="text-start">To</th>
            <th className="text-start">Value</th>
          </tr>
        </thead>
        <tbody className=" divide-y">
          {data &&
            data.length > 0 &&
            data.map((txn, index) => {
              return (
                <tr
                  key={index}
                  className="grid text-start py-3 px-4 gap-4 hover:bg-gray-100 text-sm text-nowrap"
                  style={{
                    gridTemplateColumns: gridTemplateColumns,
                  }}
                >
                  <td className=" text-sky-600 hover:text-sky-700">
                    <Link to={`/explorer/tx/${txn.hash}`}>
                      {txn.hash.slice(0, 18)}...
                    </Link>
                  </td>
                  <td className="text-sky-600 hover:text-sky-700 text-sm">
                    <Link to={`/explorer/block/${txn.blockNumber}`}>
                      {txn.blockNumber}
                    </Link>
                  </td>
                  <td className="">{calculateTime(txn.timeStamp)}</td>
                  <td className="text-sky-600 hover:text-sky-700 text-sm">
                    <Link to={`/explorer/account/${txn.from}`}>
                      {txn.from.slice(0, 8)}...{txn.from.slice(34)}
                    </Link>
                  </td>
                  <td className="text-sky-600 hover:text-sky-700">
                    <Link to={`/explorer/account/${txn.to}`}>
                      {txn.to.slice(0, 8)}...{txn.to.slice(34)}
                    </Link>
                  </td>
                  <td>
                    {formatPrice(ethers.utils.formatEther(txn.value), {
                      maximumFractionDigits: 8,
                    })}{" "}
                    ETH
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
