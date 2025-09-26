"use client"
import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import {
  AuthorFive,
  AuthorFour,
  AuthorOne,
  AuthorThree,
  AuthorTwo,
} from "../PageComponents/AuthorPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

import { useStateContext } from "../context";

const author = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [author, setAuthor] = useState([]);

  const { address, useUserProperties, useAllPropertiesFunction } =
    useStateContext();

  const {data:propertiesData} = useAllPropertiesFunction();
  const {data:authorData} = useUserProperties();
  //GET DATA
  useEffect(() => {
    setProperties(propertiesData);
    setAuthor(authorData);
    if(propertiesData&&authorData) setIsLoading(false);
  }, [propertiesData,authorData]);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <AuthorOne />
      <AuthorTwo address={address} author={author} />
      <AuthorThree properties={properties} author={author} />
      <AuthorFour />
      <AuthorFive />
      <Footer />
      <Copyright />
    </div>
  );
};

export default author;
