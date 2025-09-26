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
import {
  updatePropertyFunction,
  useUpdatePriceFunction,
  createPropertyFunction,
  useAddReviewFunction,
  buyPropertyFunction,
  useLikeReviewFunction,
} from "@/app/context/writeHook"
import { usePropertyListedEvent } from "@/app/context/eventHook"

const contractAddress = "0x4bc4c0f18a185d9a540b0ed05d578c45d2eff5b7"
const StateContext = React.createContext();
const abi = abiData.abi;

export function StateContextProvider({ children }) {
  const [connector, setConnector] = React.useState(null);
  const { writeContract, status, data: hash } = useWriteContract();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data: userBalance } = useBalance({
    address,
  })
  const { connectors, connect } = useConnect();
  // //更新
  // const updatePropertyFunction = async (form) => {
  //   const { address, productId, propertyTitle, category, images, propertyAddress, description } = form
  //   try {
  //     await writeContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: 'updateProperty',
  //       args: [
  //         address,
  //         productId,
  //         propertyTitle,
  //         category,
  //         images,
  //         propertyAddress,
  //         description,
  //       ]
  //     })
  //   } catch (error) {
  //     console.log("updatePropertyFunctionError", error);
  //   }
  // }
  // //更新价格
  // const updatePriceFunction = async (form) => {
  //   const { address, productID, price } = form
  //   try {
  //     await writeContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: 'updatePrice',
  //       args: [
  //         address,
  //         productID,
  //         price
  //       ]
  //     })
  //   } catch (error) {
  //     console.log("updatePriceFunctionError", error);

  //   }
  // }
  // //创建
  // const createPropertyFunction = async (form) => {
  //   const { address, price, propertyTitle, category, images, propertyAddress, description } = form
  //   try {
  //     await writeContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: 'listProperty',
  //       args: [
  //         address,
  //         price,
  //         propertyTitle,
  //         category,
  //         images,
  //         propertyAddress,
  //         description,
  //       ]
  //     })
  //   } catch (e) {
  //     console.log("createPropertyFunction call error", e)
  //   }
  // }
  // //购买
  // const buyPropertyFunction = async (form) => {
  //   const { id } = form
  //   try {
  //     await writeContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: 'buyProperty',
  //       args: [
  //         id,
  //         address,
  //       ]
  //     })
  //   } catch (e) {
  //     console.log("buyPropertyFunction call error", e)
  //   }
  // }
  // //添加评论
  // const addReviewFunction = async (form) => {
  //   const { productID, rating, comment } = form
  //   try {
  //     writeContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: 'addReview',
  //       args: [
  //         productID,
  //         rating,
  //         comment,
  //         address
  //       ]
  //     })
  //   } catch (e) {
  //     console.log("addReviewFunction call error", e)
  //   }
  // }
  // //点赞评论
  // const likeReviewFunction = async (form) => {
  //   const { productId, reviewIndex } = form
  //   try {
  //     await writeContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: 'likeReview',
  //       args: [
  //         productId,
  //         reviewIndex,
  //         address
  //       ]
  //     })
  //   } catch (e) {
  //     console.log("likeReview call error", e)
  //   }
  // }
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
  useEffect(() => {
    if (connectors) connectors.map((item) => {
      if (item.type == "metaMask") setConnector(item)
    })
  }, [connectors])
  useEffect(() => {
    if (isConfirmed) {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        window.location.reload();
      },2000)
    }
  }, [isConfirmed])
  return (
    <StateContext.Provider value={{
      address,
      contractAddress,
      abi,
      updatePropertyFunction,
      useUpdatePriceFunction,
      createPropertyFunction,
      useAddReviewFunction,
      buyPropertyFunction,
      useLikeReviewFunction,
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
      userBalance,
      writeContract,
      status
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext)