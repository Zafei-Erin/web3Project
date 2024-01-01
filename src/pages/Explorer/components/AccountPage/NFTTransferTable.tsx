import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getAccountERC1155TokenTransfer,
  getAccountNFTTokenTransfer,
} from "~/api/explorer/getAccountInfo";
import { NFTIcon } from "~/assets";
import { Loader } from "~/pages/Swap/components";
import { calculateTime } from "~/utils";

type TransferType = {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
  type: string;
};

const gridTemplateColumns =
  "minmax(10rem, 1fr) minmax(6rem, 1fr) minmax(9rem, 1fr) minmax(9rem, 1fr) minmax(5rem, 1fr) minmax(12rem, 1fr)";

export const NFTTransferTable: React.FC = () => {
  const { address } = useParams();
  const [data, setData] = useState<TransferType[]>();

  const init = async (address: string) => {
    const nftResp: TransferType[] = await getAccountNFTTokenTransfer(
      address,
      15
    );
    const erc1155Resp: TransferType[] = await getAccountERC1155TokenTransfer(
      address,
      15
    );
    console.log(erc1155Resp);

    const nftRespLabled = nftResp.map((resp) => {
      resp.type = "ERC-721";
      return resp;
    });
    const erc1155RespLabled = erc1155Resp.map((resp) => {
      resp.type = "ERC-1155";
      return resp;
    });

    nftRespLabled.push(...erc1155RespLabled);
    nftRespLabled.sort((a, b) => {
      return parseInt(b.timeStamp) - parseInt(a.timeStamp);
    });
    // console.log(nftRespLabled);
    setData(nftRespLabled);
  };

  useEffect(() => {
    if (address) {
      init(address);
    }
  }, [address]);

  if (data == undefined) {
    return (
      <div className="border rounded-xl h-[32rem] w-full break-normal bg-white flex items-center justify-center">
        <Loader className="w-20 h-20" />
      </div>
    );
  }

  return (
    <div className="border rounded-xl h-full w-full break-normal bg-white p-4 overflow-x-auto overflow-y-auto">
      <p className="mb-6 text-sm">
        {`Latest ${
          data && (data?.length > 15 ? "15" : data.length)
        } NFT Transfer Events`}
      </p>
      <table className="w-full border-collapse text-xs ">
        <thead>
          <tr
            className="grid p-4 gap-4 border-b"
            style={{
              gridTemplateColumns: gridTemplateColumns,
            }}
          >
            <th className="text-start">Txn Hash</th>
            <th className="text-start">Age</th>
            <th className="text-start">From</th>
            <th className="text-start">To</th>
            <th className="text-start">Type</th>
            <th className="text-start">Item</th>
          </tr>
        </thead>
        <tbody className=" divide-y">
          {data &&
            data.length > 0 &&
            data.map((txn, index) => {
              return (
                <tr
                  key={index}
                  className="grid py-3 px-4 gap-4 hover:bg-gray-100 text-start text-sm text-nowrap"
                  style={{
                    gridTemplateColumns: gridTemplateColumns,
                  }}
                >
                  <td className=" text-sky-600 hover:text-sky-700">
                    <Link to={`/explorer/transaction/${txn.hash}`}>
                      {txn.hash.slice(0, 18)}...
                    </Link>
                  </td>
                  <td className="">{calculateTime(txn.timeStamp)}</td>
                  <td className="text-sky-600 hover:text-sky-700 text-sm">
                    <Link to={`/explorer/account/${txn.from}`}>
                      {txn.from.slice(0, 8)}...{txn.from.slice(34)}
                    </Link>
                  </td>
                  <td className="text-sky-600 hover:text-sky-700">
                    <Link to={`/explorer/account/${txn.to}`}>
                      {txn.to.slice(0, 8)}...{txn.to.slice(34)}
                    </Link>
                  </td>
                  <td className="flex items-center justify-start">
                    <div className="border px-2 py-1 rounded-full text-center text-xs">
                      {txn.type}
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-start gap-2">
                    <NFTIcon className="flex-none w-9 h-9 border rounded-lg p-1 object-contain" />
                    <div className="">
                      <div className="text-start">
                        {txn.tokenSymbol} #{txn.tokenID.slice(0, 4)}
                        {txn.tokenID.length > 4 && "..."}
                      </div>
                      <div className="text-start text-xs text-gray-500">
                        {txn.tokenName}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
