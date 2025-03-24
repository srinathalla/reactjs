import { REST_IMG_URL } from "../utils/const";
const RestaurantCard = (props) =>
    {
      const {resObj} = props;
      return (
        <div className='m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200'>
          <img className="rounded-lg" src={REST_IMG_URL}></img>
          <h3 className="font-bold py-4 text-lg">{resObj.name}</h3>
          <h4>{resObj.cuisine}</h4>
          <h4>{resObj.rating} stars</h4>
          <h4>{resObj.deliveryTime}</h4>
    
        </div>
      );
    }

    export const withPromotedLabel = (RestaurantCard) =>
    {
      return (props) => {
        return (
          <div>
            <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
            <RestaurantCard {...props}/>
          </div>
        )

      }
    }


    export default RestaurantCard;