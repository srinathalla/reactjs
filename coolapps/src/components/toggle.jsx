import React from "react";
import { Component } from "react";

class Toggle extends Component {
  state = {
    visible: false
  };

  toggle = e => {
    let show = !this.state.visible;
    this.setState({ visible: show });
  };
  render() {
    return (
      <div>
        <button name="showDetails" onClick={this.toggle}>
          Show details
        </button>
        {this.state.visible && <p> I am Sri</p>}
      </div>
    );
  }
}

export default Toggle;
