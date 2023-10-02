"use client"
import React, { ReactNode } from "react"

import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Card, Divider, Icon, Metric, Title, Subtitle } from "@tremor/react"
import { WalletIcon } from "@heroicons/react/24/outline"

interface DialogWindowProps {
  isClosable?: boolean
  title?: ReactNode | string
  description?: ReactNode | string
  actionButtons?: null | ReactNode | ReactNode[]
}

export default function DialogWindow({
  isClosable = true,
  title = "Title",
  description = "Description",
  actionButtons = null,
}: DialogWindowProps) {
  const consoleKek = () => {
    let i: ReactNode = <Card></Card>
    console.log(typeof i)
    return null
  }
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/30 z-50 flex justify-center items-center p-10">
      <div className="w-full h-full flex flex-col justify-center items-center md:w-auto md:h-auto">
        <Card decoration="top" decorationColor="orange">
          <div className="flex flex-row items-center">
            <Icon color="orange" variant="outlined" size="xl" icon={WalletIcon}></Icon>
            {typeof title === "object" ? title : <Title className="ml-4">{title}</Title>}
          </div>
          <Divider />
          {typeof description === "object" ? description : <Subtitle> {description}</Subtitle>}
          <Divider />
          {consoleKek()}
          <div className="flex justify-center items-center flex-row gap-2">
            {/* {Array.isArray(actionButtons) ? act} */}
            {actionButtons}
          </div>
        </Card>
      </div>
    </div>
  )
}
