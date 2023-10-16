"use client"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { Callout, Button, Color } from "@tremor/react"
import { Dispatch } from "react"

export default function ToasterPopup({
  msgTitle,
  msgBody,
  onClose,
  color,
}: {
  msgTitle: string
  msgBody: string
  color: Color
  onClose: () => void
}) {
  return (
    <Callout
      color={color}
      className="shadow-2xl fixed z-10 bottom-0 left-0 w-full md:bottom-6 md:left-6 md:w-auto"
      title={msgTitle}
      icon={ExclamationCircleIcon}
    >
      <div className="flex flex-col break-normal">
        {msgBody}
        <Button onClick={onClose} color={color} className="mt-4 self-end">
          OK
        </Button>
      </div>
    </Callout>
    // </div>
  )
}
