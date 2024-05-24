import CustomConnectBttn from "@/components/CustomConnectBttn"
import { HookAPI } from "antd/lib/modal/useModal"
import { TailSpin } from "react-loader-spinner"
import { ModalFuncProps } from "antd"

const WalletConnectionConfig: ModalFuncProps = {
  title: "Wallet Connection",
  // icon: <UilWallet />,
  content: "Please connect your wallet to continue",
  closable: true,
  footer: (_, { OkBtn, CancelBtn }) => <>{/* <CustomConnectBttn onClick={() => instance.destroy()} /> */}</>,
}

const SuccessConfig: ModalFuncProps = {
  title: "Success",
  closable: true,
}

const ErrorConfig: ModalFuncProps = { title: "Error", closable: true }

const ProcessingConfig: ModalFuncProps = {
  title: "Processing",
  // icon: <UiProcess />,
  closable: false,
  footer: null,
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
}

export default { WalletConnectionConfig, ProcessingConfig, ErrorConfig, SuccessConfig }
