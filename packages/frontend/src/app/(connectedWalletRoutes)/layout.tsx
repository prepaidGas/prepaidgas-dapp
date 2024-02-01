"use client"

import { Button, Grid, Col, Card, Accordion, AccordionHeader, AccordionBody, Title, Flex, Icon } from "@tremor/react"
import Link from "next/link"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Bars4Icon, FireIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Sidebar from "../../components/Sidebar"

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    console.log("ADDRESS: ", address)
    if (typeof address === "undefined") {
      redirect("/")
    }
  }, [address])

  let headerTailwind: string = "fixed h-[4rem] left-0 top-0 w-full flex z-50 flex-row bg-gray-300"

  return (
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
            {/* <Icon className="ml-4 hidden md:block" icon={FireIcon}></Icon> */}
            {/* <Title className="text-lg hidden md:inline">prepaidgas.io</Title> */}
          </div>
          <ConnectButton />
        </Card>
      </header>

      <Sidebar showSidebar={showSidebar}></Sidebar>

      <div className={`content-main ${showSidebar ? "body-pd" : ""}`} id="content-main">
        <main className="p-8 max-w-screen-lg mt-[4.5rem] overflow-auto">{children}</main>
      </div>
    </>
  )
}
