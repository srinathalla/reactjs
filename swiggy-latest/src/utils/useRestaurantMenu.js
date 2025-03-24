import { useState,useEffect } from "react";
const useRestaurantMenu = (resId) =>
{
        const [resInfo, setResInfo]= useState(null);
   
         useEffect(()=> {
          fetchData();
         },[]);
       
         const fetchData = async () => {
           const url = "http://localhost:8080/restaurants/" + resId;
           const data = await fetch(url);
           const json = await data.json();
           setResInfo(json);
         }
         return resInfo;
}

export default useRestaurantMenu;