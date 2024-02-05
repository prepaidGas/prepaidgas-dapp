export const getRewardValue = (gasAmount: number, gasPrice: number) => {
  return (gasAmount / 10) * gasPrice
}

export const getGuaranteeValue = (gasAmount: number, gasPrice: number) => {
  return gasAmount * gasPrice
}
