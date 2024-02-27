import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAccountTxns } from "~/api/explorer/getAccountInfo";
import { formatPrice } from "../Home/EtherInfoBox";
import { calculateTime } from "~/utils";
import { Loader } from "~/pages/Swap/components";
import { ArrowWithBar } from "~/assets";

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
  "minmax(11rem, 1fr) minmax(7rem, 1fr) minmax(4rem, 1fr) minmax(5rem, 7rem) minmax(9rem, 1fr) minmax(9rem, 1fr) minmax(7rem, 1fr) minmax(6rem, 1fr)";

export const TxnTable: React.FC = () => {
  const { address } = useParams();
  const [data, setData] = useState<TxnType[]>();

  const init = async (address: string) => {
    const resp = await getAccountTxns(address, 15);
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
    <div className="border rounded-xl h-full w-full ">
      <div className="rounded-t-xl h-full w-full break-normal bg-white p-4 overflow-x-auto overflow-y-auto">
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
              <th className="text-start">Transaction Hash</th>
              <th className="text-start">Method</th>
              <th className="text-start">Block</th>
              <th className="text-start">Age</th>
              <th className="text-start">From</th>
              <th className="text-start">To</th>
              <th className="text-start">Value</th>
              <th className="text-start">Txn Fee</th>
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
                    className="grid py-3 px-4 gap-4 hover:bg-gray-100 text-sm text-nowrap text-start"
                    style={{
                      gridTemplateColumns: gridTemplateColumns,
                    }}
                  >
                    <td className=" text-sky-600 hover:text-sky-700">
                      <Link to={`/explorer/tx/${txn.hash}`}>
                        {txn.hash.slice(0, 18)}...
                      </Link>
                    </td>
                    <td className=" w-full flex justify-start">
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
      <Link to={{ pathname: "/explorer/txs", search: `?a=${address}` }}>
        <button className="w-full text-xs rounded-b-xl font-semibold gap-1 text-gray-500 flex py-4 items-center justify-center bg-gray-50 hover:text-sky-700 group ">
          VIEW ALL TRANSACTIONS
          <ArrowWithBar className="stroke-1.5 stroke-gray-500 w-5 h-5 rotate-90 group-hover:stroke-sky-700" />
        </button>
      </Link>
    </div>
  );
};
