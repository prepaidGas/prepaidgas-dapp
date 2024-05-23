// import CustomConnectBttn from "@/components/CustomConnectBttn"
// import commonModalConfigs from "@/constants/commonModalConfigs"
// import { HookAPI } from "antd/es/modal/useModal"

// const { WalletConnectionConfig, ProcessingConfig, SuccessConfig, ErrorConfig } = commonModalConfigs

// const getWalletConnectModal = (modal: HookAPI) => {
//   const instance = modal.confirm({
//     ...WalletConnectionConfig,
//     footer: (_, { OkBtn, CancelBtn }) => (
//       <>
//         <CustomConnectBttn onClick={() => instance.destroy()} />
//       </>
//     ),
//   })

//   return instance
// }

// const showModal = (modal: () => {}, config) => {
//   return {
//     walletConnectModal: getWalletConnectModal(modal),
//     successModal: modal.success(SuccessConfig),
//     errorModal: modal.error(ErrorConfig),
//     processingModal: modal.info(ProcessingConfig),
//   }
// }

// export default getCommonModals
