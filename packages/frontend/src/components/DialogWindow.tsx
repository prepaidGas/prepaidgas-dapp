"use client"
import React, { ReactNode } from "react"

import { Card, Divider, Icon, Metric, Title, Subtitle } from "@tremor/react"
import { WalletIcon, XCircleIcon } from "@heroicons/react/24/outline"

interface DialogWindowProps {
  isClosable?: boolean
  withoutDescription?: boolean
  title?: ReactNode | string
  description?: ReactNode | string
  actionButtons?: null | ReactNode | ReactNode[]
  onClose: () => void
}

export default function DialogWindow({
  isClosable = false,
  withoutDescription = false,
  title = "Title",
  description = "Description",
  actionButtons = null,
  onClose = null,
}: DialogWindowProps) {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/80 z-50 flex justify-center items-center p-10">
      <div className="w-full h-full flex flex-col justify-center items-center md:w-auto md:h-auto ">
        <Card decoration="top" decorationColor="orange">
          {isClosable ? (
            <Icon onClick={onClose} className="absolute right-1 top-1" size="lg" icon={XCircleIcon}></Icon>
          ) : null}
          <div className="flex flex-row items-center">
            <Icon color="orange" variant="outlined" size="lg" icon={WalletIcon}></Icon>
            {typeof title === "object" ? title : <Title className="ml-4">{title}</Title>}
          </div>
          <Divider />
          {withoutDescription ? null : typeof description === "object" ? (
            description
          ) : (
            <Subtitle> {description}</Subtitle>
          )}
          {withoutDescription ? null : <Divider />}
          <div className="flex justify-center items-center flex-col gap-2">{actionButtons}</div>
        </Card>
      </div>
    </div>
  )
}
