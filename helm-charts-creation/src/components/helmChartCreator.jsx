import React, { Component } from "react";
import { parseApplicationYaml, generateHelmYamls } from "../utils/yamlParser";

class HelmChartCreator extends Component {
  state = {
    currentTab: "application",
    tabs: ["application", "env", "configmap", "deployment", "values", "Chart"],
    yamlData: {},
  };

  generate = (application) => {
    const { env, values, configmap, deployment } = generateHelmYamls(
      application
    );

    this.setState({
      yamlData: {
        ...this.state.yamlData,
        application,
        env,
        values,
        configmap,
        deployment,
      },
    });
  };

  handleYamlChange = (event) => {
    //console.log(event.currentTarget.id);
    let textAreaId = event.currentTarget.id;
    if (textAreaId == "applicationTextarea") {
      this.generate(event.target.value);
    } else {
      let tabId = textAreaId.substring(
        0,
        textAreaId.length - "textarea".length
      );

      let yamlData = { ...this.state.yamlData };
      yamlData[tabId] = event.target.value;

      this.setState({
        yamlData,
      });
    }
  };

  handleTabClick = (e) => {
    this.setState({ currentTab: e.currentTarget.id });
  };

  handleFileChosen = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      let application = fileReader.result;
      this.generate(application);
    };
    fileReader.readAsText(file);
  };

  render() {
    let { currentTab, tabs } = this.state;

    return (
      <div className="container">
        <div className="form-group">
          <ul className="nav nav-tabs">
            {tabs &&
              tabs.map((tab) => (
                <li
                  key={tab}
                  id={tab}
                  className="nav-item"
                  onClick={this.handleTabClick}
                >
                  <a
                    className={
                      currentTab == tab ? "nav-link active" : "nav-link"
                    }
                    href="#"
                  >
                    {tab + ".yaml"}
                  </a>
                </li>
              ))}
          </ul>
          {tabs &&
            tabs.map((tab) => (
              <div id={tab + "_container"} key={tab + "_container"}>
                <textarea
                  className="text-area form-control"
                  id={tab + "Textarea"}
                  key={tab + "Textarea"}
                  value={this.state.yamlData[tab]}
                  onChange={this.handleYamlChange}
                  rows="10"
                  hidden={tab !== currentTab}
                ></textarea>
              </div>
            ))}
          <input
            type="file"
            text="Upload yaml"
            className="form-control-file"
            id="applicationYaml"
            hidden={currentTab !== "application"}
            onChange={(e) => this.handleFileChosen(e.target.files[0])}
          ></input>
        </div>
      </div>
    );
  }
}

export default HelmChartCreator;
