import { PageHeaders } from "@/components/page-headers"
import { Form, Input, List, Select, Tabs, TabsProps } from "antd"
import { UilQuestionCircle, UilClipboardNotes } from "@iconscout/react-unicons"
const { Option } = Select

import { Cards } from "@/components/cards/frame/cards-frame"
import { Buttons } from "@/components/buttons"
// import OrderCard, { OrderCardProps } from "@/components/cards/orderCard"
import { useEffect, useState } from "react"
import { FilteredOrderStructOutput } from "typechain-types/PrepaidGas"
import { readContract } from "@wagmi/core"
import Pagination from "@/components/Pagination"
import { useAccount } from "wagmi"
import { prepaidGasCoreContractAddress, PrepaidGasABI } from "@/helpers"
import { TailSpin } from "react-loader-spinner"
import { SPINNER_COLOR } from "@/constants"
import OrderCard from "@/components/OrderCard"
import SearchOrdersForm, { FilterOptions } from "@/components/forms/searchOrders/SearchOrdersForm"

const OrderSearch = () => {
  const PageRoutes = [
    {
      path: "/admin/order/create",
      breadcrumbName: "Home",
    },
    {
      path: "",
      breadcrumbName: "Order Search",
    },
  ]

  const initialState: FilterOptions = {
    manager: "",
    status: 0,
    numberOfEntries: 50,
  }
  const [filterState, setFilterState] = useState({ ...initialState })
  const [data, setOrdersData] = useState<undefined | FilteredOrderStructOutput[]>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEntries, setTotalEntries] = useState<undefined | number>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showError, setShowError] = useState<boolean>(false)

  const defaultManager = "0x0000000000000000000000000000000000000000"

  const executeSearch = async (filterOptions: FilterOptions, pageNumber: number) => {
    setIsLoading(true)
    setShowError(false)
    console.log("executeSearch", { pageNumber })
    await getTotalEntriesNumber(filterOptions)

    console.log("starting search")
    const { manager, status, numberOfEntries } = filterOptions
    const searchArgs = [
      manager === "" ? defaultManager : manager,
      //todo: check
      //address,
      status,
      numberOfEntries,
      (pageNumber - 1) * numberOfEntries,
    ]
    console.log("SearchArgs: ", searchArgs)
    const test = prepaidGasCoreContractAddress() as `0x${string}`
    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress() as `0x${string}`,
        abi: PrepaidGasABI,
        functionName: "getManagerOrders",
        args: searchArgs,
      })
      console.log("DATA", data)
      setOrdersData(data as FilteredOrderStructOutput[])
    } catch (e) {
      console.log("ERROR: ", e)
      setShowError(true)
    }
    setIsLoading(false)
  }

  const getTotalEntriesNumber = async (filterOptions) => {
    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress() as `0x${string}`,
        abi: PrepaidGasABI,
        functionName: "getManagerOrdersCount",
        args: [filterOptions.manager || defaultManager, filterOptions.status],
      })
      console.log("getTotalEntriesNumber", { filterOptions })
      console.log("getMaxEntriesNumber", data)
      console.log("getMaxEntriesNumber2", Number(data))

      setTotalEntries(Number(data))
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  useEffect(() => {
    executeSearch(filterState, currentPage)
  }, [])

  // const [showPopup, setShowPopup] = useState(false)
  // const [popupTimer, setPopupTimer] = useState<NodeJS.Timeout | undefined>()
  // const [popupProps, setPopupProps] = useState<{ msgTitle: string; msgBody: string; color: Color }>({
  //   msgTitle: "",
  //   msgBody: "",
  //   color: "blue",
  // })

  // const onOrderCardAction = (favorited: boolean) => {
  //   if (favorited) {
  //     setPopupProps({
  //       msgTitle: "Order was added to favorites",
  //       msgBody: "",
  //       color: "green",
  //     })
  //   } else {
  //     setPopupProps({
  //       msgTitle: "Order was removed from favorites",
  //       msgBody: "",
  //       color: "amber",
  //     })
  //   }
  //   setShowPopup(true)
  //   if (popupTimer !== undefined) {
  //     clearTimeout(popupTimer)
  //   }
  //   const timer = setTimeout(() => setShowPopup(false), 5000)
  //   setPopupTimer(timer)
  // }

  const onFilterSubmit = (filterOptions: FilterOptions) => {
    console.log("handleFilterSubmit START")
    setFilterState(filterOptions)
    setCurrentPage(1)
    executeSearch(filterOptions, 1)
    console.log("handleFilterSubmit END")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    executeSearch(filterState, page)
    console.log("handlePageChange")
  }

  useEffect(() => {
    if (!data) {
      return setShowError(true)
    }

    if (data?.length === 0) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [data])

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Order Search"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          {/* <Cards headless className="max-w-[1024px] mx-auto">
            <div className="px-[25px] py-0">
              <div className="flex flex-row items-center gap-4 w-full grow">
                <SearchFiltersCard initialValue={initialState} onSubmit={onFilterSubmit} />
              </div>
            </div>
          </Cards> */}

          <Cards headless className="max-w-[1024px] mx-auto mt-4">
            <div className="px-[25px] py-0">
              <div className="flex flex-row items-center gap-4 w-full grow">
                <SearchOrdersForm initialValues={initialState} handleSubmit={onFilterSubmit} />
              </div>
            </div>
          </Cards>

          {data && (
            <Pagination
              className="flex flex-col"
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalCount={totalEntries ? totalEntries : 0}
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
            data?.map((item: any, index) => (
              <OrderCard
                {...item}
                className={index === 0 ? "mt-4" : "mt-4"}
                // onFavorited={onOrderCardAction}
                key={`order-${item.id}`}
              />
            ))
          )}

          {data && (
            <Pagination
              className="flex flex-col"
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalCount={totalEntries ? totalEntries : 0}
              pageSize={filterState.numberOfEntries}
            />
          )}

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

export default OrderSearch
