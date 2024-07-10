"use client"

// @todo fill the page with the basic order information
import { readContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useEffect, useState } from "react"
import { useAccount, useNetwork } from "wagmi"
import format from "date-fns/format"

import { PrepaidGasABI, prepaidGasCoreContractAddress } from "@/helpers"

import { COLOR_BY_STATUS, SPINNER_COLOR, STATUS } from "@/constants"

import { Input, Modal, notification } from "antd"

import { TailSpin } from "react-loader-spinner"
import { Cards } from "@/components/cards/frame/cards-frame"
import OrderCard from "@/components/OrderCard"
import { FilteredOrderStructOutput } from "typechain-types/PrepaidGas"
import { Buttons } from "@/components/buttons"
import { PageHeaders } from "@/components/page-headers"

import { useRouter } from "next/router"

const testOrder = {
  executor: "0x6b7d3a21183ff2bcA15b1556Ad5945D7E5b46420",
  gasLeft: 100000,
  id: 29,
  status: 4,
  order: {
    gasGuarantee: { perUnit: 0, token: "0x7b48c77640d60B3088E0F519E66cE6eDA1ca8Db3" },
    gasPrice: { perUnit: 10, token: "0x4baBf49F774d6249C0B497E45C7B19B2BdbB2378" },
    end: 1717086060,
    expire: 1717000560,
    gas: 100000,
    manager: "0xA375835807cF54C3445c13a71A44dfd7f16A83F3",
    redeemWindow: 7200,
    start: 1716999732,
    txWindow: 600,
  },
}

export default function SingleOrderPage() {
  const router = useRouter()
  const { chain } = useNetwork()

  const [modal, contextHolder] = Modal.useModal()
  const [Notification, contextHolderNotification] = notification.useNotification()

  const [isLoading, setIsLoading] = useState(true)
  const [orderData, setOrderData] = useState<any>(testOrder)
  const { address } = useAccount()
  const [isError, setIsError] = useState(false)

  const PageRoutes = [
    {
      path: "/admin",
      breadcrumbName: "Home",
    },
    {
      path: "",
      breadcrumbName: "Order Management",
    },
  ]

  const checkIfClosable = () => {
    if (!!orderData) {
      if (
        orderData?.order?.manager === address &&
        (Number(orderData.status) === STATUS.Pending || Number(orderData.status) === STATUS.Untaken)
      ) {
        return true
      }
    }

    return false
  }

  //replace old function names
  const fetchOrderData = async () => {
    console.log("ID Numeric: ", Number(router.query.id))
    console.log("Typeof ID Numeric: ", typeof Number(router.query.id))
    console.log("ID HEX: ", `0x${Number(router.query.id).toString(16)}`)

    if (!router.query.id) {
      return
    }

    setIsLoading(true)
    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress(chain.id) as `0x${string}`,
        abi: PrepaidGasABI,
        functionName: "getOrdersByIds",
        args: [[Number(router.query.id)]],
      })
      console.log("getOrdersByIds DATA", data)
      setOrderData(data[0] as FilteredOrderStructOutput)
      setIsLoading(false)
    } catch (e) {
      console.log("getOrdersByIds ERROR: ", e)
      setIsLoading(false)
      setIsError(true)
      return
    }
  }

  const handleCloseOrder = async () => {
    const isConfirmed = await modal.confirm({
      title: "Close this order?",
      closable: false,
      content: "You're about to close this order. Proceed?",
    })
    if (isConfirmed) {
      closeOrder()
    }
  }

  //orderClose
  const closeOrder = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(chain.id),
        abi: PrepaidGasABI,
        functionName: "orderClose",
        args: [router.query.id],
      })
      console.log("SingleOrderPage Revoke Order DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("SingleOrderPageTXData: ", txData)
      Notification.success({ message: "Order was successfully closed" })
    } catch (e) {
      Notification.error({
        message: "We've encountered an issue on our end",
        description: "Please try closing the order later",
      })
      console.log("SingleOrderPage Revoke Order ERROR", e)
    }
  }

  const handleWithdrawOrder = async () => {
    const isConfirmed = await modal.confirm({
      title: "Withdraw this order?",
      closable: false,
      content: "You're about to withdraw this order. Proceed?",
    })
    if (isConfirmed) {
      withdrawOrder()
    }
  }

  //orderClose
  const withdrawOrder = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(chain.id),
        abi: PrepaidGasABI,
        functionName: "orderWithdraw",
        args: [router.query.id],
      })
      console.log("SingleOrderPage Revoke Order DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("SingleOrderPageTXData: ", txData)
      Notification.success({ message: "Order was successfully closed" })
    } catch (e) {
      Notification.error({
        message: "We've encountered an issue on our end",
        description: "Please try closing the order later",
      })
      console.log("SingleOrderPage Revoke Order ERROR", e)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [router])

  // useEffect(() => {
  //   fetchOrderData()
  // }, [transactionDetailsRetrieveGas, transactionDetailsChangeManager])

  // useEffect(() => {
  //   console.log("UseEffect TXDetails: ", transactionDetailsRetrieveGas)
  //   console.log("UseEffect TXDetails bool: ", Boolean(transactionDetailsRetrieveGas))
  // }, [transactionDetailsRetrieveGas])

  return (
    <>
      {contextHolder}
      {contextHolderNotification}
      <PageHeaders
        routes={PageRoutes}
        title="Order Management"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          {isLoading && (
            <div className="flex justify-center my-4">
              <TailSpin
                height={40}
                width={40}
                color={SPINNER_COLOR}
                ariaLabel="tail-spin-loading"
                radius="0"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
          {orderData && !isLoading && (
            <Cards headless className="max-w-[1024px] mx-auto">
              <OrderCard
                //todo: add correct conditions instead of true
                managementSettings={{
                  canWithdrawOrder: true,
                  onWithdrawOrder: handleWithdrawOrder,
                  canCloseOrder: true,
                  onCloseOrder: handleCloseOrder,
                }}
                {...orderData}
                className={"mt-4"}
                // onFavorited={onOrderCardAction}
                key={`order-${orderData.id}`}
              />
              <div className="flex flex-col gap-2 mt-4 md:flex-row-reverse">
                {checkIfClosable() && <Buttons onClick={handleCloseOrder}>Revoke</Buttons>}
                {checkIfClosable() && <Buttons onClick={handleWithdrawOrder}>Revoke</Buttons>}

                {/*TODO: Remove test buttons*/}
                {process.env.NODE_ENV === "development" && (
                  <>
                    <Buttons onClick={handleCloseOrder}>TEST Close</Buttons>
                    <Buttons onClick={handleWithdrawOrder}>TEST Retrieve Guarantee</Buttons>
                  </>
                )}
              </div>
            </Cards>
          )}
          {isError && (
            <Cards headless className="mt-4 max-w-[1024px] mx-auto">
              <div className="flex flex-row gap-4 justify-center items-center">
                {/* <Icon icon={ExclamationCircleIcon} size="xl"></Icon> */}
                <span>No such order was found</span>
              </div>
            </Cards>
          )}
        </div>
      </div>
    </>
  )
}
