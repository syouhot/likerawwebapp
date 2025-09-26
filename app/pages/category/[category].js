"use client"
import React, { useState, useEffect } from "react";

///INTERNAL IMPORT
import { Title, Collection } from "../../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../../PageComponents/Components";

//INTERNAL IMPORT
import { useStateContext } from "../../context";

const collection = ({searchParams}) => {
    const { name } = React.use(searchParams);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const { address, contract, useAllPropertiesFunction } = useStateContext();
  
  const { data: propertiesData } = useAllPropertiesFunction();
  //GET DATA
  useEffect(() => {
    setProperties(propertiesData);
    if(propertiesData) setIsLoading(false);
  }, [propertiesData]);

  //CATEGORIES

  const category = [];

  if (!isLoading) {
    properties?.map((el) => {
      if (el.category === name.toLowerCase()) {
        category.push(el);
      }
    });
  }

  console.log(category);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Title title={name} />
      <Collection category={category} isLoading={isLoading} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default collection;
