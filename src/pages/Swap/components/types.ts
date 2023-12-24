import { Address } from "wagmi";

export type Token = {
  address: Address;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
};
