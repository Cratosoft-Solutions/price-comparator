"use client";
import React, { useState } from "react";
import { VERTICAL_NAV_CONFIGURATION } from "@utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMyStoreConfig } from "@app/redux/slices/verticalNav";


function withNav(Component, navConfiguration) {
  function newNavComponent() {
    const dispatch = useDispatch();
    const { expandedNavBar } = useSelector(state => state.verticalnav.myStoreNav);

    const principalOption = VERTICAL_NAV_CONFIGURATION.filter(optionNav => optionNav.btnNAVPage == navConfiguration).filter(
        (option) => option.isPrincipal
      )[0];

    const secondaryOptions = VERTICAL_NAV_CONFIGURATION.filter(optionNav => optionNav.btnNAVPage == navConfiguration).filter(
        (option) => !option.isPrincipal
      ); 
    
    const [showNav, setShowNav] = useState(expandedNavBar);

    const expandCollapseOptionsBar = (expandOrCollapse) => {
        dispatch(setMyStoreConfig(expandOrCollapse?"EXPANDNAV":"COLLAPSENAV"))
        setShowNav(expandOrCollapse);
      };
    
    const onSelectedButton=(btnID)=>{
        dispatch(setMyStoreConfig(btnID))
    }
    
    return (
        <Component
          showNav={showNav}
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
