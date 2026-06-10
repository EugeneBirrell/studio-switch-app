import { base } from "viem/chains";
import { createConfig, http, injected } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

export const contractAddress =
  "0xcc46271bfba9cd08264550061b9e5c9f78574e2f" as `0x${string}`;

export const buildCode = "bc_l6pbcjlm";

export const attributionDataSuffix =
  "0x62635f6c367062636a6c6d0b0080218021802180218021802180218021" as `0x${string}`;

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
      unstable_shimAsyncInject: 1_000,
    }),
    coinbaseWallet({
      appName: "Studio Switch",
      preference: "all",
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
