import React, { Component } from "react";

export default class RpsScaling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rps_low_watermark: 0,
      rps_high_watermark: 0,
      rps_max_throughput: 0,
      expected_rpm: 0,
      show_formula: false,
      formula:
        "(rps_max_throughput * 60) * (((7*rps_high_watermark) + rps_low_watermark) / 8) / 100",
    };
  }

  calculate = (event) => {
    let { rps_low_watermark, rps_high_watermark, rps_max_throughput } = {
      ...this.state,
    };

    rps_low_watermark = Number(rps_low_watermark);
    rps_high_watermark = Number(rps_high_watermark);
    rps_max_throughput = Number(rps_max_throughput);
    const expected_rpm =
      (rps_max_throughput *
        60 *
        ((7 * rps_high_watermark + rps_low_watermark) / 8)) /
      100;

    this.setState({
      rps_low_watermark,
      rps_high_watermark,
      rps_max_throughput,
      expected_rpm,
    });
  };

  render() {
    let {
      rps_low_watermark,
      rps_high_watermark,
      rps_max_throughput,
      expected_rpm,
      show_formula,
      formula,
    } = this.state;

    return (
      <div className="container">
        <h1>Rps Based Scaling</h1>
        <label>
          rps_low_watermark :
          <input
            type="text"
            value={rps_low_watermark}
            name="rps_low_watermark"
            id="rps_low_watermark"
            onChange={(e) =>
              this.setState({ rps_low_watermark: e.target.value })
            }
          />
        </label>
        <label>
          rps_high_watermark :
          <input
            type="text"
            value={rps_high_watermark}
            name="rps_high_watermark"
            id="rps_high_watermark"
            onChange={(e) =>
              this.setState({ rps_high_watermark: e.target.value })
            }
          />
        </label>
        <label>
          rps_max_throughput :
          <input
            type="text"
            value={rps_max_throughput}
            name="rps_max_throughput"
            id="rps_max_throughput"
            onChange={(e) =>
              this.setState({ rps_max_throughput: e.target.value })
            }
          />
        </label>
        {expected_rpm > 0 && (
          <label>
            rpm_at_which_autoscaling_triggers :{" "}
            {expected_rpm + " (" + expected_rpm / 1000 + "k)"}
          </label>
        )}
        <label>
          <input
            type="checkbox"
            id="show_formula"
            name="show_formula"
            value="show_formula"
            checked={show_formula}
            onChange={(e) => this.setState({ show_formula: !show_formula })}
          />
          show_formula
        </label>
        {show_formula && (
          <label>
            formula_used:
            <textarea value={formula} readOnly />
          </label>
        )}

        <button className="button" onClick={this.calculate}>
          Calculate
        </button>
      </div>
    );
  }
}
