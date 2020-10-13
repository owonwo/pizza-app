import styled from "styled-components";

const LinearLoader = styled.div`
  @keyframes tofro {
    0% {
      left: 0;
      right: 100%;
    }
    50% {
      left: 30%;
      right: 30%;
    }
    100% {
      left: 100%;
      right: 0%;
    }
  }
`;

const Loader = styled.div`
  position: relative;
  width: 100%;

  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 7px;
    content: "";
  }

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    height: 1px;
    left: 0;
    right: 100%;
    background-color: var(--color-8);
    animation: tofro 2s infinite running linear;
  }
`;
LinearLoader.Loader = Loader;

export default LinearLoader;
