import { ethers } from "ethers";

const INFURA_API_KEy = import.meta.env.VITE_INFURA_API_KEY;

export const getBlock = async (blockNumber: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_API_KEy}`
  );

  try {
    const block = await provider.getBlock(parseInt(blockNumber));
    return block;
  } catch (error) {
    console.log(error);
  }
};
