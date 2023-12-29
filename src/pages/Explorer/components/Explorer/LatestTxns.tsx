import { ethers } from "ethers";
import { Link } from "react-router-dom";
import BoxIcon from "~/assets/BoxIcon";

type LatestTxnsType = {
  transaction: ethers.providers.TransactionReceipt[] | undefined;
};

export const LatestTxns: React.FC<LatestTxnsType> = ({ transaction }) => {
  return (
    <div className="border rounded-lg divide-y shadow-lg shadow-gray-100">
      <div className="text-sm font-semibold py-4 px-3">
        Lastest Transactions
      </div>
      <div className="px-3 divide-y">
        {transaction &&
          transaction.map((txn, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <div className="py-4 flex gap-2 items-center">
                <BoxIcon className="w-12 h-12 p-3 text-gray-600 bg-gray-100 rounded-lg" />
                <div>
                  <Link to={`transaction/${txn}`}>
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
      <div className="flex items-center hover:cursor-pointer hover:text-sky-700 justify-center rounded-b-lg py-4 font-semibold text-gray-500 bg-gray-50 text-xs">
        VIEW ALL TRANSACTIONS
      </div>
    </div>
  );
};
