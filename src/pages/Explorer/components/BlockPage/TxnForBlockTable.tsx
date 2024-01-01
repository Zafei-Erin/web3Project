import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBlockTxns } from "~/api/explorer/getBlockInfo";
import { Loader } from "~/pages/Swap/components";
import { EthBlockWithTxnsType } from "~/types/types";
import { calculateTime } from "~/utils";
import { ethers } from "ethers";
import { TickIcon } from "~/assets/TickIcon";
import FromToIcon from "~/assets/FromToIcon";
import { ArrowDown } from "~/assets";

const gridTemplateColumns =
  "minmax(5rem, 6rem) minmax(5rem, 7rem) minmax(12rem, 1fr) minmax(3rem, 4rem) minmax(9rem, 10rem) 3rem minmax(9rem, 1fr) minmax(12rem, 1fr)";

export const TxnForBlockTable = () => {
  const [searchParams] = useSearchParams();
  const blockNumber = searchParams.get("block");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [txns, setTxns] = useState<EthBlockWithTxnsType[]>();

  const init = async (blockNumber: number) => {
    const data = await getBlockTxns(blockNumber);
    console.log(data);
    setTxns(data);
  };

  console.log((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (blockNumber) {
      init(parseInt(blockNumber));
    }
  }, [blockNumber]);

  const maxPage = useMemo(
    () => txns && Math.ceil(txns.length / pageSize),
    [txns, pageSize]
  );

  const PageTab: React.FC = () => {
    return (
      <div className="flex gap-1 items-center justify-end">
        <div className="text-sm border rounded-lg py-1 px-1.5 text-sky-600 hover:border-sky-600 hover:bg-sky-600 hover:text-white transition">
          First
        </div>
        <button
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
          disabled={page === 1}
          className={`border transition rounded-lg px-0.5 ${
            page !== 1 && "hover:border-sky-600 hover:bg-sky-600"
          } `}
        >
          <ArrowDown
            className={`${
              page !== 1 && "hover:text-white "
            }transition rotate-90 w-[1.8rem] h-[1.8rem] py-[0.3rem] px-1 stroke-2 text-sky-600`}
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
          className="border transition rounded-lg px-0.5 hover:border-sky-600 hover:bg-sky-600"
        >
          <ArrowDown className="hover:text-white transition -rotate-90 w-[1.8rem] h-[1.8rem] py-[0.3rem] px-1 stroke-2 text-sky-600" />
        </button>

        <div className="text-sm border rounded-lg py-1 px-1.5 text-sky-600 hover:border-sky-600 hover:bg-sky-600 hover:text-white transition">
          Last
        </div>
      </div>
    );
  };

  return (
    <div className="px-3 bg-gray-50 py-3 flex items-center justify-center">
      <div className="w-full xl:w-[85%] space-y-4">
        {/* header */}
        <div>
          <div className=" font-semibold text-lg">
            Contract Internal Transactions
          </div>
          <p className="text-sm ">
            For Block{" "}
            <Link
              to={`/explorer/block/${blockNumber}`}
              className="text-sky-600 hover:text-sky-700"
            >
              {blockNumber}
            </Link>
          </p>
        </div>
        <hr />

        {/* table */}
        <div>
          {!blockNumber ? (
            <div className="border bg-white rounded-lg p-4 space-y-4 h-[36rem] flex items-center justify-center">
              <Loader className="w-16 h-16" />
            </div>
          ) : (
            <div className="border bg-white rounded-lg p-4 space-y-4 w-full overflow-x-auto">
              {txns && txns.length > 0 && (
                <div>
                  {/* tab */}
                  <PageTab />
                  <table className="w-full border-collapse text-xs ">
                    <thead>
                      <tr
                        className="grid p-4 gap-4 border-b w-full overflow-x-auto "
                        style={{
                          gridTemplateColumns: gridTemplateColumns,
                        }}
                      >
                        <th className="text-start">Block</th>
                        <th className="text-start">Age</th>
                        <th className="text-start">Parent Txn Hash</th>
                        <th className="text-start">Type</th>
                        <th className="text-start">From</th>
                        <th></th>
                        <th className="text-start">To</th>
                        <th className="text-start">Value</th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y">
                      {txns
                        .slice((page - 1) * pageSize, page * pageSize)
                        .map((txn, index) => {
                          return (
                            <tr
                              key={index}
                              className="grid text-start py-3 px-4 gap-4 hover:bg-gray-100 text-sm text-nowrap"
                              style={{
                                gridTemplateColumns: gridTemplateColumns,
                              }}
                            >
                              <td className="text-sky-600 hover:text-sky-700 text-sm">
                                {index == 0 && (
                                  <Link
                                    to={`/explorer/block/${txn.blockNumber}`}
                                  >
                                    {txn.blockNumber}
                                  </Link>
                                )}
                              </td>
                              <td className="">
                                {index == 0 && calculateTime(txn.timeStamp)}
                              </td>
                              <td className=" flex items-center justify-start gap-1">
                                <TickIcon className="w-4 h-4 fill-emerald-600 text-" />
                                <Link
                                  to={`/explorer/tx/${txn.hash}`}
                                  className="text-sky-600 hover:text-sky-700"
                                >
                                  {txn.hash.slice(0, 19)}...
                                </Link>
                              </td>
                              <td className="flex justify-start">{txn.type}</td>
                              <td className="text-sky-600 hover:text-sky-700 text-sm ">
                                <Link to={`/explorer/account/${txn.from}`}>
                                  {txn.from.slice(0, 8)}...{txn.from.slice(34)}
                                </Link>
                              </td>
                              <td>
                                <FromToIcon className="w-7 h-7" />
                              </td>
                              <td className="text-sky-600 hover:text-sky-700">
                                <Link to={`/explorer/account/${txn.to}`}>
                                  {txn.to.slice(0, 8)}...{txn.to.slice(34)}
                                </Link>
                              </td>
                              <td>{ethers.utils.formatEther(txn.value)} ETH</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <div className="flex gap-1 items-center justify-between">
                    <div className=" flex items-center gap-2">
                      <div className=" text-sm text-gray-500">Show rows:</div>
                      <div className="relative">
                        <select className="border py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                          <option
                            onSelect={() => {
                              setPageSize(50);
                            }}
                          >
                            50
                          </option>
                          <option
                            onSelect={() => {
                              setPageSize(10);
                            }}
                          >
                            10
                          </option>
                          <option
                            onSelect={() => {
                              setPageSize(20);
                            }}
                          >
                            20
                          </option>
                          <option
                            onSelect={() => {
                              setPageSize(100);
                            }}
                          >
                            100
                          </option>
                        </select>
                      </div>
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
