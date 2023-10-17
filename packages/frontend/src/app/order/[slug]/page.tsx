"use client"

// @todo fill the page with the basic order information
import { readContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useEffect, useState } from "react"
import format from "date-fns/format"

import { Title, Text, Card, Metric, Flex, ProgressBar, Icon, Button } from "@tremor/react"
import { GasOrderABI } from "helpers/abi"
import { FilteredOrderStructOutput } from "typechain-types/GasOrder"
import { useAccount } from "wagmi"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import StatusBadge from "../../../components/StatusBadge"
import { COLOR_BY_STATUS, STATUS } from "../../../constants/themeConstants"

export default function Page({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [orderData, setOrderData] = useState<null | FilteredOrderStructOutput>(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  const [isError, setIsError] = useState(false)

  const isRevocable =
    orderData?.manager === address &&
    (Number(orderData.status) === STATUS.Pending || Number(orderData.status) === STATUS.Untaken)

  const fetchOrderData = async () => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "getOrdersById",
        args: [[params.slug], address],
      })
      console.log("GetOrdersById DATA", data)
      setOrderData(data[0] as FilteredOrderStructOutput)
    } catch (e) {
      console.log("GetOrdersById ERROR: ", e)
      setIsError(true)
    }
  }

  const revokeOrder = async () => {
    try {
      const data = await writeContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "retrieveGasCost",
        args: [address, params.slug, orderData.availableGasHoldings],
      })
      console.log("SingleOrderPage Retrieve Gas DATA", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("SingleOrderPageTXData: ", txData)
    } catch (e) {
      console.log("SingleOrderPage Retrieve Gas ERROR", e)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [])

  return (
    <>
      <Title>Order number: {params.slug}</Title>
      {orderData && (
        <Card className="mt-3" decoration="top" decorationColor={COLOR_BY_STATUS[Number(orderData.status)]}>
          <StatusBadge status={Number(orderData.status)} />

          {/* @dev Order Id */}
          <Metric>#{orderData.id.toString()}</Metric>

          <Text>Manager: {orderData.manager}</Text>
          {/* @dev Order executionPeriodStart and executionPeriodDeadline */}
          {/*"yyyy.mm.dd hh:ss:mm"*/}
          <Text>
            Execution timeframe: {format(new Date(Number(orderData.executionPeriodStart) * 1000), "MMM d y, HH:mm:ss")}{" "}
            - {format(new Date(Number(orderData.executionPeriodDeadline) * 1000), "MMM d y, HH:mm:ss")}
          </Text>
          {/* @dev Order executionWindow */}
          <Text>Execution window: {orderData.executionWindow.toString()}</Text>
          {/* @dev Order executionWindow */}
          {/* @dev Order data, the details might be found in `TokenAmountWithDetails` structure */}
          <Text>{`Reward: ${orderData.reward.value} ${orderData.reward.symbol}`}</Text>
          <Text>{`Gas Cost: ${orderData.gasCost.value} ${orderData.gasCost.symbol}`}</Text>
          <Text>{`Guarantee: ${orderData.guarantee.value} ${orderData.guarantee.symbol}`}</Text>
          <Text>{`Available Gas Holdings: ${orderData.availableGasHoldings}`}</Text>

          {/* @dev Gas left (maxGas) */}
          <Flex className="mt-4">
            <Text>Used: 0 / {orderData.maxGas.toString()}</Text>
          </Flex>
          <ProgressBar value={32} className="mt-2" />
          <div className="flex flex-col gap-2 mt-4 md:flex-row-reverse">
            {isRevocable && <Button onClick={revokeOrder}>Revoke</Button>}
            {Number(orderData.status) === STATUS.Inactive && (
              <Button onClick={retrieveGuarantee}>Retrieve Guarantee</Button>
            )}
            {Number(orderData.availableGasHoldings) > 0 && <Button onClick={retrieveGasCost}>Retrieve Gas</Button>}
            <Button onClick={revokeOrder}>Revoke</Button>
            <Button onClick={retrieveGuarantee}>Retrieve Guarantee</Button>
            <Button onClick={retrieveGasCost}>Retrieve Gas</Button>
          </div>
        </Card>
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
