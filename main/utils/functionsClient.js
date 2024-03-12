"use client"
export const isMobileClient =()=>{
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return false;//TODO regex.test(navigator.userAgent);
} 