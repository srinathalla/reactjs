import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import {resList} from "../utils/const";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";



export const Body = () => {

  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


  useEffect(()=> {
   fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch("http://localhost:8080/restaurants");
    const json = await data.json();
    setListOfRestaurants(json?.data);
    setFilteredListOfRestaurants(json?.data);
  }

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
  {
    return <h1>Looks like you are offline, 
      please check your internet connection</h1>
  }
  
  if(listOfRestaurants.length === 0)
  {
    return (<Shimmer/>);
  }
 

  return (
      <div className='body'>
        <div className='flex'>
          <div className="search m-4 p-4">
            <input
              className="border border-s border-b" 
              type="text" 
              onChange={(e) => {setSearchText(e.target.value)}} 
              value={searchText} />
            <button className= "px-4 py-2 bg-green-100 m-4 rounded-lg" onClick = {() => 
            {
              const filteredList = listOfRestaurants.filter(res=> res.name.toLowerCase().includes(searchText.toLowerCase()));
              setFilteredListOfRestaurants(filteredList);
            
            }}>Search</button>
          </div>
          <div className="search m-4 p-4 flex items-center rounded-lg"> 
            <button className="px-4 py-2 bg-gray-50" onClick = {() => 
          {
            const filteredList = listOfRestaurants.filter(res=> res.rating > 4);
            setFilteredListOfRestaurants(filteredList);
          }

          }>Top Rated Restaurants</button></div>
         
        </div>
        <div className='flex flex-wrap'>
          {
            filteredListOfRestaurants.map(restaurant => 
            <Link key={restaurant.id} to={"/restaurants/" + restaurant.id}>
              
              {
                restaurant.promoted ? 
                <RestaurantCardPromoted resObj={restaurant}/>:
                <RestaurantCard  resObj={restaurant}/>
              }
             
              </Link>
            )
          }
          
          
        </div>
      </div>
    );
  }

export default Body;