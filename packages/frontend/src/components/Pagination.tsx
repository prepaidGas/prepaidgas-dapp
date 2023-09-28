import { useEffect, useState } from "react"
import { Order } from "../app/order/search/page"
import OrderCard from "./OrderCard"
import { Button } from "@tremor/react"
import { useContractRead } from "wagmi"

export default function Pagination({ testABI }: { testABI: any }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(10)

  const { data, isError, isLoading } = useContractRead({
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: testABI,
    functionName: "totalMatchingOrdersCount",
    args: ["0x0000000000000000000000000000000000000000", 0],
  })

  const OnPageChange = () => {}

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      {currentPage > 3 ? (
        <div>
          <Button variant="secondary">1</Button>
          ...
        </div>
      ) : null}
      <Button variant="secondary">1</Button>
      <Button variant="secondary">2</Button>
      <Button variant="secondary">3</Button>
      <Button variant="secondary">3</Button>
      {currentPage < totalPages - 3 ? (
        <div>
          <Button variant="secondary">{totalPages}</Button>
          ...
        </div>
      ) : null}
    </div>
  )
}
