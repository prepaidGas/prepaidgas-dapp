import { useEffect, useState } from "react"
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
  className?: string
}

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
  className,
}: PaginationProps) {
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
    <div className={className}>
      <ul className="flex flex-row self-center items-center my-4">
        <li className={`${currentPage === 1 ? "invisible" : "cursor-pointer"}`} onClick={onPrevious}>
          <Icon icon={ArrowLongLeftIcon}></Icon>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={`dots-${index}`}
                className="text-gray-400 flex align-middle justify-center items-center cursor-default"
              >
                &#8230;
              </li>
            )
          }

          return (
            <li
              className={`flex align-middle justify-center items-center cursor-pointer p-2 text-base box-border border-transparent border hover:border-blue-500 rounded 
              ${pageNumber === currentPage ? "text-blue-500" : "text-white"}`}
              key={`pageBtt-${index}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        <li className={`${currentPage === lastPage ? "invisible" : "cursor-pointer"}`} onClick={onNext}>
          <Icon icon={ArrowLongRightIcon}></Icon>
        </li>
      </ul>
    </div>
  )
}

Pagination.defaultProps = {
  siblingCount: 2,
  className: "",
}
