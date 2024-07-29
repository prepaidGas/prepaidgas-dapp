import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState, useEffect } from "react"
import { UilWallet } from "@iconscout/react-unicons"
import { UilUser } from "@iconscout/react-unicons"
import { Button } from "antd"

export default function CustomConnectBttnSidebar({
  isActive = true,
  collapsed = false,
}: {
  isActive?: boolean
  collapsed?: boolean
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
          <div
            className={`${collapsed ? "pl-[15px] pr-[20px]" : "pl-[15px] pr-[20px] "} box-border`}
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
                  // <Button disabled={!isActive} onClick={openConnectModal} type="button">
                  //   Connect Wallet
                  // </Button>
                  <Button type="primary" disabled={!isActive} onClick={openConnectModal}>
                    {collapsed ? <UilWallet size="16" /> : "Connect Wallet"}
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
                <div className="flex flex-col gap-4">
                  <Button
                    type="primary"
                    disabled={!isActive}
                    onClick={openChainModal}
                    className="flex flex-row justify-center items-center gap-2"
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
                          <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 20, height: 20 }} />
                        )}
                      </div>
                    )}
                    {!collapsed && <span className="my-auto">{chain.name}</span>}
                  </Button>

                  <Button
                    type="primary"
                    disabled={!isActive}
                    onClick={openAccountModal}
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
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
