import { provider } from "./InfuraProvider";

export const getBlock = async (blockNumber: string | number) => {
  if (typeof blockNumber === "string") {
    blockNumber = parseInt(blockNumber);
  }
  const block = await provider.getBlock(blockNumber);
  return block;
};
