import CustomConnectBttn from "@/components/CustomConnectBttn"
import { HookAPI } from "antd/lib/modal/useModal"
import { TailSpin } from "react-loader-spinner"

const style =
  "text-body dark:text-white/60 hover:text-primary border-[#d9d9d9] dark:border-white/10 hover:border-primary p-[6rem]"

function showWalletConnectionModal(modal: HookAPI) {
  const instance = modal.confirm({
    title: "Wallet Connection",
    className: style,
    // icon: <UilWallet />,
    content: "Please connect your wallet to continue with order creation",
    footer: (_, { OkBtn, CancelBtn }) => (
      <>
        <CustomConnectBttn onClick={() => instance.destroy()} />
      </>
    ),
  })
}

function showSuccess(modal, modalContent: JSX.Element) {
  modal.success({
    style,
    title: "Success",
    closable: true,
    content: modalContent,
  })
}

function showError(modal, error: any) {
  modal.error({ style, title: "Error", closable: true, content: error.toString })
}

function showProcessing(modal) {
  return modal.info({
    style,
    title: "Processing",
    // icon: <UiProcess />,
    closable: false,
    content: (
      <div className="flex justify-center">
        <TailSpin
          height={40}
          width={40}
          color={"#009688"}
          ariaLabel="tail-spin-loading"
          radius="0"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    ),
  })
}

export default { showProcessing, showWalletConnectionModal, showError, showSuccess }
