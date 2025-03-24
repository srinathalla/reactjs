
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCard from "./RestaurantCard";
import RestaurantCategory from "./RestuarantCategory";
const RestaurantMenu = () =>
{
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(0);

    if(resInfo === null)
    {
        return <Shimmer/>;      
    }
    const {name, costForTwo, menu} = resInfo;

    return <div className="text-center">
        <h1 className="font-bold my-6">{name}</h1>
        <h2 className="font-bold text-lg">{costForTwo} Rs for Two</h2>
        <ul>
            {menu.map((item,index) => <RestaurantCategory showItems={index === showIndex ? true: false} key={item.id} data={item} setShowIndex={()=> setShowIndex(index)}/>)}
        </ul>
        </div>
}

export default RestaurantMenu;