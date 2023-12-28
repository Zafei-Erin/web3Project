import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAccountTxns } from "~/api/explorer/getAccountInfo";
import { formatPrice } from "../Explorer/EtherInfoBox";
import { calculateTime } from "~/utils";

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
  "minmax(10rem, 1fr) minmax(5rem, 1fr) minmax(5rem, 1fr) minmax(5rem, 7rem) minmax(10rem, 1fr) minmax(10rem, 1fr) minmax(8rem, 1fr) minmax(6rem, 1fr)";

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

  return (
    <div className="border rounded-xl h-full w-full break-normal bg-white p-4 overflow-x-auto overflow-y-auto">
      <p className="mb-6 text-sm">
        Latest 25 from a total of 17,512 transactions
      </p>
      <table className="w-full border-collapse text-xs ">
        <thead>
          <tr
            class="grid p-4 gap-4 border-b"
            style={{
              "grid-template-columns": gridTemplateColumns,
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
            data.map((txn, index) => {
              const txnFee = parseFloat(txn.gasPrice) * parseFloat(txn.gasUsed);
              const txnFeeFormatted = ethers.utils
                .formatEther(txnFee)
                .slice(0, 10);
              return (
                <tr
                  key={index}
                  class="grid text-start py-3 px-3 gap-3 hover:bg-gray-100 text-sm"
                  style={{
                    "grid-template-columns": gridTemplateColumns,
                  }}
                >
                  <td className=" text-sky-600 hover:text-sky-700">
                    <Link to={`/explorer/transaction/${txn.hash}`}>
                      {txn.hash.slice(0, 18)}...
                    </Link>
                  </td>
                  <td className="border py-1 bg-gray-50 rounded-lg text-xs w-fit px-4">
                    {txn.methodId === "0x" ? "Transfer" : txn.methodId}
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
                    <Link to={`/explorer/account/${txn.from}`}>
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
