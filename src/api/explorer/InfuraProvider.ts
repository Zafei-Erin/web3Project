import { ethers } from "ethers";

const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;

export const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
);
