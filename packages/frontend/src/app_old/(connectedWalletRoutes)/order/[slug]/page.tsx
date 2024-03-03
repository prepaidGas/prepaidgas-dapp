"use client"

// @todo fill the page with the basic order information
import { readContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useEffect, useState } from "react"
import format from "date-fns/format"

import { Title, Text, Card, Metric, Flex, ProgressBar, Icon, Button, NumberInput, TextInput } from "@tremor/react"
import { GasOrderABI, prepaidGasCoreContractAddress } from "@/helpers"

import { FilteredOrderStructOutput } from "typechain-types/GasOrder"
import { useAccount } from "wagmi"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import StatusBadge from "@/components/StatusBadge"
import { COLOR_BY_STATUS, SPINNER_COLOR, STATUS } from "@/constants" // @todo improve path to the constants

import { TailSpin } from "react-loader-spinner"
import DialogWindow from "@/components/DialogWindow"

export default function Page({ params }: { params: { slug: string } }) {
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

  const isRevocable =
    orderData?.order?.manager === address &&
    (Number(orderData.status) === STATUS.Pending || Number(orderData.status) === STATUS.Untaken)

  const fetchOrderData = async () => {
    setIsLoading(true)
    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
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
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
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

  const revokeOrder = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
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

  const retrieveGuarantee = async () => {
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
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
        abi: GasOrderABI,
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
        abi: GasOrderABI,
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
          {/*Retrieve Gas Dialog Window START*/}
          {showWindowRetrieveGas &&
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
                  <Button variant="primary" onClick={retrieveGasCost}>
                    Retrieve
                  </Button>,
                  <Button
                    variant="secondary"
                    color="red"
                    onClick={() => {
                      setShowWindowRetrieveGas(false)
                      setTransactionDetailsRetrieveGas(null)
                      setGasAmountHasChanged(false)
                    }}
                  >
                    Cancel
                  </Button>,
                ]}
              ></DialogWindow>
            ))}
          {/*Retrieve Gas Dialog Window End*/}
          {/*Change Manager Dialog Window START*/}
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
                  <Button variant="primary" onClick={transferOrderManagement}>
                    Submit
                  </Button>,
                  <Button
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
                  </Button>,
                ]}
              ></DialogWindow>
            ))}
          {/*Change Manager Dialog Window END*/}
          <Title>Order number: {params.slug}</Title>
          <Card className="mt-3" decoration="top" decorationColor={COLOR_BY_STATUS[Number(orderData.status)]}>
            <StatusBadge status={Number(orderData.status)} />
            {/* @dev Order Id */}
            <Metric>#{orderData.id.toString()}</Metric>
            <Text>Manager: {orderData.order.manager}</Text>
            {/* @dev Order executionPeriodStart and executionPeriodDeadline */}
            {/*"yyyy.mm.dd hh:ss:mm"*/}
            <Text>
              Execution timeframe:{" "}
              {format(new Date(Number(orderData.order.executionPeriodStart) * 1000), "MMM d y, HH:mm:ss")} -{" "}
              {format(new Date(Number(orderData.order.executionPeriodDeadline) * 1000), "MMM d y, HH:mm:ss")}
            </Text>
            {/* @dev Order executionWindow */}
            <Text>Execution window: {orderData.order.executionWindow.toString()}</Text>
            {/* @dev Order executionWindow */}
            {/* @dev Order data, the details might be found in `TokenAmountWithDetails` structure */}
            <Text>{`Reward: ${orderData.reward.amount} ${orderData.reward.token}`}</Text>
            <Text>{`Gas Cost: ${orderData.gasCost.gasPrice} ${orderData.gasCost.token}`}</Text>
            <Text>{`Guarantee: ${orderData.guarantee.gasPrice} ${orderData.guarantee.token}`}</Text>
            <Text>{`Available Gas Holdings: ${orderData.gasBalance}`}</Text>
            {/* @dev Gas left (maxGas) */}
            <Flex className="mt-4">
              <Text>Used: 0 / {orderData.order.maxGas.toString()}</Text>
            </Flex>
            <ProgressBar value={32} className="mt-2" />
            <div className="flex flex-col gap-2 mt-4 md:flex-row-reverse">
              {isRevocable && <Button onClick={revokeOrder}>Revoke</Button>}
              {Number(orderData.status) === STATUS.Inactive && (
                <Button onClick={retrieveGuarantee}>Retrieve Guarantee</Button>
              )}
              {Number(orderData.gasBalance) > 0 && (
                <Button onClick={() => setShowWindowRetrieveGas(true)}>Retrieve Gas</Button>
              )}
              {orderData.order.manager === address && (
                <Button onClick={() => setShowWindowChangeManager(true)}>Change Manager</Button>
              )}
              {/*TODO: Remove test buttons*/}
              <Button onClick={revokeOrder}>TEST Revoke</Button>
              <Button onClick={retrieveGuarantee}>TEST Retrieve Guarantee</Button>
              <Button onClick={() => setShowWindowRetrieveGas(true)}>TEST Retrieve Gas</Button>
              <Button onClick={() => setShowWindowChangeManager(true)}>TEST Change Manager</Button>
            </div>
          </Card>
        </>
      )}
      {isError && (
        <Card className="mt-4" decoration="top" decorationColor="red">
          <div className="flex flex-row gap-4 justify-center items-center">
            <Icon icon={ExclamationCircleIcon} size="xl"></Icon>
            <Title>No such order was found</Title>
          </div>
        </Card>
      )}
    </>
  )
}
