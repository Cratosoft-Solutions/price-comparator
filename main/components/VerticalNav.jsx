import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCollapse } from "react-icons/bi";

const VerticalNav = ({showNav, expandCollapseOptionsBar, principalOption, secondaryOptions, onSelectedButton}) => {
  return (
    <>
        {showNav && (
          <div className="fixed top-12 bg-white lg:top-20 lg:ml-2 z-30 bg-white w-full lg:w-52 p-2 h-fit lg:rounded-lg lg:p-2 shadow searchoptions">
            <div className={`grid grid-rows-${secondaryOptions.length} gap-2`}>
              <div className="grid grid-cols-[20%_80%] grid-rows-1 items-center  btn_nav  border-b-[1px] border-orange-500 lg:bg-white">
                {principalOption.icon}
                <button
                  onClick={() => {
                    onSelectedButton(
                      principalOption.btnID
                    );
                  }}
                  className="text-left pl-1"
                >
                  {principalOption.btnDescription}
                </button> 
              </div>
  
              {secondaryOptions.map((filteredOption, index) => (
                <div key={index}
                  className={`grid grid-cols-[20%_80%] grid-rows-1 items-center btn_nav min-w-[10rem]`}
                >
                  {filteredOption.icon}
                  <button
                    onClick={() => {
                        onSelectedButton(
                        filteredOption.btnID
                      );
                    }}
                    className="text-left pl-1"
                  >
                    {filteredOption.btnDescription}
                  </button>
                </div>
              ))}
  
              <div className=" flex z-50 w-full justify-center items-center">
                <BiCollapse
                  onClick={() => {
                    expandCollapseOptionsBar(false);
                  }}
                  className="h-6 w-6"
                  color="gray"
                />
              </div>
            </div>
          </div>
        )}
        {!showNav && (
          <div className="fixed top-12 lg:top-16 z-50 bg-white w-full lg:w-10 p-2 h-fit lg:min-h-screen border-r-[1px] border-gray-300">
            <RxHamburgerMenu
              onClick={() => {
                expandCollapseOptionsBar(true);
              }}
              className="h-6 w-6"
              color="gray"
            />
          </div>
        )}
      </>
  )
}

export default VerticalNav