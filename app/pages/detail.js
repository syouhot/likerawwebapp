"use client"
import React, { useEffect, useState } from "react";
//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  DetailEight,
  DetailFive,
  DetailFour,
  DetailOne,
  DetailSeven,
  DetailSix,
  DetailThree,
  DetailTwo,
} from "../PageComponents/DetailPage";

import { Loader, GlobalLoder } from "../PageComponents/Components";

import { useStateContext } from "../context";
import { formatUnits } from "viem";

const detail = ({searchParams }) => {
  const [property, setProperty] = useState();
  const [parsedReviews, setParsedReviews] = useState();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const {
    useProductReviews,
    useLikeReviewFunction,
    buyPropertyFunction,
    useProperty,
    useAllPropertiesFunction,
    useUpdatePriceFunction,
    writeContract,
    loader,
    address,
    useAddReviewFunction,
    isConfirming,
    isConfirmed,
    status
  } = useStateContext();

  const {property:propertyId} = React.use(searchParams);
  const { data } = useProperty(propertyId);
  const { data: dataReviews } = useProductReviews(propertyId);
  const { data: dataProperties } = useAllPropertiesFunction();
  const addReview = useAddReviewFunction()
  const likeReview = useLikeReviewFunction()
  const updatePrice = useUpdatePriceFunction()
  const buyProperty = buyPropertyFunction()
  
  useEffect(() => { 
    setUpdatePriceLoading(status =="pending"?true:false)
    setCommentLoading(status == "pending" ?true:false)
    setBuyLoading(status == "pending" ?true:false)
  }, [status])
  //GET PROPERTY DATA
  useEffect(() => {
    setProperties(dataProperties);
    setProperty(data);
    setParsedReviews(dataReviews); 
  }, [data,dataReviews,dataProperties]);
  useEffect(() => { 
    if (propertyId) setIsLoading(false);
  }, [propertyId])
  //ADD REVIEW
  const [review, setReview] = useState({
    productID: "",
    rating: 4,
    comment: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setReview({ ...review, [fieldName]: e.target.value });
  };

  const createReview = async () => {
    const data = await addReview({
      ...review,
      productID: Number(formatUnits(property?.productID,0))
    });
  };

  //LIKE REVIEW
  const [likeReviews, setLikeReviews] = useState({
    productID: "",
    reviewIndex: "",
  });
  const likeReviewCall = async (property, reviewIndex) => {
    const data = await likeReview({ productID: Number(formatUnits(property?.productID, 0)), reviewIndex});
  };

  //BUY PROPERTY
  const buying = {
    productID: property?.productID,
    amount: property?.price,
  };
  const buyingProperty = async () => {
    setBuyLoading(true);
    try {
      const data = await buyProperty(buying);
      
    } catch (e) {
      console.log(111,e);
      
    }
  };

  //UPDATE PRICE
  const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
    address,
    productID: propertyId,
    price: "",
  });
  const updatepropertyPrice = async () => {
    setUpdatePriceLoading(true);
    const data = await updatePrice({
      ...updatePropertyPrice
    });
    // setUpdatePriceLoading(false);
    // window.location.reload();
  };
  //
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <DetailOne />

      <DetailTwo
        property={property}
        parsedReviews={parsedReviews}
        setLikeReviews={setLikeReviews}
        likeReviewCall={likeReviewCall}
        buyingProperty={buyingProperty}
        address={address}
        isLoading={isLoading}
        buyLoading={buyLoading}
      />

      <DetailThree properties={properties} />
      <DetailFive />
      <DetailSix />
      <DetailSeven
        property={property}
        setUpdatePropertyPrice={setUpdatePropertyPrice}
        updatepropertyPrice={updatepropertyPrice}
        updatePropertyPrice={updatePropertyPrice}
        updatePriceLoading={updatePriceLoading}
      />
      <DetailEight
        createReview={createReview}
        handleFormFieldChange={handleFormFieldChange}
        commentLoading={commentLoading}
      />

      <Footer />
      <Copyright />
      {loader && <GlobalLoder />}
    </div>
  );
};

export default detail;
