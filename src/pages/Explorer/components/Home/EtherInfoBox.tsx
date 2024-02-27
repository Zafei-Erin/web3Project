import { useEffect, useState } from "react";
import { getEthPrice, getLatestBlockNumber } from "~/api/explorer/getEthPrice";
import { EtherIcon, TransactionIcon } from "~/assets";
import Clock from "~/assets/Clock";
import MarketCapIcon from "~/assets/MarketCapIcon";
import { EthPriceType } from "~/types/types";

export const formatPrice = (
  price: string,
  option?: Intl.NumberFormatOptions
): string => {
  return parseFloat(price).toLocaleString(undefined, option);
};

const EtherInfoBox: React.FC = () => {
  const [etherPrice, setEtherPrice] = useState<EthPriceType>();
  const [blockNumber, setBlockNumber] = useState<number>();
  const init = async () => {
    const price = await getEthPrice();
    setEtherPrice(price);
    const blockNumber = await getLatestBlockNumber();
    setBlockNumber(blockNumber);
  };

  // update on every refresh
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="md:grid bg-white md:grid-cols-2 border rounded-xl w-full flex flex-col max-md:divide-y md:divide-x">
      <div className=" divide-y">
        {/* price */}
        <div className="p-4 flex gap-2 items-center justify-start">
          <EtherIcon className="w-5 object-contain" />
          <div>
            <p className="text-xs text-gray-500">ETHER PRICE</p>
            <p className="">
              $
              {etherPrice &&
                formatPrice(etherPrice.ethusd, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
              <span className=" text-gray-500">
                @{" "}
                {etherPrice &&
                  formatPrice(etherPrice.ethbtc, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6,
                  })}{" "}
                BTC
              </span>
            </p>
          </div>
        </div>
        {/* market cap */}
        <div className="p-4 flex gap-2 items-center justify-start">
          <MarketCapIcon className="w-7 h-7" />
          <div>
            <p className="text-xs text-gray-500">MARKET CAP</p>
            <p className="h-6">123</p>
          </div>
        </div>
      </div>
      <div className="divide-y">
        {/* last block */}
        <div className="p-4 flex gap-2 items-center justify-start">
          <Clock className="w-7 h-7" />
          <div>
            <p className="text-xs text-gray-500">LATEST BLOCK</p>
            <p className="h-6">{blockNumber}</p>
          </div>
        </div>

        {/* transactions */}
        <div className="flex gap-2 p-4 items-center justify-start">
          <TransactionIcon className="w-7 h-7" />
          <div>
            <p className="text-xs text-gray-500">TRANSACTIONS</p>
            <p className="h-6">132</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtherInfoBox;
