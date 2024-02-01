"use client"
import { redirect } from "next/navigation"

import Image from "next/image"
import Link from "next/link"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import DialogWindow from "../components/DialogWindow"
import UserAgreement from "../components/UserAgreement"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { WalletIcon } from "@heroicons/react/24/outline"
import { Icon, Title } from "@tremor/react"

import dynamic from "next/dynamic"

const DynamicDialogWindow = dynamic(() => import("../components/DialogWindow"), { ssr: false })

export default function Home() {
  redirect("/order/create")
}
