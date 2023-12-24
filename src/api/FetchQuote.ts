const API_KEY = import.meta.env.VITE_ZEROX_API_KEY;

type ParamsType = {
  sellToken: string;
  buyToken: string;
  sellAmount: number;
  takerAddress: string;
};

export const FetchQuote = async (params: ParamsType) => {
  console.log("Getting Quote");
  const endPoint = "https://api.0x.org/swap/v1/quote";
  const url = new URL(endPoint);
  const p = { ...params, sellAmount: params.sellAmount.toString() };
  url.search = new URLSearchParams(p).toString();

  const response = await fetch(url, {
    method: "GET",
    headers: { "0x-api-key": API_KEY },
  });
  const swapQuoteJSON = await response.json();
  console.log("Quote: ", swapQuoteJSON);

  if (!response.ok) {
    console.log("error: ", response);

    throw new Error(JSON.stringify(swapQuoteJSON.reason));
  }

  return { swapQuoteJSON };
};
