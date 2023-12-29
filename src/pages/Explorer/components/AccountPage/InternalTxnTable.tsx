import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAccountInternalTxns } from "~/api/explorer/getAccountInfo";
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
  "minmax(10rem, 1fr) minmax(6rem, 1fr) minmax(6rem, 1fr) minmax(9rem, 1fr) minmax(9rem, 1fr) minmax(7rem, 1fr)";

export const InternalTxnTable: React.FC = () => {
  const { address } = useParams();
  const [data, setData] = useState<TxnType[]>();

  const init = async (address: string) => {
    const resp = await getAccountInternalTxns(address, 15);
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
            className="grid p-4 gap-4 border-b"
            style={{
              gridTemplateColumns: gridTemplateColumns,
            }}
          >
            <th className="">Parent Txn Hash</th>
            <th className="">Block</th>
            <th className="">Age</th>
            <th className="">From</th>
            <th className="">To</th>
            <th className="">Value</th>
          </tr>
        </thead>
        <tbody className=" divide-y">
          {data &&
            data.length > 0 &&
            data.map((txn, index) => {
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
