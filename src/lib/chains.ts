import { defineChain } from 'viem';

export const polygon = defineChain({
  id: 137,
  name: 'Polygon',
  nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'] },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
  },
});

export const POLYGON_CHAIN_ID = 137;
export const DEFAULT_CHAIN = polygon;
