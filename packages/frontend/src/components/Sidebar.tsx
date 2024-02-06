"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import {
  FireIcon,
  TableCellsIcon,
  UserIcon,
  InboxIcon,
  BookmarkIcon,
  FolderIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  DocumentPlusIcon,
  ArchiveBoxIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { Card, Text, Icon, Title } from "@tremor/react"
import { SPINNER_COLOR } from "@/constants"
import { z } from "zod"

const schema = z.object({
  from: z.string().min(1),
  nonce: z.number(),
  gasOrder: z.number(),
  onBehalf: z.string().min(1),
  deadlineDate: z.date(),
  deadlineTime: z.string().min(1),
  to: z.string().min(1),
  gas: z.number(),
  data: z.string().min(1),
})

type AddTxRequestState = z.infer<typeof schema>

export default function AddTxRequestCard({ showSidebar }: { showSidebar: boolean }) {
  const [activeLink, setActiveLink] = useState("")

  const links = [
    { name: "Create order", icon: DocumentPlusIcon, href: "/order/create" },
    // { name: "Order search", icon: DocumentMagnifyingGlassIcon, href: "/order/search" },
    // { name: "Saved", icon: BookmarkIcon, href: "/order/saved" },
    // { name: "My orders", icon: ClipboardDocumentListIcon, href: "/order/myorders" },
    { name: "New transaction", icon: DocumentPlusIcon, href: "/tx/create" },
    // { name: "Explorer", icon: FolderIcon, href: "/tx/explorer" },
    // { name: "History", icon: ArchiveBoxIcon, href: "/tx/history" },
    // { name: "Requested", icon: ClockIcon, href: "/tx/requested" },
  ]

  const linkOnClickHandler = (event: React.MouseEvent<HTMLElement>, linkName: string) => {
    // elemArr.forEach((elem) => elem.cl)
    setActiveLink(linkName)
  }

  useEffect(() => {}, [])
  return (
    <div className={`l-navbar ${showSidebar ? "show" : ""}`} id="nav-bar">
      <nav className="nav">
        <div>
          <Link className="nav__logo !py-3" href="#">
            <Icon className="nav__logo-icon" icon={FireIcon}></Icon>
            <Title className="nav__logo-name">prepaidgas.io</Title>
          </Link>

          <div className="nav__list">
            {links.map((item) => (
              <Link
                onClick={(event: React.MouseEvent<HTMLElement>) => linkOnClickHandler(event, item.name)}
                className={`nav__link ${activeLink === item.name ? "active" : ""}`}
                href={item.href}
              >
                <Icon className="nav__icon" icon={item.icon}></Icon>
                <Title className="nav__name">{item.name}</Title>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
