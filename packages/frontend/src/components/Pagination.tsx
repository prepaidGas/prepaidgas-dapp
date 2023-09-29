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
      <li className={`${currentPage === 1 ? "hidden" : ""}`} onClick={onPrevious}>
        <Icon icon={ArrowLongLeftIcon}></Icon>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`dots-${index}`} className="text-gray-400 flex align-middle justify-center items-center">
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={`flex align-middle justify-center items-center ${
              pageNumber === currentPage ? "text-blue-500" : "text-white"
            }`}
            key={`pageBtt-${index}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li className={`${currentPage === lastPage ? "hidden" : ""}`} onClick={onNext}>
        <Icon icon={ArrowLongRightIcon}></Icon>
      </li>
    </ul>
  )
}
