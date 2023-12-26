import BoxIcon from "~/assets/BoxIcon";

export const LastestTxns = () => {
  return (
    <div className="border rounded-lg divide-y shadow-lg shadow-gray-100">
      <div className="text-sm font-semibold py-4 px-3">
        Lastest Transactions
      </div>
      <div className="px-3 divide-y">
        <div className="flex justify-between items-center text-sm">
          <div className="py-4 flex gap-2 items-center">
            <BoxIcon className="w-12 h-12 p-3 text-gray-600 bg-gray-100 rounded-lg" />
            <div>
              <p className="text-sky-600">18867803</p>
              <p className="text-gray-500">20 secs ago</p>
            </div>
          </div>
          <div>
            <p>Fee Recipient beaverbuild</p>
            <p>171 txns in 12 secs</p>
          </div>
          <div className="border rounded-lg p-2 font-semibold text-xs">
            0.005237 Eth
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="py-4 flex gap-2 items-center">
            <BoxIcon className="w-12 h-12 p-3 text-gray-600 bg-gray-100 rounded-lg" />
            <div>
              <p className="text-sky-600">18867803</p>
              <p className="text-gray-500">20 secs ago</p>
            </div>
          </div>
          <div>
            <p>Fee Recipient beaverbuild</p>
            <p>171 txns in 12 secs</p>
          </div>
          <div className="border rounded-lg p-2 font-semibold text-xs">
            0.005237 Eth
          </div>
        </div>
      </div>
      <div className="flex items-center hover:cursor-pointer hover:text-sky-700 justify-center rounded-b-lg py-4 font-semibold text-gray-500 bg-gray-50 text-xs">
        VIEW ALL BLOCKS
      </div>
    </div>
  );
};
