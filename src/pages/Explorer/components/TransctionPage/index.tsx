import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEthPrice } from "~/api/explorer/getEthPrice";
import { getTxn, getTxnReceipt } from "~/api/explorer/getTxnInfo";
import { TickIcon } from "~/assets/TickIcon";
import { Loader } from "~/pages/Swap/components";
import { calculateTime } from "~/utils";

export const TxPage = () => {
  const { txhash } = useParams();
  const [transaction, setTransaction] =
    useState<ethers.providers.TransactionResponse>();
  const [txnReceipt, setTxnReceipt] =
    useState<ethers.providers.TransactionReceipt>();
  const [ethPriceUsd, setEthPriceUsd] = useState("");

  const init = async (txhash: string) => {
    const tx = await getTxn(txhash);
    const txnReceipt = await getTxnReceipt(txhash);
    const ethPrice = await getEthPrice();
    setEthPriceUsd(ethPrice.ethusd);

    if (tx !== null) {
      setTransaction(tx);
    }
    if (txnReceipt !== null) {
      setTxnReceipt(txnReceipt);
    }
  };

  useEffect(() => {
    if (txhash !== undefined) {
      init(txhash);
    }
  }, [txhash]);

  const methodId = transaction?.data.slice(0, 10);
  const remain = transaction?.data.slice(10);
  const functionArray = [];
  if (remain) {
    for (let i = 0; i < remain.length; i += 64) {
      const func = remain.slice(i, i + 64);
      functionArray.push(func);
    }
  }

  const gasPrice = transaction?.gasPrice;
  const gasPriceGwei = gasPrice && ethers.utils.formatUnits(gasPrice, 9);
  const gasPriceEth = gasPrice && ethers.utils.formatEther(gasPrice);
  const gasUsed = txnReceipt?.gasUsed;
  let transactionFeeEth;
  if (gasUsed && gasPrice) {
    const transactionFee = txnReceipt.gasUsed.mul(gasPrice);
    transactionFeeEth = ethers.utils.formatEther(transactionFee);
  }
  let txnFeeUsd;
  if (transactionFeeEth) {
    txnFeeUsd = parseFloat(ethPriceUsd) * parseFloat(transactionFeeEth);
    txnFeeUsd = txnFeeUsd.toFixed(2);
  }
  let valueUsd;
  if (transaction?.value) {
    valueUsd = transaction.value.toNumber() * parseFloat(ethPriceUsd);
    valueUsd = valueUsd.toFixed(2);
  }

  let gasUsedFormatted;
  let gasUsedPercentage;
  if (gasUsed && transaction?.gasLimit) {
    gasUsedFormatted = gasUsed.toNumber().toLocaleString();
    gasUsedPercentage =
      (gasUsed.toNumber() / transaction.gasLimit.toNumber()) * 100;
    gasUsedPercentage = gasUsedPercentage.toFixed(2);
  }

  return (
    <div className="px-3 bg-gray-50 pb-36 py-12 flex items-center justify-center">
      <div className="w-full xl:w-[85%] space-y-4">
        <div className="flex gap-2 items-center">
          <div className=" font-semibold text-lg">Transaction</div>
          <p className="text-sm text-gray-500">#{txhash}</p>
        </div>
        <hr />
        <div>
          {transaction === undefined || txnReceipt === undefined ? (
            <div className="border bg-white rounded-lg p-4 space-y-4 h-[36rem] flex items-center justify-center">
              <Loader className="w-16 h-16" />
            </div>
          ) : (
            <div className="border bg-white rounded-lg p-4 space-y-4 text-nowrap">
              {/* first section */}
              <div className="space-y-2">
                <div className="text-sm md:flex md:gap-6 md:items-center max-md:space-y-2">
                  <div className="font-semibold ">Transaction Hash: </div>
                  <div className="">{txhash}</div>
                </div>
                <div className="font-semibold text-sm flex gap-6 py-2 items-center">
                  Statue:{" "}
                  <span className="font-semibold flex items-center justify-center gap-1 text-xs text-green-600 border rounded-lg p-1 border-green-300 bg-green-100/30">
                    <TickIcon className="w-3 h-3 fill-green-600" />
                    {txnReceipt?.byzantium === true &&
                      txnReceipt?.status === 1 &&
                      "Success"}
                  </span>
                </div>
                <div className="text-sm md:flex md:gap-6 md:items-center max-md:space-y-2">
                  <div className=" font-semibold">Block:</div>
                  <div className="flex gap-1 items-center">
                    <Link to={`/explorer/block/${transaction.blockNumber}`}>
                      <span className="font-normal text-sky-600 hover:text-sky-700">
                        {transaction.blockNumber}
                      </span>
                    </Link>
                    <div className="text-xs border rounded-lg bg-gray-50 p-1">
                      {transaction.confirmations} Block Confirmations
                    </div>
                  </div>
                </div>
                {transaction.timestamp && (
                  <div className="font-semibold text-sm md:flex md:gap-6">
                    <div className=" py-2">Timestamp:</div>
                    <div className="font-normal py-2 flex gap-1">
                      {calculateTime(transaction.timestamp)}
                      <span>
                        ({new Date(transaction.timestamp * 1000).toUTCString()})
                      </span>
                    </div>
                  </div>
                )}
                <hr />

                <div className="font-semibold text-sm md:flex md:gap-6 md:items-center">
                  <div className=" py-2">From:</div>
                  <Link to={`/expolorer/account/${transaction.from}`}>
                    <span className="font-normal py-2 text-sky-600 hover:text-sky-700 transition">
                      {transaction.from}
                    </span>
                  </Link>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6 md:items-center">
                  <div className=" py-2">Interacted With (To):</div>
                  <Link to={`/expolorer/account/${transaction.to}`}>
                    <span className="font-normal py-2 text-sky-600 hover:text-sky-700 transition">
                      {transaction.to}
                    </span>
                  </Link>
                </div>
              </div>

              {/* second section */}
              <div className="space-y-2">
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Value:</div>
                  <div className="font-normal py-2">
                    {transaction.value.toNumber().toLocaleString()} ETH{" "}
                    <span className="text-gray-500">(${valueUsd})</span>
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Transaction Fee:</div>
                  <div className="font-normal py-2">
                    {transactionFeeEth} ETH{" "}
                    <span className="text-gray-500">(${txnFeeUsd})</span>
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Gas Price:</div>
                  <div className="font-normal py-2">
                    {gasPriceGwei} Gwei
                    <span className="pl-1 text-gray-500">
                      ({gasPriceEth} ETH)
                    </span>
                  </div>
                </div>
                <div className="font-semibold text-sm md:flex md:gap-6">
                  <div className=" py-2">Gas Limit & Usage by Txn:</div>
                  <div className="flex gap-2 items-center">
                    <span className="font-normal py-2">
                      {transaction.gasLimit.toNumber().toLocaleString()}
                    </span>
                    <span className="font-normal py-2 text-gray-300">|</span>
                    <span className="font-normal py-2">
                      {gasUsedFormatted} ({gasUsedPercentage}%)
                    </span>
                  </div>
                </div>
              </div>
              <hr />

              {/* third section */}
              <div className="space-y-2">
                <div className="flex gap-2 text-nowrap">
                  <div className="font-semibold text-xs border rounded-lg bg-gray-50 w-fit px-2 py-1 flex gap-1">
                    <div className="text-gray-500">Txn Type:</div>
                    <span className="font-semibold">
                      {transaction.type}{" "}
                      {transaction.type === 2 && "(EIP-1559)"}
                    </span>
                  </div>
                  <div className="font-semibold text-xs border rounded-lg bg-gray-50 w-fit px-2 py-1 flex gap-1">
                    <div className="text-gray-500">Nonce:</div>
                    <div className="font-semibold">{transaction.nonce}</div>
                  </div>
                  <div className="font-semibold text-xs border rounded-lg bg-gray-50 w-fit px-2 py-1 flex gap-1">
                    <div className="text-gray-500">Position In Block: </div>
                    <div className="font-semibold">
                      {txnReceipt.transactionIndex}
                    </div>
                  </div>
                </div>

                <div className="text-sm md:flex md:gap-6">
                  <div className="font-semibold py-2">Input Data:</div>
                  <div className="border h-48 bg-gray-50 rounded-lg px-3 text-gray-500 overflow-x-auto overflow-y-auto text-wrap">
                    <div className="font-normal py-2">MethodID: {methodId}</div>
                    <div>
                      {functionArray.map((func, index) => (
                        <div key={index}>
                          [{index}]: <div className="">{func}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
