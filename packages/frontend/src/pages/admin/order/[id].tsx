"use client"

// @todo fill the page with the basic order information
import { readContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useEffect, useState } from "react"
import format from "date-fns/format"

import { PrepaidGasABI, prepaidGasCoreContractAddress } from "@/helpers"

import { useAccount } from "wagmi"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import StatusBadge from "@/components/StatusBadge"
import { COLOR_BY_STATUS, SPINNER_COLOR, STATUS } from "@/constants"

import { TailSpin } from "react-loader-spinner"
import DialogWindow from "@/components/DialogWindow"
import { Cards } from "@/components/cards/frame/cards-frame"
import OrderCard from "@/components/OrderCard"
import { FilteredOrderStructOutput } from "typechain-types/PrepaidGas"
import { Buttons } from "@/components/buttons"

export default function SingleOrderPage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [orderData, setOrderData] = useState<null | FilteredOrderStructOutput>(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  const [isError, setIsError] = useState(false)

  const [showWindowRetrieveGas, setShowWindowRetrieveGas] = useState(false)
  const [gasAmountHasChanged, setGasAmountHasChanged] = useState(false)
  const [userBalance, setUserBalance] = useState<Number>(0)
  const [specifiedBalance, setSpecifiedBalance] = useState<Number>(0)
  const [transactionDetailsRetrieveGas, setTransactionDetailsRetrieveGas] = useState<null | any>(null)

  const [showWindowChangeManager, setShowWindowChangeManager] = useState(false)
  const [specifiedManager, setSpecifiedManager] = useState("")
  const [transactionDetailsChangeManager, setTransactionDetailsChangeManager] = useState<null | any>(null)

  const checkIfRevocable = () => {
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

  const fetchOrderData = async () => {
    setIsLoading(true)
    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress() as `0x${string}`,
        abi: PrepaidGasABI,
        functionName: "getOrdersByIds",
        args: [[params.slug], address],
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

    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress() as `0x${string}`,
        abi: PrepaidGasABI,
        functionName: "balanceAvailable",
        args: [address, params.slug],
      })
      console.log("BalanceAvailable: ", data)
      setUserBalance(Number(data))
    } catch (e) {
      console.log("getOrdersByIds ERROR: ", e)
      setIsError(true)
    }
  }

  //closeOrder
  const revokeOrder = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: PrepaidGasABI,
        functionName: "revokeOrder",
        args: [params.slug],
      })
      console.log("SingleOrderPage Revoke Order DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("SingleOrderPageTXData: ", txData)
    } catch (e) {
      console.log("SingleOrderPage Revoke Order ERROR", e)
    }
  }

  //
  const retrieveGuarantee = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: PrepaidGasABI,
        functionName: "retrieveGuarantee",
        args: [params.slug],
      })
      console.log("SingleOrderPage Retrieve Guarantee DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("SingleOrderPageTXData: ", txData)
    } catch (e) {
      console.log("SingleOrderPage Retrieve Guarantee ERROR", e)
    }
  }

  const retrieveGasCost = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: PrepaidGasABI,
        functionName: "retrieveGasCost",
        args: [address, params.slug, gasAmountHasChanged ? specifiedBalance : userBalance],
      })
      console.log("SingleOrderPage Retrieve Gas DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      setTransactionDetailsRetrieveGas({ ...txData })
      console.log("SingleOrderPageTXData: ", txData)
    } catch (e) {
      setTransactionDetailsRetrieveGas({ error: e })
      console.log("SingleOrderPage Retrieve Gas ERROR", e)
    }
  }

  const transferOrderManagement = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: PrepaidGasABI,
        functionName: "transferOrderManagement",
        args: [params.slug, specifiedManager],
      })
      console.log("SingleOrderPage Change Manager DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      setTransactionDetailsChangeManager({ ...txData })
      console.log("SingleOrderPageTXData: ", txData)
    } catch (e) {
      setTransactionDetailsChangeManager({ error: e })
      console.log("SingleOrderPage Change Manager ERROR", e)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [transactionDetailsRetrieveGas, transactionDetailsChangeManager])

  useEffect(() => {
    console.log("UseEffect TXDetails: ", transactionDetailsRetrieveGas)
    console.log("UseEffect TXDetails bool: ", Boolean(transactionDetailsRetrieveGas))
  }, [transactionDetailsRetrieveGas])

  return (
    <>
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
        <>
          <Cards headless className="max-w-[1024px] mx-auto">
            <OrderCard
              {...orderData}
              className={"mt-4"}
              // onFavorited={onOrderCardAction}
              key={`order-${orderData.id}`}
            />
            <div className="flex flex-col gap-2 mt-4 md:flex-row-reverse">
              {checkIfRevocable() && <Buttons onClick={revokeOrder}>Revoke</Buttons>}
              {Number(orderData.status) === STATUS.Inactive && (
                <Buttons onClick={retrieveGuarantee}>Retrieve Guarantee</Buttons>
              )}
              {Number(orderData.gasLeft) > 0 && (
                <Buttons onClick={() => setShowWindowRetrieveGas(true)}>Retrieve Gas</Buttons>
              )}
              {orderData.order.manager === address && (
                <Buttons onClick={() => setShowWindowChangeManager(true)}>Change Manager</Buttons>
              )}
              {/*TODO: Remove test buttons*/}
              <Buttons onClick={revokeOrder}>TEST Revoke</Buttons>
              <Buttons onClick={retrieveGuarantee}>TEST Retrieve Guarantee</Buttons>
              <Buttons onClick={() => setShowWindowRetrieveGas(true)}>TEST Retrieve Gas</Buttons>
              <Buttons onClick={() => setShowWindowChangeManager(true)}>TEST Change Manager</Buttons>
            </div>
          </Cards>
        </>
      )}
      {isError && (
        <Cards headless className="mt-4 max-w-[1024px] mx-auto">
          <div className="flex flex-row gap-4 justify-center items-center">
            {/* <Icon icon={ExclamationCircleIcon} size="xl"></Icon> */}
            <span>No such order was found</span>
          </div>
        </Cards>
      )}
    </>
  )
}

