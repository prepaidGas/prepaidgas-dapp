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
} from "@heroicons/react/24/outline"
import { Card, Text, Icon, Title } from "@tremor/react"
import { SPINNER_COLOR } from "../constants/themeConstants"
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
            <Link className="nav__link" href="#">
              <Icon className="nav__icon" icon={TableCellsIcon}></Icon>
              <Title className="nav__name">Dashboard</Title>
            </Link>
            <Link className="nav__link" href="#">
              <Icon className="nav__icon" icon={UserIcon}></Icon>
              <Title className="nav__name">Users</Title>
            </Link>
            <Link className="nav__link" href="#">
              <Icon className="nav__icon" icon={InboxIcon}></Icon>
              <Title className="nav__name">Messages</Title>
            </Link>
            <Link className="nav__link" href="#">
              <Icon className="nav__icon" icon={BookmarkIcon}></Icon>
              <Title className="nav__name">Favorites</Title>
            </Link>
            <Link className="nav__link" href="#">
              <Icon className="nav__icon" icon={FolderIcon}></Icon>
              <Title className="nav__name">Data</Title>
            </Link>
            <Link className="nav__link" href="#">
              <Icon className="nav__icon" icon={ChartBarIcon}></Icon>
              <Title className="nav__name">Analytics</Title>
            </Link>
          </div>

          <Link className="nav__link" href="#">
            <Icon className="nav__icon" icon={ArrowLeftOnRectangleIcon}></Icon>
            <Title className="nav__name">Log Out</Title>
          </Link>
        </div>
      </nav>
    </div>
  )
}
