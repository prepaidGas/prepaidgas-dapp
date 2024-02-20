import { ExclamationTriangleIcon, WalletIcon } from "@heroicons/react/24/outline"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Card, Title, Text, Button, Icon } from "@tremor/react"
import { useState, useEffect } from "react"

export default function WalletInfo({ isActive = true }) {
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
                // return (
                //   <Button disabled={!isActive} onClick={openConnectModal} type="button" color="sky">

                //   </Button>
                // )
                return (
                  <div className="nav__link cursor-pointer" onClick={openConnectModal}>
                    <Icon className="nav__icon" icon={WalletIcon}></Icon>
                    <Title className="nav__name">Connect Wallet</Title>
                  </div>
                )
              }

              if (chain.unsupported) {
                return (
                  <div className="nav__link cursor-pointer" onClick={openChainModal}>
                    <Icon
                      className="nav__icon__wallet"
                      style={{ color: "#ef4444" }}
                      icon={ExclamationTriangleIcon}
                      color="red"
                    ></Icon>
                    <Title className="nav__name" color="red">
                      Wrong network
                    </Title>
                  </div>
                )
              }

              return (
                <div className="flex flex-col gap-2 ">
                  {/* <div className="nav__link cursor-pointer !mb-0" onClick={openAccountModal}>
                    <Icon className="nav__icon opacity-0" icon={WalletIcon}></Icon>
                    <Title className="nav__name break-normal">
                      {account.displayBalance ? `${account.displayBalance}` : ""}
                    </Title>
                  </div> */}
                  <div className="nav__link cursor-pointer " onClick={openAccountModal}>
                    <Icon className="nav__icon" icon={WalletIcon}></Icon>
                    <Title className="nav__name break-normal">{account.displayName}</Title>
                  </div>

                  <div className="nav__link cursor-pointer" onClick={openChainModal}>
                    <div
                      style={{
                        background: chain.iconBackground,
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                    >
                      {chain.iconUrl && (
                        <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} className="nav__icon__wallet" />
                      )}
                    </div>
                    <Title className="nav__name">{chain.name}</Title>
                  </div>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
