import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountBalance } from "~/api/explorer/getAccountInfo";
import { getEthPrice } from "~/api/explorer/getEthPrice";
import { formatPrice } from "../Explorer/EtherInfoBox";
import { TxnTable } from "./TxnTable";
import { InternalTxnTable } from "./InternalTxnTable";
import { Erc20TransferTable } from "./Erc20TransferTable";
import { NFTTransferTable } from "./NFTTransferTable";

type Tab = {
  type: string;
  title: string;
};

const tabs: Tab[] = [
  { type: "Transactions", title: "Transactions" },
  { type: "Internal", title: "Internal Transactions" },
  { type: "Token", title: "Token Transfers (ERC-20)" },
  { type: "NFT", title: "NFT Transafers" },
];

export const AccountPage = () => {
  const { address } = useParams();
  const [selectedTab, setSelectedTab] = useState(tabs[0].type);
  const [accountBalance, setAccountBalance] = useState("");
  const [etherPrice, setEtherPrice] = useState("");
  const ethValue = useMemo<string>(() => {
    const float =
      parseFloat(etherPrice.replace(",", "")) *
      parseFloat(accountBalance.replace(",", ""));

    return formatPrice(float.toString(), {
      maximumFractionDigits: 2,
    });
  }, [etherPrice, accountBalance]);

  useEffect(() => {
    async function fetchData(address: string) {
      const response = await getAccountBalance(address);
      const formattedBalance = ethers.utils.formatEther(response);
      setAccountBalance(formattedBalance);

      const price = await getEthPrice();
      const priceFormatted = formatPrice(price.ethusd, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      if (priceFormatted !== "NaN") {
        setEtherPrice(priceFormatted);
      }
    }

    if (address) {
      fetchData(address);
    }
  }, [address]);

  const tabList = tabs.map(({ type, title }, index) => (
    <button
      key={index}
      onClick={() => {
        setSelectedTab(type);
      }}
      className={`text-xs text-nowrap font-semibold p-2 rounded-xl transition ${
        selectedTab === type
          ? "bg-sky-600 text-gray-100"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {title}
    </button>
  ));

  const table = () => {
    switch (selectedTab) {
      case tabs[0].type:
        return <TxnTable />;
      case tabs[1].type:
        return <InternalTxnTable />;
      case tabs[2].type:
        return <Erc20TransferTable />;
      case tabs[3].type:
        return <NFTTransferTable />;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-gray-100 border-t min-h-screen">
      <div className="px-3 sm:px-4 py-2 2xl:max-w-[80%] mx-auto space-y-3">
        {/* header */}
        <div className="max-sm:space-y-2 sm:flex border-b py-4 sm:items-center sm:justify-start sm:gap-2">
          <div className="flex gap-2 items-center justify-start">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA4tJREFUeF7t3b1RHUEUROFZGw9fRQgY+JjYMiASIAkoMlEEMvFVJUJQELIhiGNcpvbDv+zbnp5ze/9mjp9/j88V/v5c34fqtW4+fqX63Yun9TsYYNZCDIAAyYGVoAiQ5O/FCIAAyUUIkOSbL0YABEguRIAk33wxAiBAciECJPnmixEAAZILESDJN1+MAAiQXIgASb75YgRAgORCBEjyzRefngB1COoMqMevA1iPX89//GngtAD1+AwQ3wiqA1BnQD0+AzBA9VCqrxNAC0jyr4UACBAt1MoRYPg+AgIgQJvCsRoBECBZSAhM8gmB26fgOP7bnz8CRAcIgUJgtFArFwKFwOQgLSDJJwRuH4Li+G9//sfly1NaH+Di+V/SsPaw99+P6fi1+PbuLf2LGiL/v16l4zNAkm8tBkCAZCEEiCleC9AC0gysxVqAFpA8pAVoAclArgJcBiYDuQxM8rkMXG4EuRGU5pA7gW2lVRlABkgTUAZI8skAMoCHQZ4GFoi4EeRGUPHPyiHQcvFJ/1xcCVCvosZfCasnkEdg+B8wQGwBw+OXD88ADJBMVAmqBST5ezECIEByEQIk+eaLEQABkgsRIMk3X4wACJBciABJvvliBECA5EIESPLNFyMAAiQXIkCSb74YARAguTAT4MfnQ1ofIP36tVY9gTqDzv77DwZoFtjdwAzQxn97gjEAA8gAxQNaQFFPCBxfZUwLOLmBGYABZIDiARmgqCcDyAC7z6Ddf78McHKCMQADCIHFA1pAUU8IFAJ3n0G7/35rBEWCWSvYWsHJQvWFlrxCiB1D0vjZMMJKoVYKTVOohigbRtgwIhmwFguBQmDykBAYvwvQArSANANrsRagBSQPaQFaQDKQG0H2C0gG8iwgyWe/APsF2C/AfgEFIkKgEFj80/cLqJ+H13v5dQYk9b5B8bR++aXQ6RP4BmOYfsK0fgyQhq8XM8B12zixD8Hsf2AABkgOrBlKC0jy92IEQIDkIgRI8s0XIwACJBciQJJvvhgBECC5EAGSfPPFCIAAyYUIkOSbL0YABEguRIAk33zx6QlQh2D3D0Pq+W9PgCoAA7SnqeMPgxigKYAAm38X0IZ/5UWmECCOQP02MB6eAWQAGaBOolSPAPG9/qT+WgsBEKB6KNUjAAIkA9Vil4EuA5OHXAYm+frn4fHwLgOFQCGwTqJULwQKgclAtVgIFAKTh74AmY99nby+K1UAAAAASUVORK5CYII="
              alt="address icon"
              className="rounded-full w-6"
            />
            <div className="text-xl font-semibold ">Address</div>
          </div>
          <span className="text-sm sm: sm:font-normal">{address}</span>
        </div>
        {/* Overview */}
        <div className="border rounded-xl p-4 flex flex-col gap-3 bg-white sm:w-[28rem] ">
          <div className="font-semibold text-sm">Overview</div>
          <div>
            <div className="text-gray-500 text-xs">ETH BALANCE</div>
            <div className="text-sm">{accountBalance} ETH</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">ETH VALUE</div>
            <div className="text-sm">
              ${ethValue || "0"} (
              <span className="text-xs">@ ${etherPrice}/ETH</span>)
            </div>
          </div>
        </div>
        {/* tabs */}
        <div className="flex text-nowrap space-x-2 w-full overflow-x-scroll pt-6 pb-2">
          {tabList}
        </div>

        {table()}
      </div>
    </div>
  );
};
