import React from "react";
import styled from "styled-components";

const Style = styled.div`
  overflow: hidden;
  position: relative;

  span,
  &::after {
    transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
  }

  > span {
    display: inline-block;
    transform: translateY(0%);
  }

  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: currentColor;
    transform: translateY(100%);
  }

  &:hover {
    > span {
      transform: translateY(-100%);
    }

    &::after {
      transform: translateY(0%);
    }
  }
`;

const HideReveal = (props) => {
  return (
    <Style data-text={props.text}>
      <span>{props.text}</span>
    </Style>
  );
};

export default HideReveal;
