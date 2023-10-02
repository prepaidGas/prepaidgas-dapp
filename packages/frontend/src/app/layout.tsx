"use client" //@todo move it into child component

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultWallets, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { hardhat, mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient } = configureChains([mainnet, hardhat], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: "PrepaidGas",
  projectId: "PREPAIDGAS",
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

import { Grid, Col } from "@tremor/react"
import CookieBanner from "../components/CookieBanner"

// @todo add env var with the contracts addresses
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={lightTheme({ accentColor: "#f97316" })}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
        <CookieBanner />
      </body>
    </html>
  )
}
