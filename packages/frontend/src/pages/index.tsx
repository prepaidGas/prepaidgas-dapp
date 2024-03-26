"use client"
import { useEffect } from "react"
import DemoOne from "./admin"
import CreateOrder from "./admin/order/create"
import Router from "next/router"

// Function to check if the user is logged in
const isUserLoggedIn = () => {
  const isLoggedIn = false

  return isLoggedIn
}

const Home = () => {
  const isLoggedIn = isUserLoggedIn()

  //todo: remove old login logic
  // return isLoggedIn ? <DemoOne /> : <SignIn />
  useEffect(() => {
    Router.push("/admin/order/create")
  }, [])
}

export default Home
