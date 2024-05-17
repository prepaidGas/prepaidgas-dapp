"use client"
import { useEffect } from "react"
import CreateOrder from "./order/create"
import Router from "next/router"

// Function to check if the user is logged in
const isUserLoggedIn = () => {
  const isLoggedIn = false

  return isLoggedIn
}

const Admin = () => {
  const isLoggedIn = isUserLoggedIn()

  //todo: remove old login logic
  // return isLoggedIn ? <DemoOne /> : <SignIn />
  // useEffect(() => {
  //   Router.push("/admin/order/create")
  // }, [])

  return <CreateOrder />
}

export default Admin
