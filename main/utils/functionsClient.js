"use client"
export const isMobileClient =()=>{
    try {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent); 
    } catch (error) {
        return false; 
    }
    
} 