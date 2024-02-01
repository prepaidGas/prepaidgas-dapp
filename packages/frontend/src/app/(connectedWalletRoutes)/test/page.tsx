"use client"
// @ts-nocheck
import { BytesLike, SignatureLike, ethers } from "ethers"
import { signTypedData, readContract } from "@wagmi/core"
import { TypedDataDomain } from "viem"
import { PROJECT_NAME, PROJECT_VERSION, CHAIN_ID } from "constants/executor"

import { XMarkIcon } from "@heroicons/react/24/outline"
import { Card, Title, Subtitle, Text, Grid, Color, Button, TextInput, Metric } from "@tremor/react"
import { useEffect, useState } from "react"
import JsonFormatter from "react-json-formatter"
import { z } from "zod"
import { GasOrderABI } from "helpers/abi"
import { useAccount } from "wagmi"
import { TailSpin } from "react-loader-spinner"
import { SPINNER_COLOR } from "../../../constants/themeConstants"

const schemaSigning = z.object({
  dataTypes: z.any(),
  message: z.string().min(1),
  parsedTypes: z.any(),
  parsedMessage: z.any(),
  signedMessage: z.any(),
  messageHash: z.any(),
})

const schemaVerifySigned = z.object({
  signedString: z.any(),
  hash: z.any(),
  recoveredAddress: z.any(),
})

type SigningForm = z.infer<typeof schemaSigning>

type VerifyingForm = z.infer<typeof schemaVerifySigned>

