import React from "react";
import { Component } from "react";

class Calculator extends Component {
  state = {
    data: "",
    buttons: [
      ["clear", "*", "/"],
      [7, 8, 9, "-"],
      [4, 5, 6, "+"],
      [1, 2, 3, "="]
    ]
  };

  calculate = e => {
    let input = e.currentTarget;

    if (input.value === "=") {
      this.computeValue();
      return;
    }

    let { data } = this.state;
    data = input.value === "clear" ? "" : data + input.value;
    this.setState({ data });
  };

  computeValue = e => {
    let { data } = this.state;
    let prev = 0,
      curr = 0,
      prevop = "";

    for (let i = 0; i < data.length; i++) {
      let ch = data.charAt(i);
      if (ch === "+" || ch === "-" || ch === "*" || ch === "/") {
        if (prevop !== "") {
          curr = this.operate(prev, curr, prevop);
        }
        prev = curr;
        curr = 0;
        prevop = ch;
      } else if (ch >= "0" && ch <= "9") {
        curr = curr * 10 + parseInt(ch);
      }
    }
    let value = this.operate(prev, curr, prevop);
    this.setState({ data: value });
  };

  operate = (a, b, op) => {
    if (op === "+") {
      return a + b;
    }
    if (op === "-") {
      return a - b;
    }
    if (op === "*") {
      return a * b;
    }
    if (op === "/") {
      return a / b;
    }
  };

  render() {
    const { data, buttons } = this.state;

    return (
      <div className="container div ">
        <h1> Calculator</h1>
        <div className="row row1">
          <input
            className="input"
            type="text"
            autoFocus
            value={data}
            name="data"
          />
        </div>
        {buttons.map(bg => (
          <div className="row row1">
            {bg.map(button => (
              <button
                className="button"
                style={{ width: button === "clear" ? "40%" : "20%" }}
                type="button"
                name={button}
                value={button}
                onClick={this.calculate}
              >
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Calculator;
