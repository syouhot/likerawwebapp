
import { useState, useEffect, use } from 'react';
import { useReadContract } from 'wagmi'; // 假设使用了 wagmi 或其他类似的库
import { useStateContext } from '@/app/context/index';
import { formatUnits } from 'viem';
//点赞评论
export const useAllPropertiesFunction = () => {
  const { contractAddress, abi } = useStateContext()
  try {
    return useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'getAllProperties',
    });
  } catch (error) {
    console.error("useReadContract Error:", error);
  }

}
//获取高收藏的
export const useHightestratedProduct = () => {
  const { contractAddress, abi } = useStateContext()
  const [property, setProperty] = useState(null);
  try {
    const { data, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'getHightestratedProduct',
    });
    useEffect(() => {
      if (data) {
        setProperty(data || null);
      }
    }, [data])
    return { property, isLoading };
  } catch (error) {
    console.error("useHightestratedProduct Error:", error);
  }
}
//获取评论
export const useProductReviews = (productId) => {
  const { contractAddress, abi } = useStateContext()
  const [data, setData] = useState([]);
  try {
    const { data:reviews, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'getProductReviews',
      args: [productId*1],
    });
    useEffect(() => {
      if (reviews) {
        setData(reviews || []);
      }
    }, [reviews])
    return { data, isLoading };
  } catch (error) {
    console.error("useProductReviews Error:", error);
  }
}
//获取房产
export const useProperty = (id) => {
  const { contractAddress, abi } = useStateContext()
  const [data, setData] = useState(null);
  try {
    const { data:entity, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'getProperty',
      args: [id*1],
    });
    useEffect(() => { 
      if (entity) {
        setData({
          productID:entity[0],
          owner: entity[1],
          price: formatUnits(entity[2],18),
          propertyName: entity[3],
          category: entity[4],
          images: entity[5],
          propertyAddress: entity[6],
          description: entity[7],
        } || null);
      }
    },[entity])
    return {data,isLoading }
  } catch (error) {
    console.error("getProperty Error:", error);
  }
}
//获取用户房产
export const useUserProperties = (address) => {
  const { contractAddress, abi } = useStateContext()
  try {
    return { data, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'getUserProperties',
      args: [address],
    });
  } catch (error) {
    console.error("useUserProperties Error:", error);
  }
}
//获取用户评论
export const useUserReviews = (address) => {
  const { contractAddress, abi } = useStateContext()
  try {
    return { data, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'getUserReviews',
      args: [address],
    });
  } catch (error) {
    console.error("useUserReviews Error:", error);
  }
}
//搜索房产
export const useProperties = (key) => {
  const { contractAddress, abi } = useStateContext()
  try {
    return { data, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'properties',
      args: [key],
    });
  } catch (error) {
    console.error("useProperties Error:", error);
  }
}
//获取房产数
export const usePropertyIndex = () => {
  const { contractAddress, abi } = useStateContext()
  try {
    return { data, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'propertyIndex',
    });
  } catch (error) {
    console.error("propertyIndex Error:", error);
  }
}
//获取评论数
export const useReviewsCounter = () => {
  const { contractAddress, abi } = useStateContext()
  try {
    return { data, isLoading } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: 'reviewsCounter',
    });
  } catch (error) {
    console.error("propertyIndex Error:", error);
  }
}


