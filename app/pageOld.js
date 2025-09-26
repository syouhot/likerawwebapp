"use client";
import React, { use, useEffect, useState } from 'react';
import { useConnect, useDisconnect, useAccount, useReadContract, useWriteContract } from 'wagmi';
import abiData from './utils/abi.json';
import { useStateContext } from './context';
import { checkIfImage } from './utils';
import { parseUnits } from 'viem';
import { useAllPropertiesFunction } from "@/app/context/readHook"
const styles = {
  header: "flex flex-row gap-4",
  button: "bg-blue-500 p-2 rounded-md text-white font-bold cursor-pointer"
}
export default function Home() {
  const { properties } = useAllPropertiesFunction()
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [show, setShow] = React.useState(false)
  const { contractAddress, abi, createPropertyFunction, status } = useStateContext()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    price: "",
    propertyTitle: '',
    category: "",
    images: "",
    propertyAddress: "",
    description: "",
  })
  const handleFormFieldChange = (fieldName, e) => {
    setForm({
      ...form,
      [fieldName]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true)
        //提交合约
        await createPropertyFunction({
          ...form,
          address: address,
        })
        setIsLoading(false)
      } else {
        alert("Please provide valid image URL")
        setForm({ ...form, images: "" })
      }
    })
  }
  useEffect(() => {
    console.log(abiData.abi);
    setShow(isConnected || false)
  }, [])
  const handlerConnect = async (connector) => {
    await connect({ connector })
  }
  return (
    <div style={{ padding: '20px', display: "flex", flexDirection: "column", gap: "20px", borderBottom: "1px solid black" }}>
      <div className={styles.header}>
        {
          connectors.map((connector) => (
            <button key={connector.uid} className={styles.button} onClick={() => handlerConnect(connector)}>{connector.name}</button>
          ))
        }
      </div>
      <div>
        {show && isConnected && <div>{address}</div>}
        <button className={styles.button} onClick={() => disconnect()}>Disconnect</button>
      </div>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='number' placeholder='price' onChange={(e) => handleFormFieldChange('price', e)} />
        </div>
        <div>
          <input type='text' placeholder='propertytitle' onChange={(e) => handleFormFieldChange('propertyTitle', e)} />
        </div>
        <div>
          <input type='text' placeholder='category' onChange={(e) => handleFormFieldChange('category', e)} />
        </div>
        <div>
          <input type='url' placeholder='images' onChange={(e) => handleFormFieldChange('images', e)} />
        </div>
        <div>
          <input type='text' placeholder='propertyAddress' onChange={(e) => handleFormFieldChange('propertyAddress', e)} />
        </div>
        <div>
          <input type='text' placeholder='description' onChange={(e) => handleFormFieldChange('description', e)} />
        </div>
        <div>
          <button type='submit' style={{ border: "1px solid black", padding: "5px" }} disabled={status=="pending"}>
            {status == "pending" ? 'Confirming...' : 'Mint'}
          </button>
        </div>
      </form>
    </div>
  );
}
