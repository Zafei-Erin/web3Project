import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader } from "~/pages/Swap/components";
import { EthAccountWithTxnsType } from "~/types/types";
import { calculateTime } from "~/utils";
import { ethers } from "ethers";
import { ArrowDown } from "~/assets";
import { getAccountTxns } from "~/api/explorer/getAccountInfo";
import { Tooltip } from "~/components/Tooltip";

const gridTemplateColumns =
  "minmax(12rem, 1fr) minmax(8rem, 9rem) minmax(5rem, 6rem) minmax(5rem, 7rem) minmax(9rem, 10rem) 3rem minmax(9rem, 1fr) minmax(12rem, 1fr) minmax(7rem,1fr)";

type MethodMapType = {
  method: string;
  message: string;
};

export const MethodMap = new Map<string, MethodMapType>([
  ["0x", { method: "Transfer", message: "Transfer" }],
  [
    "0x64617461",
    {
      method: "Transfer*",
      message:
        "This transaction includes data in the Input Data field which may indicate a message in UTF-8",
    },
  ],
  [
    "0xeb672419",
    { method: "Request L2 Transaction", message: "Request L2 Transaction" },
  ],
  ["0x2d2da806", { method: "Deposit ETH", message: "Deposit ETH" }],
  ["0xd85d3d27", { method: "Mint", message: "Mint" }],
  [
    "0x00000009",
    {
      method: "Get Initialization Code From Contract Runtime_6CLUNS",
      message: "Get Initialization Code From Contract Runtime_6CLUNS",
    },
  ],
  [
    "0x00000001",
    { method: "Relay1Gs Wnfs IQR Oy", message: "Relay1Gs Wnfs IQR Oy" },
  ],
]);

