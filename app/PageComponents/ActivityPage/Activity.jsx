import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getTopCreators } from "../../utils";
import { useStateContext } from "@/app/context";
import { formatUnits } from "viem";
const Activity = ({ properties, totalReviews, popular }) => {
  const { useHightestratedProduct } = useStateContext();
  const [highData, setHighData] = useState(null);
  // const creators = getTopCreators(properties);
  const { high } = useHightestratedProduct();
  useEffect(() => { 
    setHighData(high)
  },[high])
  return (
    <div className="rn-activity-area rn-section-gapTop">
      <div className="container">
        <div className="row mb--30">
          <h3 className="title">All following Acivity</h3>
        </div>
        <div className="row g-6 activity-direction">
          <div className="col-lg-8 mb_dec--15">
            {properties?.map((activity, i) => (
              <div className="single-activity-wrapper" key={i}>
                <div className="inner">
                  <div className="read-content">
                    <div className="thumbnail">
                      <a href={`/detail?property=${activity?.productID}`}>
                        <img
                          style={{
                            width: "100px",
                            height: "auto",
                          }}
                          src={activity?.images||null}
                          alt="Nft_Profile"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <a href={`/detail?property=${activity?.productID}`}>
                        <h6 className="title">{activity?.propertyTitle.slice(0, 25)}</h6>
                      </a>
                      <p>{activity.owner.slice(0, 25)}...</p>
                      <div className="time-maintane">
                        <div className="time data">
                          <span>
                            {i + 1}:30 PM on {i + 1}9th June,{" "}
                          </span>
                        </div>
                        <div className="user-area data">
                          <Link
                            href={{
                              pathname: `/category/${activity.category}`,
                            }}
                          >
                            {activity.category}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="filter-wrapper">
              <div className="widge-wrapper rbt-sticky-top-adjust">
                <div className="inner">
                  <h3>Analytic Stats</h3>
                  <div className="sing-filter">
                    <button>Total Property: {properties?.length}</button>
                    {/* <button>Users: {creators.length}</button> */}
                    <button>Reviews: {totalReviews}</button>
                  </div>
                </div>
                <div className="inner">
                  <h3>Category</h3>
                  <div className="sing-filter">
                    <button>Housing</button>
                    <button>Rental</button>
                    <button>Office</button>
                    <button>Commercial</button>
                    <button>Farmhouse</button>
                    <button>Country</button>
                  </div>
                </div>
                <div className="inner">
                  <h3>Popular Property</h3>
                  <div className="sing-filter">
                    <Link
                      href={{
                        pathname: `/detail`,
                        query: { property: `${highData?formatUnits(highData, 0):''}` },
                      }}
                    >
                      Check Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
