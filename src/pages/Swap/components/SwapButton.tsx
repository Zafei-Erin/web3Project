import React from "react";
import {
  erc20ABI,
  useContractRead,
  type Address,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import { useUserAccount } from "~/context/userAddrProvider";

type Props = {
  fromAddress: Address;
  disabled: boolean;
  getQuote: () => unknown;
  onClick: () => void;
};

const exchangeProxy = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";
const MAX_ALLOWANCE =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const SwapButton: React.FC<Props> = ({
  fromAddress,
  disabled,
  onClick,
  getQuote,
}) => {
  const { accountAddr } = useUserAccount();

  const { data: allowance, refetch } = useContractRead({
    address: fromAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [accountAddr as Address, exchangeProxy],
  });

  const { config } = usePrepareContractWrite({
    address: fromAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [exchangeProxy, MAX_ALLOWANCE],
  });

  const {
    data: writeContractResult,
    writeAsync: approveAsync,
    error,
  } = useContractWrite(config);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      console.log("onSuccess data: ", data);
      refetch();
    },
  });

  const trySwap = async () => {
    const quoteJSON = await getQuote();
    if (!quoteJSON) {
      console.log("error");
      return;
    }
    const { config } = usePrepareSendTransaction({
      to: quoteJSON?.to, // The address of the contract to send call data to, in this case 0x Exchange Proxy
      data: quoteJSON?.data, // The call data required to be sent to the to contract address.
    });
  };

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  if (allowance === 0n && approveAsync) {
    return (
      <>
        <button
          type="button"
          //   className="w-[260px] border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px] bg-violet-500 text-gray-100 cursor-pointer"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={async () => {
            const writtenValue = await approveAsync();
            console.log("writtenValue: ", writtenValue);
          }}
        >
          {isApproving ? "Approving…" : "Approve"}
        </button>
      </>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-25"
    >
      {disabled ? "Insufficient Balance" : "Review Trade"}
    </button>
  );
};
