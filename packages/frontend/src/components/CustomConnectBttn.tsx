import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Card, Title, Text, Button } from "@tremor/react"
import { useState, useEffect } from "react"

export default function CustomConnectBttn({ isActive = false }) {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("consentedToCookies") === null) {
      setShowBanner(true)
    } else {
      setShowBanner(false)
    }
  })

  const onAccept = () => {
    localStorage.setItem("consentedToCookies", "1")
    setShowBanner(false)
  }

  const onReject = () => {
    localStorage.setItem("consentedToCookies", "0")
    setShowBanner(false)
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button disabled={!isActive} onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={openChainModal} style={{ display: "flex", alignItems: "center" }} type="button">
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
