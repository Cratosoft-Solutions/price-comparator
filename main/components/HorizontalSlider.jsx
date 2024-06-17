import React from 'react';
import { Zoom } from 'react-slideshow-image';
import { useSelector } from "react-redux";
import 'react-slideshow-image/dist/styles.css';
import { isMobile } from '@utils/functions';
import { useRouter } from 'next/navigation';




const HorizontalSlider = () => {
const router = useRouter();
    const { category } = useSelector(state => state.siteNav);
    const images = [
      {url: '/assets/images/main_slider_PRODUCT_1.svg',
        redirectTo: '/createItem/product',
        active: true
      },
      {url: '/assets/images/main_slider_PRODUCT_1_MOBILE.svg',
        redirectTo: '/createItem/product',
        active: true
      },
      {url: '/assets/images/main_slider_PRODUCT_2.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_PRODUCT_2_MOBILE.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_CAR_1.svg',
        redirectTo: '/createItem/car',
        active: true
      },
      {url: '/assets/images/main_slider_CAR_2.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_CAR_1_MOBILE.svg',
        redirectTo: '/createItem/car',
        active: true
      },
      {url: '/assets/images/main_slider_CAR_2_MOBILE.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_HOUSES_1.svg',
        redirectTo: '/createItem/house',
        active: true
      },
      {url: '/assets/images/main_slider_HOUSES_2.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_HOUSES_1_MOBILE.svg',
        redirectTo: '/createItem/house',
        active: true
      },
      {url: '/assets/images/main_slider_HOUSES_2_MOBILE.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_SERVICES_1.svg',
        redirectTo: '/createItem/service',
        active: true
      },
      {url: '/assets/images/main_slider_SERVICES_2.svg',
        redirectTo: '/',
        active: true
      },
      {url: '/assets/images/main_slider_SERVICES_1_MOBILE.svg',
        redirectTo: '/createItem/service',
        active: true
      },
      {url: '/assets/images/main_slider_SERVICES_2_MOBILE.svg',
        redirectTo: '/',
        active: true
      }
        ].filter(image => image.active)
         .filter(image => (isMobile() && image.url.indexOf("MOBILE") > -1)||
                         (!isMobile()&& image.url.indexOf("MOBILE") < 0))
         .filter(image => image.url.indexOf(category) > -1);

    const onUserSelectedImage =(url)=>{
      router.push(url);
    }
    
    return (
      <div className="slide-container hover:cursor-pointer">
        <Zoom scale={0.4} indicators={true} arrows={false} autoplay={true} canSwipe={true}>
          {
            images.map((each, index) =>( <img onClick={()=>{onUserSelectedImage(each.redirectTo)}} key={index} style={{width: "100%"}} src={each.url} />))
          }
        </Zoom>
      </div>
    )
}

export default HorizontalSlider;