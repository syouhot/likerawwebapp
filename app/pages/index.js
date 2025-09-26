"use client";
import React, { useState, useEffect } from "react";

///INTERNAL IMPORT
import {
  Header,
  Banner,
  Live,
  Service,
  Product,
  TopSeller,
  Collection,
  Footer,
  Copyright,
} from "@/app/PageComponents/Components";

///INTERNAL IMPORT
import { useStateContext } from "@/app/context";
import { getTopCreators } from "@/app/utils";

const index = () => {
  const [properties, setProperties] = useState([]);

  const { currentAccount, useAllPropertiesFunction } = useStateContext();

  //GET DATA
  const {data,isLoading} = useAllPropertiesFunction();

  useEffect(() => {
    if (data) setProperties(data);
  }, [data]);

  //CATEGORIES
  const housing = [];
  const rental = [];
  const farmhouse = [];
  const office = [];
  const commercial = [];
  const country = [];

  if (!isLoading) {
    properties?.map((el) => {
      if (el.category === "country") {
        country.push(el);
      } else if (el.category === "Commercial") {
        commercial.push(el);
      } else if (el.category === "Office") {
        office.push(el);
      } else if (el.category === "Farmhouse") {
        farmhouse.push(el);
      } else if (el.category === "Rental") {
        rental.push(el);
      } else if (el.category === "Housing"||el.category==="housing") {
        housing.push(el);
      }
    });
  }
  const creators = getTopCreators(properties);
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Banner />

      <Live properties={properties} />
      <Service />
      <Product properties={properties} />
      <TopSeller creators={creators} />

      <Collection
        housing={housing?.length}
        rental={rental?.length}
        farmhouse={farmhouse?.length}
        office={office?.length}
      />

      <Footer />
      <Copyright />
    </div>
  );
};

export default index;
