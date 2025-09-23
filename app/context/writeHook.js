
import { useStateContext } from '@/app/context/index';
//更新
export const updatePropertyFunction = async (form, writeContract) => {
    const { contractAddress, abi } = useStateContext()
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
export const updatePriceFunction = async (form, writeContract) => {
    const { contractAddress, abi } = useStateContext()
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
export const createPropertyFunction = async (form, writeContract) => {
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
export const buyPropertyFunction = async (form, writeContract) => {
    const { contractAddress, abi } = useStateContext()
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
export const addReviewFunction = async (form, writeContract) => {
    const { contractAddress, abi } = useStateContext()
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
export const likeReviewFunction = async (form, writeContract) => {
    const { contractAddress, abi } = useStateContext()
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