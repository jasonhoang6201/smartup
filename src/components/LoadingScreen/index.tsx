import React from "react";
import logo from "src/assets/images/logo.png";
import "./LoadingScreen.scss";
type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <div className="LoadingScreen">
      <div className="container">
        <img src={logo} width={300} height={200} />
      </div>
    </div>
  );
};

export default LoadingScreen;
