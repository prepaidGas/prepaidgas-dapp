import { PageHeaders } from "@/components/page-headers"

import { Cards } from "@/components/cards/frame/cards-frame"
// import OrderCard, { OrderCardProps } from "@/components/cards/orderCard"
import { useEffect, useState } from "react"
import { FilteredOrderStructOutput, MessageStruct } from "typechain-types/PrepaidGas"
import { readContract } from "@wagmi/core"
import Pagination from "@/components/Pagination"
import { prepaidGasCoreContractAddress, PrepaidGasABI } from "@/helpers"
import { TailSpin } from "react-loader-spinner"
import { SPINNER_COLOR } from "@/constants"
import OrderCard from "@/components/OrderCard"
import SearchOrdersForm, { FilterOptions } from "@/components/forms/searchOrders/SearchOrdersForm"
import TransactionCard from "@/components/TransactionCard"

const PageRoutes = [
  {
    path: "/admin",
    breadcrumbName: "Home",
  },
  {
    path: "",
    breadcrumbName: "Transactions List",
  },
]

const initialState: FilterOptions = {
  manager: "",
  status: 0,
  numberOfEntries: 50,
}

export interface Transaction {
  id: number
  validSign: string
  origSign: string
  message: MessageStruct
}

const TransactionsListPage = () => {
  const [filterState, setFilterState] = useState({ ...initialState })
  const [data, setData] = useState<undefined | Transaction[]>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEntries, setTotalEntries] = useState<undefined | number>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showError, setShowError] = useState<boolean>(false)

  const defaultManager = "0x0000000000000000000000000000000000000000"

  const getTransactions = async () => {
    setIsLoading(true)
    try {
      const fetchUrl = `https://api.prepaidgas.io/load?offset=0&reverse=false`
      const response = await fetch(fetchUrl, { method: "GET" })
      const result = await response.json()
      console.log("fetchedData: ", result)
      if (result.length === 0) {
        console.log("Result is Empty")
        setShowError(true)
      } else {
        setShowError(false)
        setData(result)
        console.log("Result is NOT OK")
      }
      setIsLoading(false)
    } catch (error) {
      console.log("ERROR getTransactions: ", { error })
      setIsLoading(false)
      // modal.error({ ...commonModalConfigs.ErrorConfig, content: result.result })
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getTransactions()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (!data) {
        return setShowError(true)
      }

      if (data?.length === 0) {
        setShowError(true)
      } else {
        setShowError(false)
      }
    }
  }, [data])

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Transactions List"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          {/* <Cards headless className="max-w-[1024px] mx-auto mt-4">
            <div className="px-[25px] py-0">
              <div className="flex flex-row items-center gap-4 w-full grow">
                <SearchOrdersForm initialValues={initialState} handleSubmit={onFilterSubmit} />
              </div>
            </div>
          </Cards> */}

          {/* {data && (
            <Pagination
              className="flex flex-col"
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalCount={totalEntries ? totalEntries : 0}
              pageSize={filterState.numberOfEntries}
            />
          )} */}

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
            data?.map((item, index) => (
              <TransactionCard
                {...item}
                className={index === 0 ? "mt-4" : "mt-4"}
                // onFavorited={onOrderCardAction}
                key={`order-${item.id}`}
              />
            ))
          )}

          {/* {data && (
            <Pagination
              className="flex flex-col"
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalCount={totalEntries ? totalEntries : 0}
              pageSize={filterState.numberOfEntries}
            />
          )} */}

          {showError && (
            <Cards headless className="mt-4 max-w-[1024px] mx-auto">
              <div className="flex flex-row gap-4 justify-center items-center">
                {/* <Icon icon={ExclamationCircleIcon} size="xl"></Icon> */}
                <span>Sorry, we couldn&#39;t find any results</span>
              </div>
            </Cards>
          )}
        </div>
      </div>
    </>
  )
}

export default TransactionsListPage
