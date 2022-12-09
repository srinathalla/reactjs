import React, { Component } from "react";

import "../css/Scaling.css";
import CpuScaling from "./CpuScaling";
import RpsScaling from "./RpsScaling";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";

export default class Scaling extends Component {
  render() {
    let component;

    switch (window.location.pathname) {
      case "/cpu":
        component = <CpuScaling />;
        break;
      case "/rps":
        component = <RpsScaling />;
        break;
      case "/":
        component = <RpsScaling />;
        break;
    }
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<CpuScaling />}></Route>
          <Route path="/rps" element={<RpsScaling />}></Route>
          <Route path="/cpu" element={<CpuScaling />}></Route>
        </Routes>
      </>
    );
  }
}