export default function TestPage() {
  const signingInitialValues: SigningForm = {
    message:
      '{"nonce":0,"gasOrder":0,"onBehalf":"0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5","deadline":0,"to":"0xfb071837728455c581f370704b225ac9eabdfa4a","gas":0,"data":"0x"}',
    dataTypes:
      '[{"name":"from","type":"address"},{"name":"nonce","type":"uint256"},{"name":"gasOrder","type":"uint256"},{"name":"onBehalf","type":"address"},{"name":"deadline","type":"uint256"},{"name":"to","type":"address"},{"name":"gas","type":"uint256"},{"name":"data","type":"bytes"}]',
    parsedTypes: undefined,
    parsedMessage: undefined,
    signedMessage: undefined,
    messageHash: undefined,
  }

  const signedInitialValues = {
    signedString: "",
    hash: "",
  }

  const { address, isConnecting, isDisconnected } = useAccount()

  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [inputValuesForSigning, setInputValuesForSigning] = useState<SigningForm>(signingInitialValues)
  const [signedValues, setSignedValues] = useState<VerifyingForm>(signedInitialValues)
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [isSignatureLoading, setIsSignatureLoading] = useState(false)
  const [isSignatureLoaded, setIsSignatureLoaded] = useState(false)
  const [isRecoveredAddressLoaded, setIsRecoveredAddressLoaded] = useState(false)

  const [isDataParsed, setIsDataParsed] = useState(false)

  const parseSigningInputs = () => {
    const parsedMessage = JSON.parse(inputValuesForSigning.message)
    const parsedTypes = JSON.parse(inputValuesForSigning.dataTypes)

    setInputValuesForSigning({ ...inputValuesForSigning, parsedTypes, parsedMessage })
    setIsDataParsed(true)
  }

  const validateSigningForm = () => {
    setValidationErrors(null)

    const result = schemaSigning.safeParse(inputValuesForSigning)
    if (result.success === false) {
      const formatedErrors = Object.entries(result.error.flatten().fieldErrors).reduce((acc, curr) => {
        const [error, errorTexts] = curr
        acc[error] = errorTexts[0]
        return acc
      }, {})
      setValidationErrors(formatedErrors)
      return false
    }
    return true
  }

  const signMessage = async () => {
    const domain = {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      chainId: CHAIN_ID,
      verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    }

    // const types = {
    //   Message: [
    //     { name: "from", type: "address" },
    //     { name: "nonce", type: "uint256" },
    //     { name: "gasOrder", type: "uint256" },
    //     { name: "onBehalf", type: "address" },
    //     { name: "deadline", type: "uint256" },
    //     { name: "to", type: "address" },
    //     { name: "gas", type: "uint256" },
    //     { name: "data", type: "bytes" },
    //   ],
    // }

    /*
    const message = {
      //@todo get address automatically
      from: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
      nonce: 0,
      gasOrder: 0,
      onBehalf: "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
      deadline: 0,
      to: "0xfb071837728455c581f370704b225ac9eabdfa4a",
      gas: 0,
      data: "0x",
    }
    */

    const types = {
      Message: inputValuesForSigning.parsedTypes,
    }

    const message = {
      from: address,
      nonce: inputValuesForSigning.parsedMessage.nonce,
      gasOrder: inputValuesForSigning.parsedMessage.gasOrder,
      onBehalf: inputValuesForSigning.parsedMessage.onBehalf,
      deadline: inputValuesForSigning.parsedMessage.deadline,
      to: inputValuesForSigning.parsedMessage.to,
      gas: inputValuesForSigning.parsedMessage.gas,
      //todo encode data
      data: "0x",
    }

    const messageTuple = [
      message.from,
      message.nonce,
      message.gasOrder,
      message.onBehalf,
      message.deadline,
      message.to,
      message.gas,
      message.data,
    ]

    try {
      //todo check typescript
      // @ts-ignore
      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Message",
        types,
      })
      console.log("signature: ", signature)

      const data = await readContract({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: GasOrderABI,
        functionName: "messageHash",
        args: [messageTuple],
      })
      console.log("Data: ", data)

      setInputValuesForSigning({ ...inputValuesForSigning, messageHash: data, signedMessage: signature })

      setIsSignatureLoaded(true)
    } catch (e) {
      console.log("ERROR: ", e)
    }

    // try {
    //   const data = await readContract({
    //     address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    //     abi: GasOrderABI,
    //     functionName: "messageHash",
    //     args: [messageTuple],
    //   })
    //   console.log("Data: ", data)
    //   const result = ethers.recoverAddress(data as BytesLike, signature as SignatureLike)
    //   console.log("RecoverAddres: ", result)
    // } catch (e) {
    //   console.log("ERROR: ", e)
    // }

    setIsSignatureLoading(false)
  }

  const handleSubmitSigning = () => {
    setIsValidating(true)

    if (validateSigningForm()) {
      console.log("signing message")
      setIsSignatureLoading(true)
      signMessage()
    } else {
      console.log("Form has errors. Please fix them before submitting.")
    }
  }

  const handleVerifySignature = () => {
    const result = ethers.recoverAddress(signedValues.hash as BytesLike, signedValues.signedString as SignatureLike)
    setSignedValues({ ...signedValues, recoveredAddress: result })
    setIsRecoveredAddressLoaded(true)
  }

  useEffect(() => {
    console.log("INPUT_VALUES: ", inputValuesForSigning)

    if (isValidating) {
      if (validationTimer !== undefined) {
        clearTimeout(validationTimer)
      }
      const timer = setTimeout(validateSigningForm, 500)
      setValidationTimer(timer)
    }
  }, [inputValuesForSigning])

  return (
    <>
      <Title>Signature testing</Title>

      <Subtitle className="mt-6">Sign a message</Subtitle>
      <Card className="mt-2">
        {isDataParsed ? (
          <>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <div className="flex flex-col grow">
                <Text>Parsed ABI</Text>
                <div className="max-h-[30rem] overflow-auto mt-2 tremor-TextInput-root flex flex-col relative w-full  min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                  <JsonFormatter
                    json={JSON.stringify(inputValuesForSigning.parsedTypes)}
                    tabWith={4}
                    jsonStyle={{
                      propertyStyle: { color: "rgb(59 130 246)" },
                      stringStyle: { color: "rgb(16 185 129)" },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <div className="flex flex-col grow">
                <Text>Parsed message</Text>
                <div className="max-h-[30rem] overflow-auto mt-2 tremor-TextInput-root flex flex-col relative w-full  min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                  <JsonFormatter
                    json={JSON.stringify(inputValuesForSigning.parsedMessage)}
                    tabWith={4}
                    jsonStyle={{
                      propertyStyle: { color: "rgb(59 130 246)" },
                      stringStyle: { color: "rgb(16 185 129)" },
                    }}
                  />
                </div>
              </div>
            </div>
            {isSignatureLoading && (
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
            )}
            {isSignatureLoaded && (
              <>
                <div className="flex flex-col lg:flex-row gap-6 mt-4">
                  <div className="flex flex-col grow">
                    <Text>Signed string</Text>
                    <Metric className="break-all mt-2">{inputValuesForSigning.signedMessage}</Metric>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 mt-4">
                  <div className="flex flex-col grow">
                    <Text>Hash</Text>
                    <Metric className="break-all mt-2">{inputValuesForSigning.messageHash}</Metric>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <div className="flex flex-col grow">
                <Text>Data Structure</Text>
                <div className="tremor-TextInput-root flex flex-col mt-2 relative w-full items-center min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                  <textarea
                    value={inputValuesForSigning.dataTypes}
                    onChange={(e) => {
                      e.target.style.height = ""
                      e.target.style.height = e.target.scrollHeight + "px"
                      setInputValuesForSigning({ ...inputValuesForSigning, dataTypes: e.target.value })
                    }}
                    // error={!!validationErrors?.userAbi}
                    // errorMessage={validationErrors?.userAbi}
                    placeholder="Copy and paste your data structure here"
                    spellCheck={false}
                    className="tremor-TextInput-input w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-3 pr-4 py-2 placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <div className="flex flex-col grow">
                <Text>Message</Text>
                <div className="tremor-TextInput-root flex flex-col mt-2 relative w-full items-center min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                  <textarea
                    value={inputValuesForSigning.message}
                    onChange={(e) => {
                      e.target.style.height = ""
                      e.target.style.height = e.target.scrollHeight + "px"
                      setInputValuesForSigning({ ...inputValuesForSigning, message: e.target.value })
                    }}
                    // error={!!validationErrors?.userAbi}
                    // errorMessage={validationErrors?.userAbi}
                    placeholder="Enter your message here"
                    spellCheck={false}
                    className="tremor-TextInput-input w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-3 pr-4 py-2 placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </>
        )}

        {isDataParsed ? (
          <div className="flex flex-col-reverse md:justify-end md:flex-row mt-4 gap-4">
            <Button
              className="grow md:grow-0"
              color="red"
              icon={XMarkIcon}
              onClick={() => {
                setIsDataParsed(false)
                setIsSignatureLoaded(false)
                setInputValuesForSigning(signingInitialValues)
              }}
              variant="secondary"
            >
              Clear
            </Button>
            <Button className="grow md:grow-0" onClick={handleSubmitSigning}>
              Sign
            </Button>
          </div>
        ) : (
          <div className="flex flex-row md:justify-end mt-4">
            <Button className="grow md:grow-0" onClick={parseSigningInputs} variant="secondary">
              Parse
            </Button>
          </div>
        )}
      </Card>

      {/* Verify signature Section */}
      <Subtitle className="mt-6">Verify a signied message</Subtitle>
      <Card className="mt-2">
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <Text>Signed Message</Text>
            <TextInput
              className="mt-2"
              value={signedValues.signedString}
              onChange={(e) => setSignedValues({ ...signedValues, signedString: e.target.value })}
              placeholder={"Enter a signed message string to verify its signature"}
              //   error={!!validationErrors?.executionPeriodStartTime}
              //   errorMessage={validationErrors?.executionPeriodStartTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <Text>Hash</Text>
            <TextInput
              className="mt-2"
              value={signedValues.hash}
              onChange={(e) => setSignedValues({ ...signedValues, hash: e.target.value })}
              placeholder={"Enter a message hash"}
              //   error={!!validationErrors?.executionPeriodStartTime}
              //   errorMessage={validationErrors?.executionPeriodStartTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        {isRecoveredAddressLoaded && (
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            <div className="flex flex-col grow">
              <Text>Original Address</Text>
              <Metric>{signedValues.recoveredAddress}</Metric>
            </div>
          </div>
        )}

        <div className="flex flex-row md:justify-end mt-4">
          <Button onClick={handleVerifySignature} className="grow md:grow-0">
            Verify
          </Button>
        </div>
      </Card>
    </>
  )
}
