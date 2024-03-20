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

  const onShowHide = () => {
    setHide(!hide)
  }

  return (
    <>
      <Header className="fixed w-full top-0 ltr:left-0 rtl:right-0 p-0 flex items-center justify-between bg-white dark:bg-[#1b1e2b] dark:shadow-[0_5px_20px_rgba(160,160,160,.02)] h-[72px] z-[99] font-Jost">
        <div className="flex flex-row items-center flex-1 h-full">
          <div className=" rtl:ssm:pr-[15px] ltr:pr-5 rtl:pl-5 ltr:ssm:pl-[15px] ltr:ssm:pr-[15px] rtl:ssm::pl:[15px] ltr:pl-[30px] rtl:pr-[30px] xs:ltr:pl-[20px] xs:rtl:pr-[20px] min-w-[280px] ssm:min-w-[220px] xs:min-w-[170px] h-full grid align-middle">
            <div className="flex items-center justify-between">
              <Link className="flex flex-row items-center gap-2" href="/admin">
                {/* todo: remove old logo image */}
                {/* <Image
                  className="w-full max-w-[120px] xs:max-w-[100px]"
                  src={layoutMode === "lightMode" ? "/img/logo_dark.svg" : "/img/logo_white.svg"}
                  alt="Logo"
                  width="140"
                  height="20"
                /> */}
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
                  className="p-0 bg-transparent border-none dark:border-transparent dark:bg-transparent dark:hover:text-primary text-[#525768] dark:text-white/60 hover:text-primary"
                  onClick={() => {
                    toggleCollapsed(!collapsed)
                  }}
                >
                  <ReactSVG src={`/img/icon/left-bar.svg`} className="[&>div>svg]:w-[20px] [&>div>svg]:h-[20px]" />
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between flex-auto ltr:mr-[10px] rtl:ml-[10px] [&>div:first-child]:flex [&>div]:items-center ">
            {isBrowser && window.innerWidth > 1200 && topMenu ? <TopMenu /> : <Customizer rtl={rtl} />}
            <div className="flex flex-row items-center md:hidden me-[17px]">
              {isBrowser && window.innerWidth > 1200 && topMenu ? (
                <div className="flex top-right-wrap">
                  <Customizer rtl={rtl} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="hidden md:flex items-center ltr:pr-[25px] rtl:pl-[25px] ltr:ssm:pr-[10px] rtl:ssm:pl-[10px] sm:gap-x-[10px]">
            <Link className="inline-flex text-light dark:text-white/60" onClick={onShowHide} href="#">
              <UilEllipsisV className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </Header>
      <Row>
        <Col md={0} sm={24} xs={24}>
          <div
            className={`w-full fixed top-0 ltr:left-0 rtl:right-0 py-2.5 md:px-[15px] md:py-2.5 shadow-[0px_2px_30px_#9299b810] [&>.hexadash-nav-actions__searchbar]:hidden dark:bg-[#1b1e2b] bg-white ${
              hide ? "mt-0 opacity-0 -z-10" : "mt-[72px] opacity-100 z-10"
            }`}
          ></div>
        </Col>
      </Row>
    </>
  )
}

export default HeaderTop
