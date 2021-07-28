import React from "react";
import { TitleWrapper } from "./Title.styled.js";
const Title = ({ title, subtitle }) => {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </TitleWrapper>
  );
};

export default Title;
