"use client"
import { GoTriangleUp } from "react-icons/go";

import {useState, useEffect} from "react";

const ScrollToTopButton  =() => {
    const isBrowser = () => typeof window !== 'undefined'; 
    const [scrollYPosition, setScrollYPosition]= useState(isBrowser()?window.scrollY:0);

    function scrollToTop() {
        if (isBrowser()){
           window.scrollTo({ top: 0, behavior: 'smooth' });
          }
    }

    const onScroll = (e) => {
        if (isBrowser()){
        setScrollYPosition(window.scrollY);
      }
      }

    useEffect(() => {
        if (isBrowser()) {
        window.addEventListener('scroll', onScroll);}
    },[]);

    return (
      <>
        {scrollYPosition > 100 ? (
          <button className="fixed bottom-2 right-2" onClick={scrollToTop}>
            <GoTriangleUp className="h-20 w-20 hover:animate-bounce" color="black" />
          </button>
        ) : null}
      </>
    );
}

export default ScrollToTopButton;