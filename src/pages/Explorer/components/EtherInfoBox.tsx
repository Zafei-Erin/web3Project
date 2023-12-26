import { EtherIcon, TransactionIcon } from "~/assets";
import Clock from "~/assets/Clock";
import MarketCapIcon from "~/assets/MarketCapIcon";

const EtherInfoBox: React.FC = () => {
  return (
    <div className="md:grid md:grid-cols-2 border rounded-xl w-full flex flex-col max-md:divide-y md:divide-x">
      <div className=" divide-y">
        {/* price */}
        <div className="p-4 flex gap-2 items-center justify-start">
          <EtherIcon className="w-5 object-contain" />
          <div>
            <p className="text-xs text-gray-500">ETHER PRICE</p>
            <p className="">$</p>
          </div>
        </div>
        {/* market cap */}
        <div className="p-4 flex gap-2 items-center justify-start">
          <MarketCapIcon className="w-7 h-7" />
          <div>
            <p className="text-xs text-gray-500">MARKET CAP</p>
            123
          </div>
        </div>
      </div>
      <div className="divide-y">
        {/* transactions */}
        <div className="flex gap-2 p-4 items-center justify-start">
          <TransactionIcon className="w-7 h-7" />
          <div>
            <p className="text-xs text-gray-500">TRANSACTIONS</p>
            <p>123</p>
          </div>
        </div>

        {/* last block */}
        <div className="p-4 flex gap-2 items-center justify-start">
          <Clock className="w-7 h-7" />
          <div>
            <p className="text-xs text-gray-500">LAST FINALIZED BLOCK</p>
            123s
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtherInfoBox;
