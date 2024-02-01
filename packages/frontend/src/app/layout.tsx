"use client" //@todo move it into child component

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@rainbow-me/rainbowkit/styles.css"

import { ConnectButton, getDefaultWallets, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
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

import { Grid, Col, Card, Button } from "@tremor/react"
import CookieBanner from "../components/CookieBanner"
import Sidebar from "../components/Sidebar"
import { useState } from "react"
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline"

// @todo add env var with the contracts addresses
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <html lang="en" className="h-full">
      <body className={inter.className + " min-h-[100%]"}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={lightTheme({ accentColor: "#f97316" })}>
            <>
              <header className={`header ${showSidebar ? "body-pd" : ""}`} id="header">
                <Card className={`!rounded-none flex flex-row justify-between items-center py-3 px-4`}>
                  <div className="flex flex-row items-center">
                    <Button
                      className="scale-150"
                      icon={showSidebar ? XMarkIcon : Bars4Icon}
                      variant="light"
                      onClick={() => setShowSidebar(!showSidebar)}
                    />
                  </div>
                  <ConnectButton />
                </Card>
              </header>

              <Sidebar showSidebar={showSidebar}></Sidebar>

              <div className={`content-main ${showSidebar ? "body-pd" : ""}`} id="content-main">
                <main className="p-8 max-w-screen-lg mt-[4.5rem] overflow-auto">{children}</main>
              </div>
            </>
          </RainbowKitProvider>
        </WagmiConfig>
        <CookieBanner />
      </body>
    </html>
  )
}
