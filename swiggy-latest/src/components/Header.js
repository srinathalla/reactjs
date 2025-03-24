import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Header = () => {

    const [loginBtnName, setLoginBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const {loggedInUser} = useContext(UserContext);

    return (
      <div className='flex justify-between bg-pink-100'>
        <div className='logo- container'>
          <img className="w-56" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png?size=large"></img>
        </div>
        <div className='flex items-center'>
          <ul className="flex p-4 m-4">
            <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
            <li className="px-4"><Link to="/">Home</Link></li>
            <li className="px-4"><Link to="/about">About Us</Link></li>
            <li className="px-4"><Link to="/contact">Contact Us</Link></li>
            <li className="px-4"><Link to="/grocery">Grocery</Link></li>
            <li className="px-4">Cart</li>
            <button className="px-4" onClick={()=> setLoginBtnName(loginBtnName ==="Login" ? "Logout" : "Login")}> {loginBtnName}
            </button>
            <li>loggedInUser</li>
          </ul>
        </div>
      </div>
    );
  }

  export default Header;