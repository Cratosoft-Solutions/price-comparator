import React from 'react';
import BTNPublish from './BTNPublish';
import SearchButton from './SearchButton';

const MainPageInformationTab  = ({propertiesToBeRendered}) => {
  const renderBTN =()=>{
    switch (propertiesToBeRendered.btn) {
      case "PUBLISH":
        return <BTNPublish/>;
      case "SEARCH":
        return <SearchButton/>;
    }
  }
  return (
    <div style={propertiesToBeRendered.specialStyle} className={`${propertiesToBeRendered.backGroundColor}  w-full h-fit grid grid-cols-1 grid-rows-1 md:grid-cols-[65%_35%]`}>
      <div className={`h-fit ${propertiesToBeRendered.backGroundColor}  flex items-center`}>
        <div className="text-black mb-4 md:mb-0 p-4 md:p-14 h-fit w-full justify-center">
          <p className="font-black text-2xl md:text-5xl mb-4 w-full text-center md:text-left">
            {propertiesToBeRendered.title}
          </p>
          <p className="font-black text-2xl md:text-4xl mb-4 w-full text-center md:text-left">
          {propertiesToBeRendered.subTitle}
          </p>
          <p className="text-gray-800 w-full text-center md:text-left">
          {propertiesToBeRendered.bodyDescription}
          </p>
          <div className="flex w-full justify-center md:justify-start mt-4">
            {renderBTN()}
          </div>
        </div>
      </div>
      <div className={`hidden md:flex items-center justify-left w-full h-fit ${propertiesToBeRendered.backGroundColor} ${propertiesToBeRendered.imgPadding} `}>
        <img className={`${propertiesToBeRendered.imgStyle}`} src={propertiesToBeRendered.image} />
      </div>
    </div>
  );
}

export default MainPageInformationTab 