export const TxnForAccountTable = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("a");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [txns, setTxns] = useState<EthAccountWithTxnsType[]>();
  const [loading, setLoading] = useState(false);

  const init = async (address: string) => {
    setLoading(true);
    const data = await getAccountTxns(address);
    setTxns(data);
    setLoading(false);
  };

  useEffect(() => {
    if (address) {
      init(address);
    }
  }, [address]);

  const maxPage = useMemo(
    () => txns && Math.ceil(txns.length / pageSize),
    [txns, pageSize]
  );

  const PageTab: React.FC = () => {
    return (
      <div className="flex gap-1 items-center justify-end">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`text-sm border rounded-lg py-1 px-1.5 transition
          ${
            page === 1
              ? "text-gray-500 bg-gray-50 border-gray-200"
              : "text-sky-600 hover:text-white  hover:border-sky-600 hover:bg-sky-600"
          }`}
        >
          First
        </button>
        <button
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
          disabled={page === 1}
          className="border transition rounded-lg px-0.5 hover:border-sky-600 hover:bg-sky-600 disabled:border-gray-200 disabled:text-gray-500 disabled:bg-gray-50"
        >
          <ArrowDown
            className={`transition rotate-90 w-[1.8rem] h-[1.8rem] py-[0.3rem] px-1 stroke-2 ${
              page === 1 ? "text-gray-500" : "text-sky-600 hover:text-white"
            } `}
          />
        </button>
        <div className="border rounded-lg bg-gray-50 text-gray-500 py-1 px-2 text-sm">
          Page {page} of {maxPage}
        </div>
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
          disabled={page === maxPage}
          className="border transition rounded-lg px-0.5 hover:border-sky-600 hover:bg-sky-600 disabled:border-gray-200 disabled:text-gray-500 disabled:bg-gray-50"
        >
          <ArrowDown
            className={`transition -rotate-90 w-[1.8rem] h-[1.8rem] py-[0.3rem] px-1 stroke-2 ${
              page === maxPage
                ? "text-gray-500"
                : "text-sky-600 hover:text-white"
            } `}
          />
        </button>

        <button
          onClick={() => setPage(maxPage || 1)}
          disabled={page === maxPage}
          className={`text-sm border rounded-lg py-1 px-1.5 transition
          ${
            page === maxPage
              ? "text-gray-500 bg-gray-50 border-gray-200"
              : "text-sky-600 hover:text-white  hover:border-sky-600 hover:bg-sky-600"
          }`}
        >
          Last
        </button>
      </div>
    );
  };

  return (
    <div className="px-3 bg-gray-50 py-3 flex items-center justify-center">
      <div className="w-full xl:w-[85%] space-y-4">
        {/* header */}
        <div>
          <div className=" font-semibold text-lg">Transactions</div>
          <p className="text-sm ">
            For{" "}
            <Link
              to={`/explorer/account/${address}`}
              className="text-sky-600 hover:text-sky-700"
            >
              {address}
            </Link>
          </p>
        </div>
        <hr />

        {/* table */}
        <div>
          {!address || loading ? (
            <div className="border bg-white rounded-lg p-4 space-y-4 h-[36rem] flex items-center justify-center">
              <Loader className="w-16 h-16" />
            </div>
          ) : (
            <div className="border bg-white rounded-lg p-4 space-y-4 w-full overflow-x-auto">
              {txns && txns.length > 0 && (
                <div>
                  {/* tab */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      A total of {txns.length} internal transactions found
                    </p>
                    <PageTab />
                  </div>
                  <table className="w-full border-collapse text-xs ">
                    <thead>
                      <tr
                        className="grid p-4 gap-4 border-b w-full overflow-x-auto text-nowrap"
                        style={{
                          gridTemplateColumns: gridTemplateColumns,
                        }}
                      >
                        <th className="text-start">Txn Hash</th>
                        <th className="text-start">Method</th>
                        <th className="text-start">Block</th>
                        <th className="text-start">Age</th>
                        <th className="text-start">From</th>
                        <th></th>
                        <th className="text-start">To</th>
                        <th className="text-start">Value</th>
                        <th className="text-start">Txn Fee</th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y">
                      {txns
                        .slice((page - 1) * pageSize, page * pageSize)
                        .map((txn, index) => {
                          const direction =
                            txn.from === txn.to
                              ? "SELF"
                              : txn.from === address
                              ? "OUT"
                              : "IN";
                          const txnFee = BigInt(
                            parseFloat(txn.gasPrice) * parseFloat(txn.gasUsed)
                          );
                          const txnFeeFormatted = ethers.utils
                            .formatEther(txnFee)
                            .slice(0, 10);
                          return (
                            <tr
                              key={index}
                              className="grid text-start py-3 px-4 gap-4 hover:bg-gray-100 text-sm text-nowrap"
                              style={{
                                gridTemplateColumns: gridTemplateColumns,
                              }}
                            >
                              <td>
                                <Link
                                  to={`/explorer/tx/${txn.hash}`}
                                  className="text-sky-600 hover:text-sky-700"
                                >
                                  {txn.hash.slice(0, 19)}...
                                </Link>
                              </td>
                              <td className="flex justify-start max-w-full">
                                <Tooltip
                                  content={
                                    MethodMap.get(txn.methodId)?.message ||
                                    txn.methodId
                                  }
                                  className=" max-w-[20rem] text-wrap text-center"
                                >
                                  <div className=" max-w-[8rem] truncate bg-gray-50 border px-4 py-1 rounded-lg text-xs">
                                    {MethodMap.get(txn.methodId)?.method ||
                                      txn.methodId}
                                  </div>
                                </Tooltip>
                              </td>
                              <td className="text-sky-600 hover:text-sky-700 text-sm">
                                <Link to={`/explorer/block/${txn.blockNumber}`}>
                                  {txn.blockNumber}
                                </Link>
                              </td>
                              <td className="">
                                {calculateTime(txn.timeStamp)}
                              </td>

                              <td className="text-sky-600 hover:text-sky-700 text-sm ">
                                <Link to={`/explorer/account/${txn.from}`}>
                                  {txn.from.slice(0, 8)}...{txn.from.slice(34)}
                                </Link>
                              </td>
                              <td
                                className={`text-xs font-semibold border text-center rounded-lg py-1 ${
                                  direction === "SELF"
                                    ? "text-gray-500 bg-gray-100"
                                    : direction === "OUT"
                                    ? "text-amber-600 bg-amber-100/60 border-amber-100"
                                    : " text-emerald-600 bg-emerald-100/60 border-emerald-300"
                                }`}
                              >
                                {direction}
                              </td>
                              <td className="text-sky-600 hover:text-sky-700">
                                <Link to={`/explorer/account/${txn.to}`}>
                                  {txn.to.slice(0, 8)}...{txn.to.slice(34)}
                                </Link>
                              </td>
                              <td>{ethers.utils.formatEther(txn.value)} ETH</td>

                              <td className="text-xs text-gray-500">
                                {txnFeeFormatted}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <div className="flex gap-1 items-center justify-between">
                    <div className=" flex items-center justify-start gap-2">
                      <div className=" text-sm text-gray-500 text-nowrap">
                        Show rows:
                      </div>
                      <select
                        defaultValue={50}
                        onChange={(e) => {
                          setPageSize(parseInt(e.target.value));
                        }}
                        className="border py-1 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value={10}>10</option>
                        <option value={20}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <PageTab />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
