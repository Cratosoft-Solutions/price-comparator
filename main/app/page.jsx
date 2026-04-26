"use client";
import HorizontalItemList from "@components/HorizontalItemList";
import HorizontalMainInfo from "@components/HorizontalMainInfo";
import HorizontalSlider from "@components/HorizontalSlider";
import { MAIN_STYLES } from "@utils/constants";
import MainPageInformationTab from "@components/MainPageInformationTab";
import MainPageInformationCategories from "@components/MainPageInformationCategories";

const Home = () => {
 
  return (
    <div className="w-full gap-2 bg-dark-bg">
      <div className="w-full lg:mb-4 relative">
        <HorizontalSlider />
      </div>

      <div className="w-full lg:mb-4 relative">
        <MainPageInformationCategories />
      </div>

      <div className="w-full bg-dark-bg">            
          <HorizontalItemList type="promotions" title="Promociones"/>
      </div>

      <div className="w-full relative">
        <MainPageInformationTab
          propertiesToBeRendered={MAIN_STYLES.MAIN_PAGE.SEARCH_PRODUCT}
        />
      </div>

      <div className="w-full bg-dark-bg">
          <HorizontalItemList type="dailySearches" title="Lo más buscado"/>
      </div>

      <div className="w-full relative">
        <MainPageInformationTab
          propertiesToBeRendered={MAIN_STYLES.MAIN_PAGE.CREATE_PRODUCT_TAB}
        />
      </div>
      <div className="w-full relative">
        <HorizontalMainInfo />
      </div>
    </div>
  );
};

export default Home;
