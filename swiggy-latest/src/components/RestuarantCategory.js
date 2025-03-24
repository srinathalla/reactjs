import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantCategory = ({data,showItems,setShowIndex}) =>
{
  
    const handleClick= () =>
    {
        //setShowItems(!showItems);
        setShowIndex();
    }
    return  (<div>
        <div className="w-6/12 my-4 mx-auto bg-gray-50">
            <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                <span className="font-bold text-lg">{data.title} ({data.cards.length})</span>
                <span>⬇️</span>
            </div>
            {showItems && <ItemList items= {data.cards}></ItemList>}
        </div>
        <div>

        </div>
        
    </div>);
}


export default RestaurantCategory;