import { useEffect, useState } from "react"
import { Order } from "../app/order/search/page"
import OrderCard from "./OrderCard"
import { Badge, Button, Text } from "@tremor/react"
import { useContractRead } from "wagmi"
import { usePagination, DOTS } from "../usePagination"
import { ArrowLeftIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { Icon } from "@tremor/react"
import { randomInt } from "crypto"

interface PaginationProps {
  onPageChange: any
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
}

export default function Pagination(props: PaginationProps) {
  const { onPageChange, totalCount, siblingCount = 2, currentPage, pageSize } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul className="flex gap-2 flex-row ">
      <li
        className={`${currentPage === 1 ? "hidden" : "flex justify-center align-middle cursor-pointer"}`}
        onClick={onPrevious}
      >
        <Icon icon={ArrowLongLeftIcon}></Icon>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>
        }

        return (
          <li className="flex justify-center align-middle" onClick={() => onPageChange(pageNumber)}>
            <Text
              className="flex justify-center align-middle"
              color={`${pageNumber === currentPage ? "blue" : "neutral"}`}
            >
              {pageNumber}
            </Text>
          </li>
        )
      })}
      <li
        className={`${currentPage === lastPage ? "hidden" : "flex justify-center align-middle cursor-pointer"}`}
        onClick={onNext}
      >
        <Icon icon={ArrowLongRightIcon}></Icon>
      </li>
    </ul>
  )
}
