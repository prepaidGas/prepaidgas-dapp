"use client"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { Callout, Button } from "@tremor/react"
import { Dispatch } from "react"

export default function ToasterPopup({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    // <div className="w-screen top-0 left-0 fixed flex justify-center z-[60]">
    // <div className="fixed z-10 p-4 bottom-0 left-0 w-full lg:bottom-6 lg:left-6 lg:w-auto ">
    <Callout
      color="blue"
      className="shadow-2xl fixed z-10 bottom-0 left-0 w-full md:bottom-6 md:left-6 md:w-auto"
      title={msg}
      icon={ExclamationCircleIcon}
    >
      <div className="flex flex-col break-normal">
        {msg}
        <Button onClick={onClose} color="blue" className="mt-4 self-end">
          OK
        </Button>
      </div>
    </Callout>
    // </div>
  )
}
