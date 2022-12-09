import React, { Component } from "react";

export default class CpuScaling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpu_low_watermark: 0,
      cpu_high_watermark: 0,
      cpu_request: 4,
      target_cpu: 0,
      tolerance: 10,
      show_formula: false,
      formula:
        "((cpu_low_watermark + 7 * cpu_high_watermark) / 8) * cpu_request * 10",
    };
  }

  calculate = (event) => {
    let { cpu_low_watermark, cpu_high_watermark, cpu_request, target_cpu } = {
      ...this.state,
    };

    cpu_low_watermark = Number(cpu_low_watermark);
    cpu_high_watermark = Number(cpu_high_watermark);
    const cpuPercentile = (cpu_low_watermark + 7 * cpu_high_watermark) / 8;
    target_cpu = cpuPercentile * cpu_request * 10;

    this.setState({
      cpu_low_watermark,
      cpu_high_watermark,
      target_cpu,
    });
  };

  render() {
    let {
      cpu_low_watermark,
      cpu_high_watermark,
      cpu_request,
      target_cpu,
      tolerance,
      show_formula,
      formula,
    } = this.state;
    let target_cpu_with_tolerance = target_cpu + target_cpu / tolerance;
    return (
      <div className="container">
        <h1>Cpu Based Scaling</h1>
        <label>
          cpu_low_watermark :
          <input
            type="text"
            value={cpu_low_watermark}
            name="cpu_low_watermark"
            id="cpu_low_watermark"
            onChange={(e) =>
              this.setState({ cpu_low_watermark: e.target.value })
            }
          />
        </label>

        <label>
          cpu_high_watermark :
          <input
            type="text"
            value={cpu_high_watermark}
            name="cpu_high_watermark"
            id="cpu_high_watermark"
            onChange={(e) =>
              this.setState({ cpu_high_watermark: e.target.value })
            }
          />
        </label>
        <label>cpu_request : {cpu_request}</label>

        <label>tolerance : {tolerance + "%"}</label>
        {target_cpu > 0 && <label>target_cpu : {target_cpu + "m"}</label>}

        {target_cpu > 0 && (
          <label>
            target_cpu_with_tolerance : {target_cpu_with_tolerance + "m"}
          </label>
        )}
        {target_cpu > 0 && (
          <label>
            autoscaling triggers at cpu :
            {target_cpu_with_tolerance / (cpu_request * 10) + "% (per pod)"}
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

        <button onClick={this.calculate}>Calculate</button>
      </div>
    );
  }
}
