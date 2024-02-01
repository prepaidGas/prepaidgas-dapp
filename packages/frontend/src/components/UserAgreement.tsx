import { ReactNode, useState } from "react"
import Link from "next/link"
import { Button } from "@tremor/react"
import CustomConnectBttn from "./CustomConnectBttn"

export default function UserAgreement() {
  const [isTosAccepted, setIsTosAccepted] = useState(false)

  return (
    <div>
      <div className="flex flex-col mt-4">
        <div className="flex flex-row gap-2">
          <label className="w-auto h-[31px] flex flex-row justify-center items-center gap-1">
            <input
              onClick={() => setIsTosAccepted(!isTosAccepted)}
              checked={isTosAccepted}
              type="checkbox"
              name="tos-checkbox"
            />{" "}
            I have read and accepted the{" "}
            <Link className="link" href={"/tos"} target="_blank">
              terms of service
            </Link>
          </label>
        </div>
        {/* {isTosAccepted ? <div className="flex mt-4 items-center justify-center">{children}</div> : null} */}
        <div className="flex mt-4 items-center justify-center">
          <CustomConnectBttn isActive={isTosAccepted} />
        </div>
      </div>
    </div>
  )
}
