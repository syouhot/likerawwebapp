import { createConfig, http } from 'wagmi'
import {  sepolia,polygonAmoy,mainnet } from 'wagmi/chains'
import {  metaMask, walletConnect } from 'wagmi/connectors'
const projectId = '0ffc93a13371d48b03fe42c869b82e6f'
export const config = createConfig({
  chains: [mainnet,polygonAmoy, sepolia],
   connectors: [
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
    [sepolia.id]: http(),
  },
})