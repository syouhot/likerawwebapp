"use client"
import React, { useEffect } from 'react'
import abiData from '../utils/abi.json';
import { useWriteContract, useAccount, useReadContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
const contractAddress = "0x4bc4c0f18a185d9a540b0ed05d578c45d2eff5b7"
const StateContext = React.createContext();
const abi = abiData.abi;
export function StateContextProvider({ children }) {
  const { writeContract, status } = useWriteContract();
  const { address } = useAccount();
  const createPropertyFunction = async () => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'listProperty',
        args: [
          address,
        ]
      })
      console.log("contract call success", data);
    } catch (e) {
      console.log("contract call error", e);
    }
  }
  const { data: properties } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getAllProperties',
  });
  // const getPropertiesData = (properties) => {
  //   const parsedProperties = properties.map((property) => ({
  //     owner: property.owner,
  //     price: formatUnits(property.price, 18).toString(),
  //     propertyTitle: property.propertyTitle,
  //     category: property.category,
  //     images: property.images,
  //     address: property.propertyAddress,
  //     description: property.description,
  //     reviewers: property.reviewers,
  //     reviews: property.reviews,
  //   }))
  //   return parsedProperties;
  // }
  useEffect(() => {
    console.log(properties, 666);
  }, [properties])
  return (
    <StateContext.Provider value={{ contractAddress, abi, createPropertyFunction, properties }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext)