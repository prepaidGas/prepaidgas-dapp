import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Input } from "antd"

// Utility to set deeply nested values in an object
const setNestedState = (path, value, obj) => {
  const keys = path.split(".")
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] === undefined) {
      current[key] = {}
    }
    current = current[key]
  }
  current[keys[keys.length - 1]] = value
}

// Utility to get deeply nested values from an object
const getNestedValue = (obj, path) => {
  const keys = path.split(".")
  let result = obj
  for (const key of keys) {
    if (result[key] === undefined) return "" // Return empty if the path doesn't exist
    result = result[key]
  }
  return result
}

// Recursive component for handling input based on the ABI structure
const RecursiveInput = ({ structure, inputs, setInputs, basePath = "" }) => {
  const handleChange = (path, value) => {
    setInputs((inputs) => {
      const newInputs = { ...inputs }
      setNestedState(path, value, newInputs)
      return newInputs
    })
  }

  if (structure.type === "tuple") {
    return (
      <fieldset className="flex flex-col mb-4 mt-4">
        <div className="ml-4">
          <legend className="mb-2">{structure.name}</legend>
          {structure.components.map((component, index) => (
            <RecursiveInput
              key={index}
              structure={component}
              inputs={inputs}
              setInputs={setInputs}
              basePath={`${basePath}${structure.name ? `${structure.name}.` : ""}`}
            />
          ))}
        </div>
      </fieldset>
    )
  } else {
    const path = `${basePath}${structure.name}`
    return (
      <>
        {/* // <input
      //   type="text"
      //   placeholder={structure.name}
      //   value={getNestedValue(inputs, path) || ""}
      //   onChange={(e) => handleChange(path, e.target.value)}
      // /> */}
        <label>{structure.name}</label>
        <Input
          className="mb-2"
          size="middle"
          placeholder={structure.name}
          value={getNestedValue(inputs, path) || ""}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      </>
    )
  }
}

// Main form component that uses the RecursiveInput component
const ContractForm = ({ abi, contractAddress = undefined, selectedFunction = "", inputs, setInputs }) => {
  // const [inputs, setInputs] = useState({})
  // const provider = new ethers.providers.Web3Provider(window.ethereum)
  // const contract = new ethers.Contract(contractAddress, abi, provider.getSigner())

  const handleSubmit = async (event) => {
    event.preventDefault()
    const method = abi.find((item) => item.type === "function" && item.name === "testFunc")
    // if (method) {
    //   const args = method.inputs.map((input) => getNestedValue(inputs, input.name)) // Retrieve inputs for the function call
    //   try {
    //     const transactionResponse = await contract[method.name](...args)
    //     console.log("Transaction response:", transactionResponse)
    //   } catch (error) {
    //     console.error("Transaction failed:", error)
    //   }
    // }
  }

  useEffect(() => {
    console.log("Dynamic Inputs: ", { inputs })
  }, [inputs])

  return (
    <form onSubmit={handleSubmit}>
      {abi.map(
        (func, index) =>
          func.type === "function" &&
          func.name === selectedFunction && (
            <div key={index}>
              {/* <h3>{func.name}</h3> */}
              {func.inputs.map((input, idx) => (
                <RecursiveInput key={idx} structure={input} inputs={inputs} setInputs={setInputs} />
              ))}
              {/* <button type="submit">Invoke</button> */}
            </div>
          ),
      )}
    </form>
  )
}

export default ContractForm
