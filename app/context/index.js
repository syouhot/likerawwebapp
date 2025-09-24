"use client"
import React, { useEffect } from 'react'
import abiData from '../utils/abi.json';
import { useWriteContract, useAccount, useReadContract, useDisconnect, useConnect, useBalance } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { useWaitForTransactionReceipt } from 'wagmi';
import {
  useAllPropertiesFunction,
  useHightestratedProduct,
  useProductReviews,
  useProperty,
  useUserProperties,
  useUserReviews,
  useProperties,
  usePropertyIndex,
  useReviewsCounter
} from "@/app/context/readHook"
import { usePropertyListedEvent } from "@/app/context/eventHook"

const contractAddress = "0x4bc4c0f18a185d9a540b0ed05d578c45d2eff5b7"
const StateContext = React.createContext();
const abi = abiData.abi;

export function StateContextProvider({ children }) {
  const [connector, setConnector] = React.useState(null);
  const { writeContract, status, hash } = useWriteContract();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const {data:userBalance} = useBalance({
    address,
  })
  const { connectors, connect } = useConnect();
  //更新
  const updatePropertyFunction = async (form) => {
    const { address, productId, propertyTitle, category, images, propertyAddress, description } = form
    try {
      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'updateProperty',
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ]
      })
    } catch (error) {
      console.log("updatePropertyFunctionError", error);
    }
  }
  //更新价格
  const updatePriceFunction = async (form) => {
    const { address, productId, price } = form
    try {
      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'updatePrice',
        args: [
          address,
          productId,
          price
        ]
      })
    } catch (error) {
      console.log("updatePriceFunctionError", error);

    }
  }
  //创建
  const createPropertyFunction = async (form) => {
    const { address, price, propertyTitle, category, images, propertyAddress, description } = form
    try {
      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'listProperty',
        args: [
          address,
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ]
      })
    } catch (e) {
      console.log("createPropertyFunction call error", e)
    }
  }
  //购买
  const buyPropertyFunction = async (form) => {
    const { id } = form
    try {
      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'buyProperty',
        args: [
          id,
          address,
        ]
      })
    } catch (e) {
      console.log("buyPropertyFunction call error", e)
    }
  }
  //添加评论
  const addReviewFunction = async (form) => {
    const { productId, rating, comment } = form
    try {
      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'addReview',
        args: [
          productId,
          rating,
          comment,
          address
        ]
      })
    } catch (e) {
      console.log("addReviewFunction call error", e)
    }
  }
  //点赞评论
  const likeReviewFunction = async (form) => {
    const { productId, reviewIndex } = form
    try {
      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'likeReview',
        args: [
          productId,
          reviewIndex,
          address
        ]
      })
    } catch (e) {
      console.log("likeReview call error", e)
    }
  }
  const { isLoading: isConfirming, isSuccess, isConfirmed } = useWaitForTransactionReceipt({ hash })
  useEffect(() => {
    if (connectors) connectors.map((item) => {
      if (item.type == "metaMask") setConnector(item)
    })
  }, [connectors])
  useEffect(() => {
    console.log(userBalance);
  }, [userBalance])
  return (
    <StateContext.Provider value={{
      address,
      contractAddress,
      abi,
      createPropertyFunction,
      updatePropertyFunction,
      updatePriceFunction,
      buyPropertyFunction,
      addReviewFunction,
      likeReviewFunction,
      isConfirming,
      isConfirmed,
      useAllPropertiesFunction,
      useHightestratedProduct,
      useProductReviews,
      useProperty,
      useUserProperties,
      useUserReviews,
      useProperties,
      usePropertyIndex,
      useReviewsCounter,
      usePropertyListedEvent,
      disconnect,
      connect,
      connector,
      userBalance
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext)