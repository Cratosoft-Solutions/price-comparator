"use client";
import React, { useEffect } from "react";
import withAuth from "@app/HOCs/AuthHOC";
import Loading from "@app/loading";
import MyStoreVerticalNav from "@components/MyStoreVerticalNav";
import StoreConfig from "@components/store/StoreConfig";
import { useSelector } from "react-redux";
import StoreItem from "@components/store/StoreItem";
import MyItems from "@components/store/MyItems";

const CustomerStore = ({ userIsAuthenticated, isLoading }) => {
  const { selectedOption } = useSelector(state => state.verticalnav.myStoreNav);


  useEffect(() => {
    userIsAuthenticated();
  }, []);
  
  const renderSelectedOption = () =>{
    switch (selectedOption) {
      case "configuration":
        return <StoreConfig/>
      case "products":
        return <StoreItem/>
      case "myproducts":
        return <MyItems/>
      default:
        break;
    }
  }

  return (
    <>
      {!isLoading ? (
        <div className="bg-gray-100">
          {renderSelectedOption()}
          <MyStoreVerticalNav />
        </div>
      ) : (
        <Loading message={"Por favor espere..."} />
      )}
    </>
  );
};

export default withAuth(CustomerStore, true);
