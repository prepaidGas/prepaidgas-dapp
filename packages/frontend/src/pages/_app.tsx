import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { useRouter } from "next/router"
import type { AppProps } from "next/app"

import { Provider, useDispatch } from "react-redux"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import AdminLayout from "./adminLayout"
import AuthLayout from "./authLayout"
import { wrapper, store } from "../redux/store"
import "../i18n/config"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { hardhat, mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { ConnectButton, DisclaimerComponent, getDefaultWallets, lightTheme } from "@rainbow-me/rainbowkit"
import Head from "next/head"

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

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const renderLayout = () => {
    return (
      <>
        <Head>
          <title>prepaidGas</title>
        </Head>
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
            <AdminLayout>
              <Component {...pageProps} />
              <ConnectButton />
            </AdminLayout>
          </RainbowKitProvider>
        </WagmiConfig>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>prepaidGas</title>
      </Head>
      <Provider store={store}>{renderLayout()}</Provider>
    </>
  )
}

export default wrapper.withRedux(App)
