"use client";
import React from "react";
import withNav from "@app/HOCs/NavHOC";
import VerticalNav from "./VerticalNav";

const MyStoreVerticalNav = ({
  showNav,
  expandCollapseOptionsBar,
  principalOption,
  secondaryOptions,
  onSelectedButton,
}) => {
  return (
    <VerticalNav
      showNav={showNav}
      expandCollapseOptionsBar={expandCollapseOptionsBar}
      principalOption={principalOption}
      secondaryOptions={secondaryOptions}
      onSelectedButton={onSelectedButton}
    />
  );
};

export default withNav(MyStoreVerticalNav, "myStore");