//todo: replace code under with antd modals
/* {showWindowRetrieveGas &&
            (Boolean(transactionDetailsRetrieveGas) ? (
              <DialogWindow
                onClose={() => {
                  setShowWindowRetrieveGas(false)
                  setTransactionDetailsRetrieveGas(null)
                }}
                isClosable={true}
                title="Transaction Result"
                description={
                  transactionDetailsRetrieveGas.error ? (
                    "There seems to be an error with your request :("
                  ) : (
                    <div className="flex flex-col break-words gap-4">
                      From
                      <Text>{transactionDetailsRetrieveGas.from}</Text>
                      To
                      <Text>{transactionDetailsRetrieveGas.to}</Text>
                      Transaction Hash
                      <Text>{transactionDetailsRetrieveGas.transactionHash}</Text>
                      Status
                      <Text>{transactionDetailsRetrieveGas.status}</Text>
                    </div>
                  )
                }
              ></DialogWindow>
            ) : (
              <DialogWindow
                onClose={() => {
                  setShowWindowRetrieveGas(false)
                  setTransactionDetailsRetrieveGas(null)
                  setGasAmountHasChanged(false)
                }}
                isClosable={true}
                title="Retrieve Gas"
                description={
                  <div className="flex flex-col">
                    <Text>Specify the amount of Gas you want to retrieve: </Text>
                    <div className="flex flex-col mt-4">
                      <NumberInput
                        value={!gasAmountHasChanged ? userBalance.toString() : specifiedBalance.toString()}
                        onChange={(e) => {
                          setGasAmountHasChanged(true)
                          setSpecifiedBalance(Number(e.target.value))
                        }}
                        // error={!!validationErrors?.to}
                        // errorMessage={validationErrors?.to}
                        spellCheck={false}
                      ></NumberInput>
                    </div>
                    <Text className="mt-4">{`(Max amount available for retrieving: ${userBalance})`}</Text>
                  </div>
                }
                actionButtons={[
                  <Buttons variant="primary" onClick={retrieveGasCost}>
                    Retrieve
                  </Buttons>,
                  <Buttons
                    variant="secondary"
                    color="red"
                    onClick={() => {
                      setShowWindowRetrieveGas(false)
                      setTransactionDetailsRetrieveGas(null)
                      setGasAmountHasChanged(false)
                    }}
                  >
                    Cancel
                  </Buttons>,
                ]}
              ></DialogWindow>
            ))}
          {showWindowChangeManager &&
            (Boolean(transactionDetailsChangeManager) ? (
              <DialogWindow
                onClose={() => {
                  setShowWindowChangeManager(false)
                  setTransactionDetailsChangeManager(null)
                }}
                isClosable={true}
                title="Transaction Result"
                description={
                  transactionDetailsChangeManager.error ? (
                    "There seems to be an error with your request :("
                  ) : (
                    <div className="flex flex-col break-words gap-4">
                      From
                      <Text>{transactionDetailsChangeManager.from}</Text>
                      To
                      <Text>{transactionDetailsChangeManager.to}</Text>
                      Transaction Hash
                      <Text>{transactionDetailsChangeManager.transactionHash}</Text>
                      Status
                      <Text>{transactionDetailsChangeManager.status}</Text>
                    </div>
                  )
                }
              ></DialogWindow>
            ) : (
              <DialogWindow
                onClose={() => {
                  setShowWindowChangeManager(false)
                  setTransactionDetailsChangeManager(null)
                }}
                isClosable={true}
                title="Transfer Order Management"
                description={
                  <div className="flex flex-col">
                    <Text>Specify the address of a new order manager: </Text>
                    <div className="flex flex-col mt-4">
                      <TextInput
                        value={specifiedManager}
                        onChange={(e) => {
                          setSpecifiedManager(e.target.value)
                        }}
                        // error={!!validationErrors?.to}
                        // errorMessage={validationErrors?.to}
                        spellCheck={false}
                      ></TextInput>
                    </div>
                  </div>
                }
                actionButtons={[
                  <Buttons variant="primary" onClick={transferOrderManagement}>
                    Submit
                  </Buttons>,
                  <Buttons
                    variant="secondary"
                    color="red"
                    onClick={() => {
                      {
                        setShowWindowChangeManager(false)
                        setTransactionDetailsChangeManager(null)
                      }
                    }}
                  >
                    Cancel
                  </Buttons>,
                ]}
              ></DialogWindow>
            ))} */
