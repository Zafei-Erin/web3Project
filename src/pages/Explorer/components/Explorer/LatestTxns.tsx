import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getLatestTransactions,
  getMoreTransactions,
} from "~/api/explorer/getEthPrice";
import { ArrowDown } from "~/assets";
import BoxIcon from "~/assets/BoxIcon";
import { Loader } from "~/pages/Swap/components";

export const LatestTxns: React.FC = () => {
  const [transaction, setTransaction] = useState<
    ethers.providers.TransactionReceipt[]
  >([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);

  const initTxns = async () => {
    const details = await getLatestTransactions();
    setTransaction(details);
  };

  const fetchMore = async (page: number) => {
    setLoadingMore(true);
    const newTxns = await getMoreTransactions(page);
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
              transaction.map((txn, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="py-4 flex gap-2 items-center">
                    <BoxIcon className="w-12 h-12 p-3 text-gray-600 bg-gray-100 rounded-lg" />
                    <div>
                      <Link to={`tx/${txn.transactionHash}`}>
                        <p className="text-sky-600 hover:text-sky-700">
                          {txn.transactionHash.slice(0, 18)}...
                        </p>
                      </Link>
                      <p className="text-gray-500">20 secs ago</p>
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
                      <Link to={`account/${txn.from}`}>
                        <p className="text-sky-600 hover:text-sky-700">
                          {" "}
                          {txn.to.slice(0, 8)}...{txn.to.slice(34)}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
                "VIEW MORE TRANSACTIONS"{" "}
                <ArrowDown className="w-4 h-4 hover:stroke-sky-700 stroke-2" />
              </div>
            )}
          </button>
        </>
      )}
    </div>
  );
};
