"use client"
// @todo alphabetize order

import { readContract } from "@wagmi/core"
import RequestedTxSearchFiltersCard, {
  FilterOptionsRequestedTx,
} from "@/components/RequestedTxSearchFiltersCard"
import OrderCard from "@/components/OrderCard"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

import { Title, Text, Metric, Color, Icon, Card } from "@tremor/react"
import Pagination from "@/components/Pagination"

import { GasOrderABI, prepaidGasCoreContractAddress } from "@/helpers"
import { TailSpin } from "react-loader-spinner"
import { SPINNER_COLOR } from "@/constants"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import RequestedTxCard from "@/components/RequestedTxCard"


interface RequestedTx {
  nonce: number
  status: number
}

export default function RequestedTxPage() {
  const { address, isConnecting, isDisconnected } = useAccount()

  const initialState: FilterOptionsRequestedTx = {
    from: "",
    to: "",
    status: 2,
    numberOfEntries: 50,
  }
  const [filterState, setFilterState] = useState({ ...initialState })
  const [transactionEntries, setTransactionEntries] = useState<undefined | RequestedTx[]>(undefined)
  const [txEntriesFiltered, setTxEntriesFiltered] = useState<undefined | RequestedTx[]>(undefined)
  const [range, setRange] = useState<undefined | { rangeMin: number; rangeMax: number }>(undefined)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalEntries, setTotalEntries] = useState<undefined | number>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showError, setShowError] = useState<boolean>(false)

  const init = async () => {
    //FOR TESTING
    localStorage.setItem("REQUESTED_TX_NONCES", JSON.stringify(Array.from(Array(300).keys())))
    //FOR TESTING

    const txNonceArray: number[] = getTxNonces()

    const txEntriesCount: number = txNonceArray.length

    if (txEntriesCount === 0) {
      setIsLoading(false)
      return setShowError(true)
    }

    //FOR TESTING
    // const txEntries = txNonceArray.map(async (nonce) => {
    //   const status = await getTxStatus(nonce)
    //   return { nonce, status }
    // })
    //FOR TESTING

    let txEntries = new Array(txEntriesCount)
    for (let index = 0; index < txEntriesCount; index++) {
      const nonce = txNonceArray[index]
      txEntries[index] = { nonce, status: await getTxStatus(nonce) }
    }

    //FOR TESTING
    // let txEntries = new Array(100)
    // txEntries.forEach((element, index) => {
    //   element = { nonce: index, status: index % 2 ? 0 : 1 }
    // })
    // for (let index = 0; index < txEntries.length; index++) {
    //   txEntries[index] = { nonce: index, status: index % 2 == 0 ? 0 : 1 }
    // }
    //FOR TESTING

    setTransactionEntries(txEntries)
    getFilteredEntries(txEntries, initialState, 1)
  }

  const getFilteredEntries = (entries: RequestedTx[], filterOptions: FilterOptionsRequestedTx, page: number) => {
    let filteredTransactions: RequestedTx[] = JSON.parse(JSON.stringify(entries))

    console.log("getFilteredEntries FilterOptions: ", filterOptions)

    // if (filterOptions.nonce !== "" || filterOptions.status !== 2) {
    //   filteredTransactions = filteredTransactions.filter(function (item) {
    //     for (let key in filter) {
    //       if (item[key] === undefined || item[key] != filter[key]) return false
    //     }
    //     return true
    //   })
    // }

    // if (filterOptions.from !== "" && filterOptions.to !== "") {
    //   console.log("to and from")
    //   filteredTransactions = filteredTransactions.filter((item) => item.nonce >= filter.from && item.nonce <= filter.to)
    // } else if (filterOptions.from !== "") {
    //   console.log("from")
    //   filteredTransactions = filteredTransactions.filter((item) => item.nonce >= filter.from)
    // } else if (filterOptions.to !== "") {
    //   console.log("to")
    //   filteredTransactions = filteredTransactions.filter((item) => item.nonce <= filter.to)
    // }

    filteredTransactions = filteredTransactions.filter((item) => {
      const bool =
        item.nonce >= (filterOptions.from !== "" ? Number(filterOptions.from) : 0) &&
        item.nonce <= (filterOptions.to !== "" ? Number(filterOptions.to) : filteredTransactions.length)

      console.log("Item: ", item)
      console.log("Bool: ", bool)
      return bool
    })

    const rangeMin = (page - 1) * filterOptions.numberOfEntries
    const rangeMax = rangeMin + filterOptions.numberOfEntries

    if (filteredTransactions.length === 0) {
      setShowError(true)
    } else {
      setShowError(false)
    }

    setIsLoading(false)
    setRange({ rangeMin, rangeMax })
    setTotalEntries(filteredTransactions.length)
    setTxEntriesFiltered(filteredTransactions)
    setIsLoading(false)
  }

  const getTxNonces = () => {
    let requestedTxNonces: any = localStorage.getItem("REQUESTED_TX_NONCES")
    if (requestedTxNonces === null) {
      return []
    } else {
      return (requestedTxNonces = JSON.parse(requestedTxNonces))
    }
  }

  const getTxStatus = async (nonce: number) => {
    try {
      const status = await readContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "lock",
        args: [address, nonce],
      })
      console.log("getTxStatus DATA", status)
      return Number(status) > 0 ? 1 : 0
    } catch (e) {
      console.log("getTxStatus ERROR: ", e)
    }
  }

  const handleFilterSubmit = (filterOptions: FilterOptionsRequestedTx) => {
    console.log("handleFilterSubmit START")
    setFilterState(filterOptions)
    setCurrentPage(1)
    getFilteredEntries(transactionEntries, filterOptions, 1)
    console.log("handleFilterSubmit END")
  }

  const handlePageChange = (page: number) => {
    console.log("handlePageChange START")
    setCurrentPage(page)
    // executeSearch(filterState, page)
    getFilteredEntries(transactionEntries, filterState, page)
    console.log("handlePageChange END")
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Title>Search results: {transactionEntries?.length}</Title>
      <Text>You might find orders</Text>
      <RequestedTxSearchFiltersCard initialValue={initialState} onSubmit={handleFilterSubmit} />

      {txEntriesFiltered && (
        <Pagination
          className="flex flex-col"
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalCount={totalEntries && totalEntries}
          pageSize={filterState.numberOfEntries}
        />
      )}

      {isLoading ? (
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
      ) : (
        txEntriesFiltered?.map((item, index) => {
          if (index >= range.rangeMin && index <= range.rangeMax) {
            return <RequestedTxCard {...item} className="mt-4" key={`tx-${item.nonce}`} />
          } else {
            return null
          }
        })
      )}

      {txEntriesFiltered && (
        <Pagination
          className="flex flex-col"
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalCount={totalEntries && totalEntries}
          pageSize={filterState.numberOfEntries}
        />
      )}

      {showError && (
        <Card className="mt-4" decoration="top" decorationColor="red">
          <div className="flex flex-row gap-4 justify-center items-center">
            <Icon icon={ExclamationCircleIcon} size="xl"></Icon>
            <Title>Sorry, we couldn&#39;t find any results</Title>
          </div>
        </Card>
      )}
    </>
  )
}
