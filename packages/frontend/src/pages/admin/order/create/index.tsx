import { PageHeaders } from "@/components/page-headers"

import { Cards } from "@/components/cards/frame/cards-frame"
import { useEffect, useState } from "react"

import CreateOrderForm from "@/components/forms/order/create/CreateOrderForm"
import { Button, Modal, Steps } from "antd"
import { useAccount } from "wagmi"
import CustomConnectBttn from "@/components/CustomConnectBttn"
import { writeContract, waitForTransaction } from "@wagmi/core"
import { TOKEN_ADDRESS } from "@/constants/tokens"
import { TryTokenABI } from "@/helpers"

const CreateOrder = () => {
  const PageRoutes = [
    {
      path: "/admin/order/create",
      breadcrumbName: "Home",
    },
    {
      path: "",
      breadcrumbName: "Create Order",
    },
  ]

  const { address } = useAccount()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [modal, contextHolder] = Modal.useModal()

  const handleGetTestTokens = async () => {
    setIsLoading(true)
    try {
      const data = await writeContract({
        address: TOKEN_ADDRESS.MockGasPrice,
        abi: TryTokenABI,
        functionName: "mint",
        args: [],
      })
      console.log("GetTestTokens Data: ", { data })
    } catch (e) {
      console.log("GetTestTokens ERROR: ", e)
      Modal.destroyAll()
      setIsLoading(false)
      return showError(e.details ? e.details : e)
    }

    try {
      const data = await writeContract({
        address: TOKEN_ADDRESS.MockGuarantee,
        abi: TryTokenABI,
        functionName: "mint",
        args: [],
      })
      console.log("GetTestTokens Data: ", { data })
      setIsLoading(false)
    } catch (e) {
      console.log("GetTestTokens ERROR: ", e)
      Modal.destroyAll()
      setIsLoading(false)
      return showError(e.details ? e.details : e)
    }

    setCurrentStep(2)
  }

  const showError = (error: any) => {
    modal.error({ title: "Error", closable: true, content: error })
  }

  const stepsContent = [
    <CustomConnectBttn onClick={() => null} />,
    <Button loading={isLoading} type="primary" onClick={handleGetTestTokens}>
      Get test tokens
    </Button>,
    null,
  ]

  useEffect(() => {
    if (address) {
      setCurrentStep(1)
    }
  }, [address])

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Create Order"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          <Cards headless className="max-w-[1024px] mx-auto">
            <div className="p-[25px]">
              <Steps
                current={currentStep}
                onChange={(value: number) => setCurrentStep(value)}
                items={[
                  {
                    title: "Step 1",
                    description: "Connect your wallet and choose sepolia network",
                  },
                  {
                    title: "Step 2",
                    description: "Get some test tokens",
                  },
                  {
                    title: "Step 3",
                    description: "Create an order",
                  },
                ]}
              />
              <div className="flex flex-row justify-center items-center mt-2 h-4">{stepsContent[currentStep]}</div>
            </div>
          </Cards>
          <Cards headless className="max-w-[1024px] mx-auto mt-6">
            <div className="p-[25px]">
              <CreateOrderForm />
            </div>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default CreateOrder
