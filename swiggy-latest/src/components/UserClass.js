import React from "react";
import User from "./User";
class UserClass extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            userInfo :{
                name : "dummy",
                location: "default",
                avatar_url: ""
            }
        };
    }

    async componentDidMount()
    {
        const data = await fetch("https://api.github.com/users/srinathalla")
        const json = await data.json();
        this.setState({
            userInfo: json,
        });
    }
    render ()
    {
        const {name,location,avatar_url} = this.state.userInfo;

        return <div className="user-card">
                <img src={avatar_url}></img>
                <h2>Name : {name}</h2>
                <h3>Location : {location}</h3>
                <h4>Conatct @srinathb10j.ik</h4>
               </div>
    }
}

export default UserClass;