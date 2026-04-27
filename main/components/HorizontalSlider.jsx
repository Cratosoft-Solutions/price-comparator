'use client';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const AUTOPLAY_INTERVAL = 4000;

function autoplayPlugin(interval) {
  return (slider) => {
    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearNextTimeout();
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, interval);
    }

    slider.on('created', nextTimeout);
    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);

    slider.container.addEventListener('mouseover', () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false;
      nextTimeout();
    });
  };
}

const SliderWithDots = ({ classToApply, images, onUserSelectedImage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
      defaultAnimation: { duration: 800 },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [autoplayPlugin(AUTOPLAY_INTERVAL)]
  );

  if (images.length === 0) return null;

  return (
    <div className={`${classToApply} relative group`}>
      <div
        ref={sliderRef}
        className="keen-slider hover:cursor-pointer rounded-xl overflow-hidden"
      >
        {images.map((each, index) => (
          <div
            key={index}
            className="keen-slider__slide"
            onClick={() => onUserSelectedImage(each.redirectTo)}
          >
            <img
              src={each.url}
              alt=""
              className="w-full h-auto select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-2 py-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Ir a slide ${idx + 1}`}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HorizontalSlider = () => {
  const router = useRouter();
  const { category } = useSelector(state => state.siteNav);

  const desktopImages = [
    { url: '/assets/images/main_slider_PRODUCT_2.svg', redirectTo: '/create/item?type=product', active: true },
    { url: '/assets/images/main_slider_PRODUCT_1.svg', redirectTo: '/', active: true },
    { url: '/assets/images/main_slider_CAR_1.svg', redirectTo: '/createItem/car', active: true },
    { url: '/assets/images/main_slider_CAR_2.svg', redirectTo: '/', active: true },
    { url: '/assets/images/main_slider_HOUSES_1.svg', redirectTo: '/createItem/house', active: true },
    { url: '/assets/images/main_slider_HOUSES_2.svg', redirectTo: '/', active: true },
    { url: '/assets/images/main_slider_SERVICES_1.svg', redirectTo: '/createItem/service', active: true },
    { url: '/assets/images/main_slider_SERVICES_2.svg', redirectTo: '/', active: true },
  ].filter(image => image.url.indexOf(category) > -1);

  const mobileImages = [
    { url: '/assets/images/main_slider_PRODUCT_2_MOBILE.svg', redirectTo: '/create/item?type=product', active: true },
    { url: '/assets/images/main_slider_PRODUCT_1_MOBILE.svg', redirectTo: '/', active: true },
    { url: '/assets/images/main_slider_CAR_1_MOBILE.svg', redirectTo: '/createItem/car', active: true },
    { url: '/assets/images/main_slider_CAR_2_MOBILE.svg', redirectTo: '/', active: true },
    { url: '/assets/images/main_slider_HOUSES_1_MOBILE.svg', redirectTo: '/createItem/house', active: true },
    { url: '/assets/images/main_slider_HOUSES_2_MOBILE.svg', redirectTo: '/', active: true },
    { url: '/assets/images/main_slider_SERVICES_1_MOBILE.svg', redirectTo: '/createItem/service', active: true },
    { url: '/assets/images/main_slider_SERVICES_2_MOBILE.svg', redirectTo: '/', active: true },
  ].filter(image => image.url.indexOf(category) > -1);

  const onUserSelectedImage = (url) => {
    router.push(url);
  };

  return (
    <>
      <SliderWithDots
        classToApply="hidden lg:block"
        images={desktopImages}
        onUserSelectedImage={onUserSelectedImage}
      />
      <SliderWithDots
        classToApply="block lg:hidden"
        images={mobileImages}
        onUserSelectedImage={onUserSelectedImage}
      />
    </>
  );
};

export default HorizontalSlider;
