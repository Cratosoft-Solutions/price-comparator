import React from 'react';
import { Zoom } from 'react-slideshow-image';
import { useSelector } from "react-redux";
import 'react-slideshow-image/dist/styles.css';




const HorizontalSlider = () => {


    const { category } = useSelector(state => state.siteNav);
    const images = [
        '/assets/images/main_slider_PRODUCT_1.svg',
        '/assets/images/main_slider_PRODUCT_2.svg',
        '/assets/images/main_slider_CAR_1.svg',
        '/assets/images/main_slider_CAR_2.svg',
        '/assets/images/main_slider_HOUSES_1.svg',
        '/assets/images/main_slider_HOUSES_2.svg',
        '/assets/images/main_slider_SERVICES_1.svg',
        '/assets/images/main_slider_SERVICES_2.svg'
        ].filter(title => title.indexOf(category) > -1);

    
    return (
      <div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) =>( <img key={index} style={{width: "100%"}} src={each} />))
          }
        </Zoom>
      </div>
    )
}

export default HorizontalSlider;