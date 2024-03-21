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

import { Provider } from "react-redux"
import { store, wrapper } from "@/redux/store"
import AdminLayout from "./adminLayout"

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

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="h-full">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className + " min-h-[100%]"}>
        <Provider store={store}>
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
              {/* <AdminLayout> */}
              {children}
              <ConnectButton />
              {/* </AdminLayout> */}
            </RainbowKitProvider>
          </WagmiConfig>
        </Provider>
      </body>
    </html>
  )
}

export default wrapper.withRedux(RootLayout)
