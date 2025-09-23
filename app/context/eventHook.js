
import { useState, useEffect } from 'react';
import { useWatchContractEvent } from 'wagmi'; // 假设使用了 wagmi 或其他类似的库
import { useStateContext } from '@/app/context/index';
//添加房产事件
export const usePropertyListedEvent = (callback) => {
    const { contractAddress, abi } = useStateContext()
    try {
        useWatchContractEvent({
            address: contractAddress,
            abi: abi,
            eventName: 'PropertyListed',
            onLogs: (logs) => {
                console.log("PropertyListed logs:", logs);
                callback()
            }
        });
    } catch (error) {
        console.error("useReadContract Error:", error);
    }

}