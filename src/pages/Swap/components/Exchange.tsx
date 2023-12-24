import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";

import { ERC20TokenContract } from "@0x/contract-wrappers";
import Web3 from "web3";
import { FetchQuote, formatBalance, getBalance } from "~/api";
import { fetchPrice } from "~/api/FetchPrice";
import { useUserAccount } from "~/context/userAddrProvider";
import { useDebounce } from "~/utils/useDebounce";
import { AmountIn, AmountOut, Balance, Loader } from ".";
import { Token } from "./types";
import { BigNumber } from "@0x/utils";
import { erc20ABI, useContractRead } from "wagmi";
import { SwapButton } from "./SwapButton";
import { parseUnits } from "ethers";

export enum SwapState {
  LOADING,
  INSUFFICIENT_FUNDS,
  ERROR,
  READY,
}

export const Exchange = () => {
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [fromBalance, setFromBalance] = useState("0.00");
  const [toBalance, setToBalance] = useState("0.00");
  const [fromValue, setFromValue] = useState(0.0);
  const [toValue, setToValue] = useState("0.00");
  const [statusMessage, setStatusMessage] = useState("");
  const [state, setState] = useState(SwapState.READY);
  // const[disabled, setDisable] = useState(false)

  const debouncedFromValue = useDebounce(fromValue, 300);
  const { accountAddr } = useUserAccount();

  const swapButtonTitle = useMemo<string>(() => {
    if (accountAddr == "") {
      return `Please connect wallet`;
    }
    switch (state) {
      case SwapState.READY:
      case SwapState.ERROR:
        return "Swap";
      case SwapState.INSUFFICIENT_FUNDS:
        return "Insufficient Funds";
      case SwapState.LOADING:
        return "Loading...";
    }
  }, [state]);

  const disabled = useMemo(
    () =>
      fromBalance && fromValue
        ? parseUnits(fromValue.toString(), fromToken?.decimals) >
          parseUnits(fromBalance)
        : true,
    [fromValue, fromBalance]
  );

  const fetchBalance = async () => {
    if (!fromToken?.address || !toToken?.address || !accountAddr) {
      return;
    }
    setState(SwapState.LOADING);
    const balances = await getBalance(accountAddr, [
      fromToken.address,
      toToken.address,
    ]);

    balances.map((b) => {
      const balanceFormatted = formatBalance(b.tokenBalance ?? "0");
      if (b.contractAddress === fromToken?.address) {
        setFromBalance(balanceFormatted);
      } else {
        setToBalance(balanceFormatted);
      }
    });

    setState(SwapState.READY);
  };

  const getPrice = async () => {
    if (fromValue == 0 || !fromValue) {
      setToValue("0.00");
      return;
    }
    if (!fromToken || !toToken) {
      return;
    }
    setState(SwapState.LOADING);
    const amount = Number(fromValue * 10 ** fromToken.decimals);
    const params = {
      sellToken: fromToken.address,
      buyToken: toToken.address,
      buyDecimal: toToken.decimals,
      sellAmount: amount,
    };

    try {
      const result = await fetchPrice(params);
      setToValue(result.buyAmount.toFixed(6).toString());
    } catch (e) {
      setToValue("0.00");
      setState(SwapState.ERROR);
      if (e instanceof Error) {
        setStatusMessage("Error: " + e.message);
      }
    } finally {
      if (parseFloat(fromBalance) < fromValue) {
        setState(SwapState.INSUFFICIENT_FUNDS);
      } else {
        setState(SwapState.READY);
      }
    }
  };

  const getQuote = async () => {
    if (!fromToken?.address || !toToken?.address || fromValue <= 0) return;
    setState(SwapState.LOADING);
    const amount = Number(fromValue * 10 ** fromToken.decimals);
    const params = {
      sellToken: fromToken.address,
      buyToken: toToken.address,
      sellAmount: amount,
      takerAddress: accountAddr,
    };

    try {
      const resp = await FetchQuote(params);
      // const toAmount = resp.buyAmount / 10 ** toToken.decimals;
      // const gasFeeEstimate = resp.estimatedGas;
      return resp;
    } catch (error) {
      console.log(error);
    } finally {
      setState(SwapState.READY);
    }
  };

  const quoteJSON = getQuote().then((data) => data);

  // const trySwap = async () => {
  //   const web3 = new Web3(Web3.givenProvider);
  //   const quoteJSON = await getQuote();
  //   const maxApproval = new BigNumber(2).pow(256).minus(1);
  //   if (!web3.eth.currentProvider) {
  //     return;
  //   }
  //   const contract = new ERC20TokenContract(
  //     fromToken.address,
  //     web3.eth.currentProvider
  //   );
  //   console.log(contract);
  //   const tx = contract
  //     .approve(quoteJSON.allowanceTarget, maxApproval)
  //     .getABIEncodedTransactionData();
  //   // Perform the swap
  //   const receipt = await web3.eth.sendTransaction(tx);
  //   console.log("receipt: ", receipt);
  // };

  useEffect(() => {
    getPrice();
  }, [fromToken, toToken, debouncedFromValue]);

  useEffect(() => {
    fetchBalance();
  }, [fromToken, toToken, accountAddr]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8 w-[100%]">
        <AmountIn
          fromToken={fromToken}
          setFromToken={setFromToken}
          setFromValue={setFromValue}
        />
        <Balance tokenBalance={fromBalance} />
      </div>
      <div className="mb-8 w-[100%]">
        <AmountOut
          toToken={toToken}
          toValue={toValue}
          setToToken={setToToken}
        />
        <Balance tokenBalance={toBalance} />
      </div>

      {fromToken?.address && (
        <SwapButton
          disabled={disabled}
          fromAddress={fromToken?.address}
          getQuote={getQuote}
          onClick={trySwap}
        >
          Swap
        </SwapButton>
      )}

      <p className="font-poppins font-lg text-gray-900 font-bold mt-7">
        {statusMessage}
      </p>
    </div>
  );
};

type Props = {
  children: ReactNode;
};

const DisabledButton: React.FC<Props> = (props) => {
  return (
    <button
      disabled
      className="w-[260px] border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px] bg-violet-600/30 text-white/80 cursor-not-allowed"
    >
      {props.children}
    </button>
  );
};
