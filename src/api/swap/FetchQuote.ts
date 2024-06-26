const API_KEY = import.meta.env.VITE_ZEROX_API_KEY;

type ParamsType = {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
};

export const FetchQuote = async (params: ParamsType) => {
  const endPoint = "https://api.0x.org/swap/v1/quote";
  const url = new URL(endPoint);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method: "GET",
    headers: { "0x-api-key": API_KEY },
  });
  const swapQuoteJSON = await response.json();

  if (!response.ok) {
    throw new Error("fail to fetch quotes");
  }

  return swapQuoteJSON;
};
