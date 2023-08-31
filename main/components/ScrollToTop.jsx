"use client"
import { BsArrowUpCircle } from "react-icons/bs";
import {useState, useEffect} from "react";

const ScrollToTopButton  =() => {
    const [scrollYPosition, setScrollYPosition]= useState(window?.scrollY);
    const isBrowser = () => typeof window !== 'undefined'; 

    function scrollToTop() {
        if (!isBrowser()) return;
           window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onScroll = (e) => {
        setScrollYPosition(window.scrollY);
      }

    useEffect(() => {
      if (typeof window != undefined)
        window.addEventListener('scroll', onScroll);
    },[]);

    return (
      <>
        {scrollYPosition > 100 ? (
          <button className="fixed bottom-4 right-4" onClick={scrollToTop}>
            <BsArrowUpCircle className="h-14 w-14 " color="F97316" />
          </button>
        ) : null}
      </>
    );
}

export default ScrollToTopButton;