"use client"
import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from "@/wagmiconfig"
// const customChain = {
//     chainId: 80002,
//     rpc: ["https://polygon-amoy.infura.io/v3/a25e6cf028634bad847b80e6f0949121"],
//     nativeCurrency: {
//         name: "Amoy",
//         symbol: "POL",
//         decimals: 18
//     },
//     shortName: "Amoy",
//     slug: "amoy",
//     testnet: true,
//     chain: "polygon amoy",
//     name: "Polygon Amoy Testnet",
// }
export default function MyThirdwebProvider({ children }) {
    const queryClient = new QueryClient()
    return (
        <div>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    )
}
