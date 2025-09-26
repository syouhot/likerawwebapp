
import { useStateContext } from '@/app/context/index';
import { parseUnits } from 'viem';

//更新
export const updatePropertyFunction = () => {
    const { contractAddress, abi, writeContract, address } = useStateContext()
    const updateProperty = async (form) => { 
        const {  productId, propertyTitle, category, images, propertyAddress, description } = form
        try {
            return await writeContract({
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
    return updateProperty
}

//更新价格
export const useUpdatePriceFunction = () => {
    const { contractAddress, abi,writeContract,address } = useStateContext()
    const updatePrice = async (form) => { 
        const { productID, price } = form
        try {
            return await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'updatePrice',
                args: [
                    address,
                    productID,
                    parseUnits(price,18)
                ]
            })
        } catch (error) {
            console.log("updatePriceFunctionError", error);
    
        }
    }
    return updatePrice
}

//创建
export const createPropertyFunction = () => {
    const { contractAddress, abi, writeContract, address } = useStateContext()
    const createProperty = async (form) => { 
        const { price, propertyTitle, category, images, propertyAddress, description } = form
        try {
           return await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'listProperty',
                args: [
                    address,
                    parseUnits(price, 18),
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
    return createProperty
}

//购买
export const buyPropertyFunction = () => {
    const { contractAddress, abi, address, writeContract } = useStateContext()
    const buyProperty = async (form) => { 
        const { productID,amount } = form
        try {
            return await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'buyProperty',
                args: [
                    productID,
                    address,
                ],
                value:parseUnits(amount,18)
            })
        } catch (e) {
            console.log("buyPropertyFunction call error", e)
        }
    }
    return buyProperty
}

//添加评论
export const useAddReviewFunction = () => {
    const { contractAddress, abi,writeContract,address } = useStateContext()
    const addReview = async (form) => { 
        const { productID, rating, comment } = form
        try {
            return await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'addReview',
                args: [
                    productID,
                    rating,
                    comment,
                    address
                ]
            })
        } catch (e) {
            console.log("addReviewFunction call error", e)
        }
    }
    return addReview
}

//点赞评论
export const useLikeReviewFunction = () => {
    const { contractAddress, abi, writeContract, address } = useStateContext()
    const likeReview = async (form) => {
        const { productID, reviewIndex } = form
        console.log(productID,reviewIndex);
        
        try {
            await writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'likeReview',
                args: [
                    productID,
                    reviewIndex,
                    address
                ]
            })
        } catch (e) {
            console.log("likeReview call error", e)
        }
     }
    return likeReview
}