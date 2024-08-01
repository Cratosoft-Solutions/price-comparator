"use client";
import React, { useState } from "react";
import { VERTICAL_NAV_CONFIGURATION } from "@utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMyStoreConfig, setProductSearchConfig } from "@app/redux/slices/verticalNav";
import { isMobile } from "@utils/functions";
import { orderProducts, restartProducts, setMatchedProducts } from "@app/redux/slices/products";
import { useRouter } from "next/navigation";
import { setExpandedBar } from "@app/redux/slices/siteNav";

function withNav(Component, navConfiguration) {
  function newNavComponent() {
    const router = useRouter();
    const { text } = useSelector(state => state.searchProperties.properties);
    const textSearchArray = text.toUpperCase().split(" ");
    const dispatch = useDispatch();

    const principalOption = VERTICAL_NAV_CONFIGURATION.filter(optionNav => optionNav.btnNAVPage == navConfiguration).filter(
      (option) => option.isPrincipal
    )[0];

  const secondaryOptions = VERTICAL_NAV_CONFIGURATION.filter(optionNav => optionNav.btnNAVPage == navConfiguration).filter(
      (option) => !option.isPrincipal
    ); 

    const { expandedBar } =  useSelector(state => state.siteNav);

    const expandCollapseOptionsBar = (expandOrCollapse) => {
        dispatch(setExpandedBar(expandOrCollapse))
      };
    
    const actionsProductSearch = (btnID)=>{
      
      switch (btnID) {
        case "MINTOMAX":
          dispatch(orderProducts(1));
          break;
        case "MAXTOMIN":
          dispatch(orderProducts(-1));
          break;
        case "MATCH":
          dispatch(setMatchedProducts(textSearchArray));
          break;
        case "NEWSEARCH":
          expandCollapseOptionsBar(false);
          dispatch(restartProducts());
          router.push("/");
      }
    }

    const actionsHome = (btnID)=>{
      let pageToRedirect = "/";
      switch (btnID) {
        case "PUBLISH":
          pageToRedirect = "/create/item?type=product"
          break;
        case "PROMOTION":          
          pageToRedirect = "promotion"
          break;
        case "SALE":
          pageToRedirect = "sale"
          break;
        case "HOWITWORKS":
          pageToRedirect = "howtouse"
          break;
      }
      router.push(pageToRedirect);
    }

    const onSelectedButton=(btnNAVPage, btnID)=>{        
        switch (btnNAVPage) {
          case "myStore":
            expandCollapseOptionsBar(false);
            dispatch(setMyStoreConfig(btnID));
            break;
          case "productSearch":
            dispatch(setProductSearchConfig(btnID));
            actionsProductSearch(btnID);
            break;
          case "home":
            actionsHome(btnID);
            break; 
          default:
            break;
        }

    }
    
    return (
        <Component
          showNav={expandedBar}
          expandCollapseOptionsBar={expandCollapseOptionsBar}
          principalOption={principalOption}
          secondaryOptions={secondaryOptions}
          onSelectedButton={onSelectedButton}
        />
    );
  }

  return newNavComponent;
}

export default withNav;
