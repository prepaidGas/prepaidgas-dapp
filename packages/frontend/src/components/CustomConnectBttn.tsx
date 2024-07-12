import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState, useEffect, DOMAttributes, MouseEventHandler } from "react"
import { UilWallet } from "@iconscout/react-unicons"
import { UilUser } from "@iconscout/react-unicons"
import { Button } from "antd"

export default function CustomConnectBttn({
  isActive = true,
  collapsed = false,
  onClick,
}: {
  isActive?: boolean
  collapsed?: boolean
  onClick: (...args: any[]) => void
}) {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    disabled={!isActive}
                    onClick={() => {
                      openConnectModal()
                    }}
                    type="primary"
                    className="flex flex-row items-center gap-2"
                  >
                    {/* {collapsed ? <UilWallet size="16" /> : "Connect Wallet"} */}
                    <UilWallet size="16" />
                    Connect Wallet
                  </Button>
                )
              } else {
                if (chain.unsupported) {
                  return <Button onClick={openChainModal}>Wrong network</Button>
                }

                onClick?.()

                return (
                  <div className="flex items-center justify-center flex-row gap-4">
                    <Button
                      disabled={!isActive}
                      onClick={openChainModal}
                      type="primary"
                      className="flex flex-row justify-center items-center gap-2 "
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </div>
                      )}
                      {!collapsed && <span className="my-auto">{chain.name}</span>}
                    </Button>

                    <Button
                      disabled={!isActive}
                      onClick={openAccountModal}
                      type="primary"
                      className="flex flex-row justify-center items-center gap-2"
                    >
                      {collapsed ? (
                        <UilUser />
                      ) : (
                        <p>
                          {account.displayName}
                          {account.displayBalance ? ` (${account.displayBalance})` : ""}
                        </p>
                      )}
                    </Button>
                  </div>
                )
              }
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
