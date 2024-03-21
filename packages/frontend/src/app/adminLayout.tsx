import React, { useEffect } from "react"
import { Layout } from "antd"
import { useSelector } from "react-redux"
import { ThemeProvider } from "styled-components"
import Footer from "@/layout/footer"
import Sidebar from "@/layout/sidebar"
import HeaderTop from "@/layout/header"

const { Content } = Layout

import config from "@/config/config"
const { theme } = config

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  interface RootState {
    ChangeLayoutMode: {
      topMenu: boolean
      menuCollapse: boolean
      rtlData: boolean
      mode: string
    }
    auth: {
      login: boolean
    }
  }

  const { topMenu, collapsed, isLoggedIn, rtl, mainContent } = useSelector((state: RootState) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
      collapsed: state.ChangeLayoutMode.menuCollapse,
      isLoggedIn: state.auth.login,
      rtl: state.ChangeLayoutMode.rtlData,
      mainContent: state.ChangeLayoutMode.mode,
    }
  })

  if (mainContent === "darkMode") {
    document.body.classList.add("dark")
    document.body.classList.add("dark")
  }

  if (rtl) {
    const htmlElement: HTMLElement | null = document.querySelector("html")

    if (htmlElement) {
      htmlElement.setAttribute("dir", "rtl")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderTop />

      <div className="flex flex-row gap-5 mt-[72px]">
        <Sidebar />

        <Layout
          className={`max-w-full duration-[300ms] ${
            !topMenu ? `xl:ps-0 ease-[ease] ${collapsed ? "ps-[80px]" : "ps-[280px] delay-[150ms]"}` : ""
          }`}
        >
          <Content>
            {children}

            <Footer />
          </Content>
        </Layout>
      </div>
    </ThemeProvider>
  )
}

export default AdminLayout
