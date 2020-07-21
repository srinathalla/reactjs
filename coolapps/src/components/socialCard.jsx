import React, { Component } from "react";

class SocialCard extends Component {
  render() {
    return (
      <div className="card" style={{ width: "22.5rem" }}>
        <img
          style={{ height: "100px", width: "100px" }}
          src="../images/sunny2.png"
          alt="Card image cap"
        />
        <div className="card-body">
          <h2 className="card-title">Card title</h2>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  }
}

export default SocialCard;
