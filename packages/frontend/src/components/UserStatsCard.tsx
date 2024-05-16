// "use client"

// import { readContract } from "@wagmi/core"
// import { GasOrderABI, prepaidGasCoreContractAddress } from "@/helpers"
// import {
//   ArrowPathIcon,
//   CheckCircleIcon,
//   PlayIcon,
//   ExclamationTriangleIcon,
//   XCircleIcon,
//   WalletIcon,
//   FireIcon,
// } from "@heroicons/react/24/outline"
// import { Card, Grid, Text, Metric, Badge, Title, Icon, Button } from "@tremor/react"
// import { useEffect, useState } from "react"
// import { useAccount } from "wagmi"
// import StatusBadge from "./StatusBadge"
// import { STATUS } from "@/constants"

// export default function UserStatsCard() {
//   const [totalGas, setTotalGas] = useState<null | number>(null)
//   const [ordersCount, setOrdersCount] = useState({
//     pending: null,
//     accepted: null,
//     active: null,
//     inactive: null,
//     untaken: null,
//     closed: null,
//   })
//   const { address, isConnecting, isDisconnected } = useAccount()
//   //totalMatchingOrdersCount
//   const getTotalGas = async () => {
//     try {
//       const data = await readContract({
//         address: prepaidGasCoreContractAddress(),
//         abi: GasOrderABI,
//         functionName: "getTotalBalance",
//         args: [address, []],
//       })
//       console.log("getTotalBalance", data)
//       console.log("getTotalBalance", Number(data))

//       return Number(data)
//     } catch (e) {
//       console.log("ERROR: ", e)
//     }
//   }

//   const getOdersCount = async (status: number) => {
//     try {
//       const data = await readContract({
//         address: prepaidGasCoreContractAddress(),
//         abi: GasOrderABI,
//         functionName: "getManagerOrdersCount",
//         args: ["0x0000000000000000000000000000000000000000", status],
//       })
//       console.log("totalMatchingOrdersCount", data)
//       console.log("totalMatchingOrdersCount", Number(data))
//       return Number(data)
//     } catch (e) {
//       console.log("ERROR: ", e)
//     }
//   }

//   const fetchData = async () => {
//     setTotalGas(await getTotalGas())

//     const pending = await getOdersCount(STATUS.Pending)
//     console.log("OrdersCount Pending: ", pending)
//     const accepted = await getOdersCount(STATUS.Accepted)
//     console.log("OrdersCount Accepted: ", accepted)
//     const active = await getOdersCount(STATUS.Active)
//     console.log("OrdersCount Active: ", active)
//     const inactive = await getOdersCount(STATUS.Inactive)
//     console.log("OrdersCount Inactive: ", inactive)
//     const untaken = await getOdersCount(STATUS.Untaken)
//     console.log("OrdersCount Untaken: ", untaken)
//     const closed = await getOdersCount(STATUS.Closed)
//     console.log("OrdersCount Closed: ", closed)

//     const all = await getOdersCount(0)
//     console.log("OrdersCount All: ", all)

//     setOrdersCount({ pending, accepted, active, inactive, untaken, closed })
//   }

//   useEffect(() => {
//     if (typeof address !== "undefined") {
//       fetchData()
//     }
//   }, [address])

//   return (
//     <Card className="mt-6 flex flex-col gap-3 lg:gap-4 lg:flex-row ">
//       <div className="flex flex-col w-full">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="flex flex-col justify-between">
//             <Text>Address</Text>
//             <div className="flex flex-row">
//               <Icon icon={WalletIcon}></Icon>
//               <Title className="truncate">{address}</Title>
//             </div>
//           </div>
//           <div className="flex flex-col justify-between">
//             <Text>Total GAS</Text>
//             <div className="flex flex-row">
//               <Icon icon={FireIcon}></Icon>
//               <Metric>{totalGas}</Metric>
//             </div>
//           </div>
//         </div>

//         <Grid numItems={2} numItemsSm={3} numItemsLg={5} className="mt-4 gap-2 flex flex-wrap">
//           <StatusBadge status={STATUS.Pending}>{ordersCount.pending}</StatusBadge>
//           <StatusBadge status={STATUS.Accepted}>{ordersCount.accepted}</StatusBadge>
//           <StatusBadge status={STATUS.Active}>{ordersCount.active}</StatusBadge>
//           <StatusBadge status={STATUS.Inactive}>{ordersCount.inactive}</StatusBadge>
//           <StatusBadge status={STATUS.Untaken}>{ordersCount.untaken}</StatusBadge>
//           <StatusBadge status={STATUS.Closed}>{ordersCount.closed}</StatusBadge>
//         </Grid>
//       </div>

//       <div className="flex flex-col gap-2 mt-4">
//         <Button>Execute Transaction</Button>
//         <Button>My Transactions</Button>
//       </div>
//     </Card>
//   )
// }
