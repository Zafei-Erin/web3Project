export const getLatestTxns = async () => {
  const url = "http://localhost:3001/getlatesttxns";
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error("fail to fetch block info");
  }

  const data = await resp.json();
  console.log(data);
  return data;
};
