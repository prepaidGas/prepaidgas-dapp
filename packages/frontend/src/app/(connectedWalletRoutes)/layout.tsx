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
        <Card className="!rounded-none flex flex-row justify-between items-center py-3 px-4">
          <div className="flex flex-row items-center">
            <Button
              className="scale-150"
              icon={showSidebar ? XMarkIcon : Bars4Icon}
              variant="light"
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <Icon className="ml-4 hidden md:block" icon={FireIcon}></Icon>
            <Title className="text-lg hidden md:inline">prepaidgas.io</Title>
          </div>
          <ConnectButton />
        </Card>
      </header>

      <Sidebar showSidebar={showSidebar}></Sidebar>

      <div className={`${showSidebar ? "body-pd" : ""}`} id="content-main">
        {/* <nav className="fixed w-[20%] left-0 top-0 z-[49] h-[100%] overflow-y-auto hidden lg:block">
        <div className="rounded-none p-0 text-lg !bg-transparent border-none !pt-[4.5rem]">
          <Accordion className="!bg-transparent rounded-none border-none" defaultOpen={true}>
            <AccordionHeader className="bg-transparent rounded-none">Orders</AccordionHeader>
            <AccordionBody className="flex flex-col gap-2 bg-transparent rounded-none">
              <Link href="/order/create">
                <Button className="w-full">Create Order</Button>
              </Link>
              <Link href="/order/search">
                <Button className="w-full">Search</Button>
              </Link>
              <Link href="/order/saved">
                <Button className="w-full">Saved</Button>
              </Link>
              <Link href="/order/myorders">
                <Button className="w-full">My Orders</Button>
              </Link>
            </AccordionBody>
          </Accordion>
          <Accordion className="!bg-transparent rounded-none border-none" defaultOpen={true}>
            <AccordionHeader className="bg-transparent rounded-none">Transactions</AccordionHeader>
            <AccordionBody className="flex flex-col gap-2 bg-transparent rounded-none">
              <Link href="/tx/create">
                <Button className="w-full">Create Transaction</Button>
              </Link>
              <Link href="/tx/explorer">
                <Button className="w-full">Explorer</Button>
              </Link>
              <Link href="/tx/history">
                <Button className="w-full">History</Button>
              </Link>
              <Link href="/tx/requested">
                <Button className="w-full">Requested</Button>
              </Link>
            </AccordionBody>
          </Accordion>
        </div>
      </nav>

      {showSidebar && (
        <nav className="fixed w-[100%] left-0 top-0 z-[49] h-[100%] overflow-y-scroll block lg:hidden">
          <Card className="rounded-none p-3 text-lg !pt-[4.5rem] min-h-[100%]">
            <Accordion className="!bg-transparent rounded-none border-none" defaultOpen={true}>
              <AccordionHeader className="bg-transparent rounded-none">Orders</AccordionHeader>
              <AccordionBody className="flex flex-col gap-2 bg-transparent rounded-none">
                <Link href="/order/create">
                  <Button className="w-full">Create Order</Button>
                </Link>
                <Link href="/order/search">
                  <Button className="w-full">Search</Button>
                </Link>
                <Link href="/order/saved">
                  <Button className="w-full">Saved</Button>
                </Link>
                <Link href="/order/myorders">
                  <Button className="w-full">My Orders</Button>
                </Link>
              </AccordionBody>
            </Accordion>
            <Accordion className="!bg-transparent rounded-none border-none" defaultOpen={true}>
              <AccordionHeader className="bg-transparent rounded-none">Transactions</AccordionHeader>
              <AccordionBody className="flex flex-col gap-2 bg-transparent rounded-none">
                <Link href="/tx/create">
                  <Button className="w-full">Create Transaction</Button>
                </Link>
                <Link href="/tx/explorer">
                  <Button className="w-full">Explorer</Button>
                </Link>
                <Link href="/tx/history">
                  <Button className="w-full">History</Button>
                </Link>
                <Link href="/tx/requested">
                  <Button className="w-full">Requested</Button>
                </Link>
              </AccordionBody>
            </Accordion>
          </Card>
        </nav>
      )} */}

        <main className="p-8 max-w-screen-lg mt-[4.5rem] overflow-auto">{children}</main>
      </div>
    </>
  )
}
