import React, { useState } from "react";
import { ReactLottieConfig, Lottie } from "@crello/react-lottie";
import animationData from "./winner.json";

export const Animation = ( props ) => {
  
  return (
    <div id={ props.id }>
      <Lottie
        width="350px"
        height="350px"
        className="lottie-container basic"
        config={{ animationData: animationData, loop: true, autoplay: true }}
      />
    </div>
  );
};
