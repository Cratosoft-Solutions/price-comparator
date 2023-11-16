"use client";
import React, { useEffect } from "react";
import Search from "@components/Search";
import withAuth from "@app/HOCs/AuthHOC";
import Loading from "@app/loading";

const MySearch = ({ refreshToken, isLoading }) => {
  useEffect(() => {
    refreshToken();
  }, []);
  
  return (
    <>{!isLoading ? <Search /> : <Loading message={"Por favor espere..."} />}</>
  );
};

export default withAuth(MySearch);
