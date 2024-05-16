"use client"
import React, { ReactNode } from "react"

import { Cards } from "./cards/frame/cards-frame"
import { Divider } from "antd"
import { UilTimesSquare } from "@iconscout/react-unicons"
import { Modals } from "./modals/antd-modals"

interface DialogWindowProps {
  isClosable?: boolean
  withoutDescription?: boolean
  title?: ReactNode | string
  description?: ReactNode | string
  actionButtons?: null | ReactNode | ReactNode[]
  onClose?: () => void
}

export default function DialogWindow({
  isClosable = false,
  withoutDescription = false,
  title = "Title",
  description = "Description",
  actionButtons = null,
  onClose,
}: DialogWindowProps) {
  const renderDivider = () => {
    if (!withoutDescription && actionButtons !== null) {
      return <Divider />
    }

    return null
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/80 z-99998 flex justify-center items-center p-10">
      <div className="flex flex-col justify-center items-center md:w-auto md:h-auto md:max-w-lg">
        <Cards className="p-[25px]" headless>
          {isClosable ? (
            <div
              onClick={onClose}
              className="absolute right-1 top-1 cursor-pointer p-3 [&>*]:fill-[#404040] [&>*]:dark:fill-[#A4A5AA]"
            >
              <UilTimesSquare />
            </div>
          ) : null}

          {typeof title === "object" ? (
            title
          ) : (
            <span className="ml-4 text-[#404040] dark:text-[#A4A5AA] text-xl">{title}</span>
          )}

          <Divider />
          {withoutDescription ? null : typeof description === "object" ? description : <span> {description}</span>}
          {renderDivider()}
          <div className="flex flex-col gap-2">{actionButtons}</div>
        </Cards>
      </div>
    </div>
    // <Modals type={state.modalType} title="Basic Modal" visible={state.visible} onOk={handleOk} onCancel={handleCancel}>
    //   <div className="dark:text-white/60">
    //     <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
    //     <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
    //     <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
    //   </div>
    // </Modals>
  )
}
