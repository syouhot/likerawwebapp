"use client"
import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { Activity } from "../PageComponents/ActivityPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { useStateContext } from "../context";
import { set } from "@/public/js/vendor/js.cookie";
const active = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [totalReviews, setTotalReviews] = useState();

  const { useAllPropertiesFunction, useReviewsCounter, useHightestratedProduct } =
    useStateContext();
  const { data: propertiesData } = useAllPropertiesFunction();
  const {data:totalReviewsData } = useReviewsCounter();
  //GET DATA

  useEffect(() => {
    setProperties(propertiesData);
    setTotalReviews(totalReviewsData);
    if(propertiesData) setIsLoading(false);
  }, [propertiesData, totalReviewsData]);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Activity
        properties={properties}
        totalReviews={totalReviews}
        popular={useHightestratedProduct}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default active;
