import { REST_IMG_URL } from "../utils/const";
const ItemList = ({items}) =>
{
    return (
        <div> 
                {items.map(item => 
                <div key={item.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"> 
                   <div className="w-9/12"> 
                        <div className="py-2">
                            <span>{item.name}</span>
                            <span>- ₹ {item.price}</span>
                        </div>
                        <p className="text-xs"> {item.description}</p>
                    </div>
                    <div className="w-3/12 p-4">
                        <div className="absolute">
                            <button className="p-2 bg-black text-white shadow-lg"> Add +</button>
                        </div>
                        <img src={REST_IMG_URL} className="w-full"></img>
                        
                    </div>
                </div>
                 )}
        </div>

    );
}

export default ItemList;