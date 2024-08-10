import React from 'react';
import BTNPublish from './BTNPublish';
import SearchButton from './SearchButton';

const MainPageInformationTab  = ({propertiesToBeRendered}) => {
  const renderBTN =()=>{
    switch (propertiesToBeRendered.btn) {
      case "PUBLISH":
        return <BTNPublish/>;
      case "SEARCH":
        return <SearchButton personalizedClass='!h-16 lg:!h-16'/>;
    }
  }
  return (
    <div style={propertiesToBeRendered.specialStyle} className={`${propertiesToBeRendered.backGroundColor}  w-full h-fit grid grid-cols-1 grid-rows-1 lg:grid-cols-[65%_35%]`}>
      <div className={`h-fit ${propertiesToBeRendered.backGroundColor}  flex items-center`}>
        <div className="text-black mb-4 lg:mb-0 p-4 lg:p-14 h-fit w-full justify-center">
          <h1 className="font-black text-2xl lg:text-5xl mb-4 w-full text-center lg:text-left">
            {propertiesToBeRendered.title}
          </h1>
          <h2 className="font-black text-2xl lg:text-4xl mb-4 w-full text-center lg:text-left">
          {propertiesToBeRendered.subTitle}
          </h2>
          <p className="text-gray-800 w-full text-center lg:text-left">
          {propertiesToBeRendered.bodyDescription}
          </p>
          <div className="flex w-full justify-center lg:justify-start mt-4">
            {renderBTN()}
          </div>
        </div>
      </div>
      <div className={`hidden lg:flex items-center justify-left w-full h-fit ${propertiesToBeRendered.backGroundColor} ${propertiesToBeRendered.imgPadding} `}>
        <img className={`${propertiesToBeRendered.imgStyle}`} src={propertiesToBeRendered.image} />
      </div>
    </div>
  );
}

export default MainPageInformationTab 