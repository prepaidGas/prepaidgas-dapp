"use client" //@todo move it into child component

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@rainbow-me/rainbowkit/styles.css"

import {
  ConnectButton,
  DisclaimerComponent,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { hardhat, mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { Grid, Col, Card, Button, Icon, Title } from "@tremor/react"
import CookieBanner from "@/components/CookieBanner"
import Sidebar from "@/components/Sidebar"
import { useEffect, useLayoutEffect, useState } from "react"
import { ArrowLeftIcon, Bars4Icon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import useMediaQuery from "@/hooks/useMediaQuery"
import Footer from "@/components/Footer"

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

const url = "http://localhost:3000"

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the <Link href={`${url}/tos`}>Terms of Service</Link> and acknowledge you
    have read and understand the protocol <Link href={`${url}/disclaimer`}>Disclaimer</Link>
  </Text>
)

// @todo add env var with the contracts addresses
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  const [showSidebar, setShowSidebar] = useState(false)
  // const [showDialogWindow, setShowDialogWindow] = useState(false)

  useLayoutEffect(() => {
    setShowSidebar(!isMobile)
    console.log("UseEffect: ", isMobile)
  }, [isMobile])

  return (
    <html lang="en" className="h-full">
      <body className={inter.className + " min-h-[100%]"}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            appInfo={{
              appName: "PrepaidGas",
              disclaimer: Disclaimer,
            }}
            //todo: decide wether to use theme attribute cuz it wraps all page in <div data-rk> which causes css problems
            // theme={lightTheme({ accentColor: "#f97316" })}
          >
            <>
              <header className={`header ${showSidebar ? "body-pd" : ""}`} id="header">
                <div className="w-full flex flex-row justify-between items-center py-3 px-4">
                  <div className="flex flex-row items-center">
                    <Button
                      className="scale-150"
                      icon={showSidebar ? ArrowLeftIcon : Bars4Icon}
                      variant="light"
                      onClick={() => setShowSidebar(!showSidebar)}
                    />
                  </div>
                </div>
              </header>

              <Sidebar showSidebar={showSidebar}></Sidebar>

              <div className={`content-main ${showSidebar ? "body-pd" : ""}`} id="content-main">
                <main className="p-8 max-w-screen-lg overflow-auto min-h-[100vh] w-full">{children}</main>
                <Footer />
              </div>
            </>
          </RainbowKitProvider>
        </WagmiConfig>
        <CookieBanner />
      </body>
    </html>
  )
}
