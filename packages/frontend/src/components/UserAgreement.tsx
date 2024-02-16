import { ReactNode, useState } from "react"
import Link from "next/link"
import { Button } from "@tremor/react"
import CustomConnectBttn from "./CustomConnectBttn"

export default function UserAgreement() {
  const [isTosAccepted, setIsTosAccepted] = useState(false)
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false)

  return (
    <div>
      <div className="flex flex-col">
        {/* <div className="flex flex-row gap-2">
          <label className="w-auto h-[31px] flex flex-row justify-center items-center gap-1">
            <input
              onClick={() => setIsTosAccepted(!isTosAccepted)}
              checked={isTosAccepted}
              type="checkbox"
              name="tos-checkbox"
              className="mr-2"
            />{" "}
            I have read and accepted the{" "}
            <Link className="link" href={"/tos"} target="_blank">
              terms of service
            </Link>
          </label>
        </div>
        <div className="flex flex-row gap-2">
          <label className="w-auto h-[31px] flex flex-row justify-center items-center gap-1">
            <input
              onClick={() => setIsDisclaimerAccepted(!isDisclaimerAccepted)}
              checked={isDisclaimerAccepted}
              type="checkbox"
              name="disclaimer-checkbox"
              className="mr-2"
            />{" "}
            I have read and accepted the{" "}
            <Link className="link" href={"/disclaimer"} target="_blank">
              disclaimer
            </Link>
          </label>
        </div> */}
        <div className="flex mt-4 items-center justify-center">
          <CustomConnectBttn isActive={true} />
        </div>
      </div>
    </div>
  )
}
