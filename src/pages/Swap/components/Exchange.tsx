import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

import { FetchQuote, formatBalance, getBalance } from "~/api";
import { fetchPrice } from "~/api/FetchPrice";
import { SwapIcon } from "~/assets";
import { useUserAccount } from "~/context/userAddrProvider";
import { useDebounce } from "~/utils/useDebounce";
import { AmountIn, AmountOut, Balance } from ".";
import { Token } from "./types";

export enum SwapState {
  READY,
  UNREADY,
  LOADING,
  INSUFFICIENT_FUNDS,
  ERROR,
}

export const Exchange = () => {
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [fromBalance, setFromBalance] = useState("0.00");
  const [toBalance, setToBalance] = useState("0.00");
  const [fromValue, setFromValue] = useState(0.0);
  const [toValue, setToValue] = useState("0.00");
  const [gasFee, setGasFee] = useState("0.00");
  const [state, setState] = useState(SwapState.UNREADY);
  const [stateMessage, setStateMessage] = useState("");

  const debouncedFromValue = useDebounce(fromValue, 300);
  const { accountAddr } = useUserAccount();

  const swapButtonTitle = useMemo<string>(() => {
    if (accountAddr == "") {
      return `Please connect wallet`;
    }
    switch (state) {
      case SwapState.READY:
      case SwapState.UNREADY:
      case SwapState.ERROR:
        return "Swap";
      case SwapState.INSUFFICIENT_FUNDS:
        return "Insufficient Funds";
      case SwapState.LOADING:
        return "Loading...";
    }
  }, [state, accountAddr]);

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
      if (parseFloat(fromBalance) < fromValue) {
        setState(SwapState.INSUFFICIENT_FUNDS);
        return;
      }
      setState(SwapState.READY);
    } catch (e) {
      setToValue("0.00");
      setState(SwapState.ERROR);
      if (e instanceof Error) {
        setStateMessage("Error: " + e.message);
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
      sellAmount: amount.toString(),
    };

    try {
      const resp = await FetchQuote(params);
      setGasFee(resp.estimatedGas);
      console.log(resp);

      // const toAmount = resp.buyAmount / 10 ** toToken.decimals;
      setState(SwapState.READY);
      return resp;
    } catch (error) {
      setState(SwapState.ERROR);
    }
  };

  const trySwap = async () => {
    if (!fromToken?.address) return;

    // approve allowance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20Abi = [
      "function approve(address spender, uint256 amount) public returns (bool)",
    ];
    const contract = new Contract(fromToken.address, erc20Abi, signer);
    const quoteJSON = await getQuote();
    const maxApproval = BigInt(2 ** 255).toString();
    try {
      await contract.approve(quoteJSON.allowanceTarget, maxApproval);
    } catch (error) {
      if (error instanceof Error) {
        setStateMessage(error.message);
      } else {
        setStateMessage("Error: fail to approve allowance");
      }
      return;
    }

    // swap
    try {
      await signer.sendTransaction({
        from: accountAddr,
        to: accountAddr,
        value: ethers.utils.parseEther(fromValue.toString()),
      });
    } catch (error) {
      if (error instanceof Error) {
        setStateMessage(error.message);
      } else {
        setStateMessage("Error: fail to transfer token");
      }
      return;
    }

    setStateMessage("Swapped succefully!");
    setFromValue(0);
  };

  useEffect(() => {
    getPrice();
  }, [fromToken, toToken, debouncedFromValue]);

  useEffect(() => {
    fetchBalance();
  }, [fromToken, toToken, accountAddr]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-[100%]">
        <AmountIn
          fromToken={fromToken}
          setFromToken={setFromToken}
          setFromValue={setFromValue}
        />
        <Balance tokenBalance={fromBalance} />
      </div>
      <SwapIcon
        className="w-10 h-10 mt-4 p-2 text-violet-500 rounded-lg hover:bg-violet-200 hover:text-violet-500 transition hover:rotate-180"
        onClick={() => {
          const temp = fromToken;
          setFromToken(toToken);
          setToToken(temp);
        }}
      />
      <div className="w-[100%]">
        <AmountOut
          toToken={toToken}
          toValue={toValue}
          setToToken={setToToken}
        />
        <Balance tokenBalance={toBalance} />
      </div>

      <div className="mb-8 px-2 w-[100%]">
        <span className="font-semibold">Estimated Gas Fee: </span>
        {gasFee}
      </div>

      {accountAddr && fromValue !== 0 && state == SwapState.READY ? (
        <button
          className="w-[260px] border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px] bg-violet-600/80 text-gray-100 cursor-pointer transition hover:bg-violet-600"
          onClick={trySwap}
        >
          Swap
        </button>
      ) : (
        <button
          disabled
          className="w-[260px] border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px] bg-violet-600/30 text-gray-100 cursor-not-allowed"
        >
          {swapButtonTitle}
        </button>
      )}

      {/* todo: only shows up for 3 seconds */}
      <p className="font-poppins font-lg text-gray-900 font-bold mt-7">
        {stateMessage}
      </p>
    </div>
  );
};
