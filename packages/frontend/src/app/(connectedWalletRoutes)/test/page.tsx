"use client"
// @ts-nocheck
import { BytesLike, ethers } from "ethers"
import { signTypedData, readContract } from "@wagmi/core"
import { TypedDataDomain } from "viem"

import { XMarkIcon } from "@heroicons/react/24/outline"
import { Card, Title, Subtitle, Text, Grid, Color, Button, TextInput } from "@tremor/react"
import { useEffect, useState } from "react"
import JsonFormatter from "react-json-formatter"
import { z } from "zod"
import { GasOrderABI } from "helpers/abi"

// interface SigningState {
//   dataStructure: any
//   dataTypes: any
//   parsedData: any
//   message: any
// }

interface VerifySignedState {
  message: any
}

const schemaSigning = z.object({
  dataStructure: z.any(),
  dataTypes: z.any(),
  parsedData: z.any(),
  message: z.string().min(1),
})

const zodMessageParser = z.string().min(1)

type SigningState = z.infer<typeof schemaSigning>

export default function TestPage() {
  const signingInitialValues = {
    dataStructure:
      '[{"name": "from"}, {"name": "nonce"}, {"name": "gasOrder"}, {"name": "onBehalf"}, {"name": "deadline"}, {"name": "to"}, {"name": "gas"}, {"name": "data"}]',
    dataTypes:
      '[{"type": "address"}, {"type": "uint256"}, {"type": "uint256"}, {"type": "address"}, {"type": "uint256"}, {"type": "address"}, {"type": "uint256"}, {"type": "bytes"}]',
    parsedData: undefined,
    message: "",
  }

  const signedInitialValues = {
    message: "",
  }

  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [inputValuesForSigning, setInputValuesForSigning] = useState<SigningState>(signingInitialValues)
  const [signedValues, setSignedValues] = useState<VerifySignedState>(signedInitialValues)
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)
  const [isValidating, setIsValidating] = useState(false)

  const [isDataParsed, setIsDataParsed] = useState(false)

  const combineDataAndTypesJson = () => {
    const parsedStructure = JSON.parse(inputValuesForSigning.dataStructure)
    const parsedTypes = JSON.parse(inputValuesForSigning.dataTypes)

    if (parsedStructure.length !== parsedTypes.length) return

    let combined = []

    for (let index = 0; index < parsedStructure.length; index++) {
      combined.push({ ...parsedStructure[index], ...parsedTypes[index] })
    }
    console.log("Combined ", combined)

    setInputValuesForSigning({ ...inputValuesForSigning, parsedData: combined })
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
      name: "Prepaid Gas",
      version: "0.0.1",
      chainId: 31337,
      verifyingContract: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    } as TypedDataDomain

    // The named list of all type definitions
    // const types = {
    //   Person: [
    //     { name: "name", type: "string" },
    //     { name: "wallet", type: "address" },
    //   ],
    //   Mail: [
    //     { name: "from", type: "Person" },
    //     { name: "to", type: "Person" },
    //     { name: "contents", type: "string" },
    //   ],
    // }

    const types = {
      Message: [
        { name: "from", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "gasOrder", type: "uint256" },
        { name: "onBehalf", type: "address" },
        { name: "deadline", type: "uint256" },
        { name: "to", type: "address" },
        { name: "gas", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    }

    const message = {
      from: "0x376a2a023a105bc2e19ce19ad275b9bbbcb23e1a",
      nonce: 0,
      gasOrder: 0,
      onBehalf: "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
      deadline: 0,
      to: "0xfb071837728455c581f370704b225ac9eabdfa4a",
      gas: 0,
      data: "0x",
    }

    // @ts-ignore
    const signature = await signTypedData({
      domain,
      message,
      primaryType: "Message",
      types,
    })
    console.log("Signature: ", signature)

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
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "messageHash",
        args: [messageTuple],
      })
      console.log("Data: ", data)
      const result = ethers.recoverAddress(data as BytesLike, signature)
      console.log("RecoverAddres: ", result)
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  const handleSubmitSigning = () => {
    setIsValidating(true)

    if (validateSigningForm()) {
      console.log("signing message")
      signMessage()
    } else {
      console.log("Form has errors. Please fix them before submitting.")
    }
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
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <Text>Arbitrary message</Text>
            <TextInput
              className="mt-2"
              value={inputValuesForSigning.message}
              onChange={(e) => setInputValuesForSigning({ ...inputValuesForSigning, message: e.target.value })}
              placeholder={"Enter a message that you want to sign"}
              error={!!validationErrors?.message}
              errorMessage={validationErrors?.message}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        {isDataParsed ? (
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            <div className="flex flex-col grow">
              <Text>Parsed data</Text>
              <div className="max-h-[30rem] overflow-auto mt-2 tremor-TextInput-root flex flex-col relative w-full  min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                <JsonFormatter
                  json={JSON.stringify(inputValuesForSigning.parsedData)}
                  tabWith={4}
                  jsonStyle={{
                    propertyStyle: { color: "rgb(59 130 246)" },
                    stringStyle: { color: "rgb(16 185 129)" },
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <div className="flex flex-col grow">
                <Text>Data Structure</Text>
                <div className="tremor-TextInput-root flex flex-col mt-2 relative w-full items-center min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                  <textarea
                    value={inputValuesForSigning.dataStructure}
                    onChange={(e) => {
                      e.target.style.height = ""
                      e.target.style.height = e.target.scrollHeight + "px"
                      setInputValuesForSigning({ ...inputValuesForSigning, dataStructure: e.target.value })
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
                <Text>Data Types</Text>
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
                    placeholder="Copy and paste your data types structure here"
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
                setInputValuesForSigning(signingInitialValues)
              }}
              variant="secondary"
            >
              Clear
            </Button>
            <Button
              className="grow md:grow-0"
              onClick={handleSubmitSigning}
              disabled={!!!inputValuesForSigning.message}
            >
              Sign
            </Button>
          </div>
        ) : (
          <div className="flex flex-row md:justify-end mt-4">
            <Button className="grow md:grow-0" onClick={combineDataAndTypesJson} variant="secondary">
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
              value={signedValues.message}
              onChange={(e) => setSignedValues({ ...signedValues, message: e.target.value })}
              placeholder={"Enter a message to verify its signature"}
              //   error={!!validationErrors?.executionPeriodStartTime}
              //   errorMessage={validationErrors?.executionPeriodStartTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>

        <div className="flex flex-row md:justify-end mt-4">
          <Button className="grow md:grow-0">Verify</Button>
        </div>
      </Card>
    </>
  )
}
