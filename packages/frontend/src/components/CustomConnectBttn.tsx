import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState, useEffect, DOMAttributes, MouseEventHandler } from "react"
import { Buttons } from "./buttons"
import { UilWallet } from "@iconscout/react-unicons"
import { UilUser } from "@iconscout/react-unicons"

export default function CustomConnectBttn({
  isActive = true,
  collapsed = false,
  onClick,
}: {
  isActive?: boolean
  collapsed?: boolean
  onClick: (...args: any[]) => void
}) {
  const [isLoading, setIsLoading] = useState(false)

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
                  <Buttons
                    disabled={!isActive}
                    onClick={() => {
                      openConnectModal()
                      setIsLoading(true)
                    }}
                    loading={isLoading}
                    className={`bg-primary hover:bg-primary/80 border-solid border-1 border-primary hover:border-primary/80 text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px]   w-full `}
                  >
                    {collapsed ? <UilWallet size="16" /> : "Connect Wallet"}
                  </Buttons>
                )
              } else {
                setIsLoading(false)

                if (chain.unsupported) {
                  return (
                    <Buttons
                      loading={isLoading}
                      onClick={openChainModal}
                      className={`bg-primary hover:bg-primary/80 border-solid border-1 border-primary hover:border-primary/80 text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px]   w-full `}
                    >
                      Wrong network
                    </Buttons>
                  )
                }

                onClick?.()

                return (
                  <Buttons
                    disabled={!isActive}
                    onClick={openChainModal}
                    className={`bg-primary hover:bg-primary/80 border-solid border-1 border-primary hover:border-primary/80 text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] w-full gap-1`}
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
                  </Buttons>
                )
              }
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
