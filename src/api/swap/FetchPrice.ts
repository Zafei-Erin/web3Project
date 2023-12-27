type ParamsType = {
  sellToken: string;
  buyToken: string;
  buyDecimal: number;
  sellAmount: number;
};

type PriceResponse = {
  buyAmount: number;
  gasEstimate: number;
};

const API_KEY = import.meta.env.VITE_ZEROX_API_KEY;

export const fetchPrice = async (params: ParamsType): Promise<PriceResponse> => {
  const endPoint = "https://api.0x.org/swap/v1/price";
  const url = new URL(endPoint);
  const p = {
    sellToken: params.sellToken,
    buyToken: params.buyToken,
    sellAmount: params.sellAmount.toString(),
  };
  url.search = new URLSearchParams(p).toString();
  
  const response = await fetch(url, {
    method: "GET",
    headers: { "0x-api-key": API_KEY },
  });
  const swapPriceJSON = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(swapPriceJSON.reason));
  }

  return {
    buyAmount: swapPriceJSON.buyAmount / 10 ** params.buyDecimal,
    gasEstimate: swapPriceJSON.estimatedGas,
  };
};
