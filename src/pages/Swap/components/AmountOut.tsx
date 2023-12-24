import { useEffect, useState } from "react";
import { ChevronDownIcon } from "~/assets";
import { Token } from "./types";

type AmountOutProps = {
  toToken: Token | undefined;
  toValue: string;
  setToToken: (token: Token) => void;
};

export const AmountOut: React.FC<AmountOutProps> = ({
  toToken,
  setToToken,
  toValue,
}) => {
  const [showList, setShowList] = useState(false);
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [currentIndex, setCurrentIndex] = useState(15);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const resp = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    const respJson = await resp.json();
    const list = [];
    list.push(...respJson.tokens);
    setTokenList(list);

    const t2 = list.filter((t) => t.symbol === "DAI");
    setToToken(t2[0]);
  };
  return (
    <div className="flex justify-between items-center flex-row w-full min-w-full bg-site-dim border-[1px] border-transparent hover:border-site-dim2 min-h-[96px] sm:p-8 p-4 rounded-[20px]">
      <input
        className="w-full flex-1 bg-transparent outline-none font-poppins font-black text-2xl text-gray-900"
        placeholder="0.00"
        value={toValue}
        type="number"
        inputMode="decimal"
        disabled
      />

      <div
        className="relative"
        onClick={() => {
          setShowList((prev) => !prev);
        }}
      >
        <div className="flex flex-row items-center bg-site-dim2 py-2 px-4 rounded-xl font-poppins font-bold text-gray-900 text-xl">
          {toToken?.symbol.toUpperCase()}
          <ChevronDownIcon
            className={`w-6 h-6 object-contain ml-2 transition ${
              showList ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {/* todo: pagination, load more, search */}
        {showList && (
          <ul className="absolute z-10 right-0 bg-white border-[1px] border-site-dim2 max-w-[240px] mt-2 rounded-lg min-w-[200px] max-h-[45vh] overflow-y-auto text-gray-900">
            {tokenList.slice(0, currentIndex).map((token, index) => (
              <li
                key={index}
                className={`max-h-[50px] overflow-hidden flex items-center justify-start gap-2 p-3 hover:bg-gray-100 cursor-pointer ${
                  toToken?.name === token.name ? "bg-gray-100" : ""
                } `}
                onClick={() => {
                  setToToken(token);
                }}
              >
                <img
                  src={token.logoURI}
                  alt="tokenLogo"
                  className="object-contain"
                />
                <div className="truncate font-poppins font-medium text-base">
                  {token.name}
                </div>
              </li>
            ))}
            <div
              className="flex justify-center font-semibold max-h-[50px] overflow-hidden items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setCurrentIndex((prev) => prev + 10);
              }}
            >
              Load more
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};
