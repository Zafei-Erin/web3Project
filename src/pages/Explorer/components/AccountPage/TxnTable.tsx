import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAccountTxns } from "~/api/explorer/getAccountInfo";
import { formatPrice } from "../Explorer/EtherInfoBox";
import { calculateTime } from "~/utils";
import { Loader } from "~/pages/Swap/components";

export type TxnType = {
  hash: string;
  methodId: string;
  timeStamp: string;
  blockNumber: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
};

const gridTemplateColumns =
  "minmax(10rem, 1fr) minmax(6rem, 1fr) minmax(4rem, 1fr) minmax(4rem, 7rem) minmax(9rem, 1fr) minmax(9rem, 1fr) minmax(6rem, 1fr) minmax(6rem, 1fr)";

export const TxnTable: React.FC = () => {
  const { address } = useParams();
  const [data, setData] = useState<TxnType[]>();

  const init = async (address: string) => {
    const resp = await getAccountTxns(address, 15);
    console.log(resp);
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
        } transactions`}
      </p>
      <table className="w-full border-collapse text-xs ">
        <thead>
          <tr
            className="grid p-4 gap-4 border-b"
            style={{
              gridTemplateColumns: gridTemplateColumns,
            }}
          >
            <th className="">Transaction Hash</th>
            <th className="">Method</th>
            <th className="">Block</th>
            <th className="">Age</th>
            <th className="">From</th>
            <th className="">To</th>
            <th className="">Value</th>
            <th className="">Txn Fee</th>
          </tr>
        </thead>
        <tbody className=" divide-y">
          {data &&
            data.length > 0 &&
            data.map((txn, index) => {
              const txnFee = BigInt(
                parseFloat(txn.gasPrice) * parseFloat(txn.gasUsed)
              );
              const txnFeeFormatted = ethers.utils
                .formatEther(txnFee)
                .slice(0, 10);
              return (
                <tr
                  key={index}
                  className="grid text-center py-3 px-3 gap-3 hover:bg-gray-100 text-sm text-nowrap"
                  style={{
                    gridTemplateColumns: gridTemplateColumns,
                  }}
                >
                  <td className=" text-sky-600 hover:text-sky-700">
                    <Link to={`/explorer/transaction/${txn.hash}`}>
                      {txn.hash.slice(0, 18)}...
                    </Link>
                  </td>
                  <td className=" w-full flex justify-center">
                    <div className="w-fit bg-gray-50 border px-4 py-1 rounded-lg text-xs">
                      {txn.methodId === "0x" ? "Transfer" : txn.methodId}
                    </div>
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
                  <td className="text-xs text-gray-500">{txnFeeFormatted}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
