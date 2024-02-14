import { readContract, writeContract, waitForTransaction } from "@wagmi/core"
import { ABIEntry, GasOrderABI, MockTokenABI } from "@/helpers"

export const readCustomContract = async (address: `0x${string}`, abi: ABIEntry[], functionName: string, args: []) => {
  console.log("ReadCustomContract args: ", { address, abi, functionName, args })

  try {
    const data = await readContract({
      address: address,
      abi: abi,
      functionName: functionName,
      args: args,
    })
    console.log("ReadCustomContract result: ", { data })
    return { ok: true, data, error: undefined }
  } catch (e) {
    console.log("ReadCustomContract ERROR: ", { e })
    return { ok: false, data: undefined, error: e }
  }
}

export const writeCustomContract = async (address: `0x${string}`, abi: ABIEntry[], functionName: string, args: []) => {
  console.log("ReadCustomContract args: ", { address, abi, functionName, args })

  try {
    const data = await readContract({
      address: address,
      abi: abi,
      functionName: functionName,
      args: args,
    })
    console.log("ReadCustomContract result: ", { data })
    return { ok: true, data, error: undefined }
  } catch (e) {
    console.log("ReadCustomContract ERROR: ", { e })
    return { ok: false, data: undefined, error: e }
  }
}
