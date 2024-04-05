import { ReactNode, useState } from "react"
import Link from "next/link"
import { Button } from "@tremor/react"
import CustomConnectBttn from "./CustomConnectBttn"

export default function UserAgreement() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex mt-4 items-center justify-center">
          <CustomConnectBttn isActive={true} />
        </div>
      </div>
    </div>
  )
}
