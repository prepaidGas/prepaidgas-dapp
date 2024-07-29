import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { UilEllipsisV } from "@iconscout/react-unicons"
import Customizer from "../customizer"
import TopMenu from "@/layout/TopMenu"

import { ReactSVG } from "react-svg"

import { Col, Layout, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { changeMenuCollapse } from "@/redux/themeLayout/actionCreator"

const { Header } = Layout

interface RootState {
  ChangeLayoutMode: {
    rtlData: boolean
    mode: string
    topMenu: boolean
    menuCollapse: boolean
  }
}

const HeaderTop = () => {
  const [hide, setHide] = useState(true)

  const { rtl, layoutMode, topMenu, collapsed } = useSelector((state: RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      layoutMode: state.ChangeLayoutMode.mode,
      topMenu: state.ChangeLayoutMode.topMenu,
      collapsed: state.ChangeLayoutMode.menuCollapse,
    }
  })

  const [isBrowser, setIsBrowser] = useState(false)
  const customizer = process.env.NODE_ENV == "production" ? null : <Customizer rtl={rtl} />

  useEffect(() => {
    setIsBrowser(true)

    const updateDimensions: any = () => {
      if (window.innerWidth <= 1200) {
        // @ts-ignore
        dispatch(changeMenuCollapse(true))
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  const dispatch = useDispatch()

  const toggleCollapsed = (value: boolean) => {
    //@ts-ignore
    dispatch(changeMenuCollapse(value))
  }

  return (
    <Header className="fixed w-full top-0 ltr:left-0 rtl:right-0 p-0 flex items-center justify-between bg-white dark:bg-[#1b1e2b] dark:shadow-[0_5px_20px_rgba(160,160,160,.02)] h-[72px] z-[99] font-Jost">
      <div className="h-full w-full">
        <div className="rtl:ssm:pr-[15px] ltr:pr-5 rtl:pl-5 ltr:ssm:pl-[15px] ltr:ssm:pr-[15px] rtl:ssm::pl:[15px] ltr:pl-[20px] rtl:pr-[30px] xs:ltr:pl-[20px] xs:rtl:pr-[20px] min-w-[280px] ssm:min-w-[220px] xs:min-w-[170px] h-full grid align-middle">
          <div className="flex items-center justify-between old-md:justify-start old-md:gap-4">
            <Link className="flex flex-row items-center gap-2" href="/admin">
              <Image
                className="w-[40px] h-[40px]"
                src={"/favicon.png"}
                alt="Logo"
                width="128"
                height="128"
                unoptimized={true}
              />
              <span className="text-xl font-bold text-[#404040] dark:text-[#A4A5AA] hidden old-md:inline">
                prepaidGas
              </span>
            </Link>
            {!topMenu || (typeof window !== "undefined" && window.innerWidth <= 1200) ? (
              <button
                className="p-0 bg-transparent border-none dark:border-transparent dark:bg-transparent dark:hover:text-primary text-[#525768] dark:text-white/60 hover:text-primary flex old-lg:hidden"
                onClick={() => {
                  toggleCollapsed(!collapsed)
                }}
              >
                <ReactSVG src={`/img/icon/left-bar.svg`} className="[&>div>svg]:w-[20px] [&>div>svg]:h-[20px]" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Header>
  )
}

export default HeaderTop
