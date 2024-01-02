import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestTxn, getMoreTxn } from "~/api/explorer/getEthPrice";
import { ArrowDown } from "~/assets";
import BoxIcon from "~/assets/BoxIcon";
import { Loader } from "~/pages/Swap/components";

export const LatestTxns: React.FC = () => {
  const [transaction, setTransaction] = useState<
    ethers.providers.TransactionResponse[]
  >([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);

  const initTxns = async () => {
    const details = await getLatestTxn();
    setTransaction(details);
  };

  const fetchMore = async (page: number) => {
    setLoadingMore(true);
    const newTxns = await getMoreTxn(page);
    setTransaction((prev) => [...prev, ...newTxns]);
    setLoadingMore(false);
  };

  // update on every refresh
  useEffect(() => {
    initTxns();
  }, []);

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  return (
    <div className="border rounded-lg divide-y shadow-lg shadow-gray-100">
      <div className="text-sm font-semibold py-4 px-3">
        Lastest Transactions
      </div>

      {transaction.length === 0 ? (
        <div className="h-[20rem] flex items-center justify-center">
          <Loader className="w-20 h-20" />
        </div>
      ) : (
        <>
          <div className="px-3 divide-y overflow-y-auto h-[20.2rem]">
            {transaction &&
              transaction.map((txn, index) => {
                const value = ethers.utils.formatEther(txn.value);
                const valueFormatted = parseFloat(value).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 5 }
                );
                return (
                  <div
                    key={index}
                    className="sm:flex py-3 justify-between items-center text-sm"
                  >
                    <div className="sm:py-4 flex gap-2 items-center">
                      <BoxIcon className="max-sm:hidden w-12 h-12 p-3 text-gray-600 bg-gray-100 rounded-lg" />
                      <div className="max-sm:flex max-sm:gap-1 max-sm:items-center">
                        <p className="sm:hidden">TX#</p>
                        <Link to={`tx/${txn.hash}`}>
                          <p className="text-sky-600 hover:text-sky-700">
                            {txn.hash.slice(0, 18)}...
                          </p>
                        </Link>
                        <p className="text-gray-500 text-xs">20 secs ago</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-1">
                        From
                        <Link to={`account/${txn.from}`}>
                          <p className="text-sky-600 hover:text-sky-700">
                            {txn.from.slice(0, 8)}...{txn.from.slice(34)}
                          </p>
                        </Link>
                      </div>
                      <div className="flex gap-1">
                        to
                        <Link to={`account/${txn.to}`}>
                          <p className="text-sky-600 hover:text-sky-700">
                            {" "}
                            {txn.to?.slice(0, 8)}...{txn.to?.slice(34)}
                          </p>
                        </Link>
                        <div className="sm:hidden border rounded-md w-fit text-xs font-semibold border-gray-300 px-1.5 py-0.5">
                          {valueFormatted} ETH
                        </div>
                      </div>
                    </div>
                    <div className="max-sm:hidden border rounded-md w-fit text-xs font-semibold border-gray-300 px-1.5 py-0.5">
                      {valueFormatted} ETH
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            className="flex w-full items-center hover:cursor-pointer hover:text-sky-700 justify-center rounded-b-lg py-4 font-semibold text-gray-500 bg-gray-50 text-xs"
          >
            {loadingMore ? (
              "LOADING..."
            ) : (
              <div className="flex items-center gap-2 justify-center">
                VIEW MORE TRANSACTIONS
                <ArrowDown className="w-4 h-4 hover:stroke-sky-700 stroke-2" />
              </div>
            )}
          </button>
        </>
      )}
    </div>
  );
};
