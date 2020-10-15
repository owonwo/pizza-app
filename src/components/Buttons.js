import React from "react";
import styled, { css } from "@wigxel/react-components";

const ToggleButtonStyle = styled.button`
	&:focus { outline: none; }

  span {
    height: 1px;
    width: 35px;
    display: block;
    border-radius: 30px;
    margin-bottom: 5px;
    background: gray;
    transition: 0.2s ease-in;
    transform-origin: center center;

	  ${props => props.state && css`
	  	height: 2px;
	  	background-color: dodgerblue;
	  `}
  }
`;

const XToggleButtonStyle = styled(ToggleButtonStyle)`
 ${props =>
    props.state &&
    css`
      span {
        margin: 0;
      }
      span:not(:last-child):not(:first-child) {
        opacity: 0;
      }
      span:first-child {
        transform: rotate(45deg);
      }
      span:last-child {
        margin-: 10px;
        transform-origin: bottom left;
        transform: rotate(-45deg) translate(-3px, 9px);
      }
    `}
`

export const XToggleButton = ({ state, onClick }) => (
  <XToggleButtonStyle state={state} className="ml-3 w-12 h-12" onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
  </XToggleButtonStyle>
);

export const ToggleButton = ({ state, onClick }) => (
  <ToggleButtonStyle state={state} className="ml-3" onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
  </ToggleButtonStyle>
);

const TabStyle = styled.div`
  .count-badge {
    color: white;
    border-radius: 30px;
    background-color: var(--red-color);
  }

  ${prop =>
    prop.isActive &&
    css`
      border-bottom: solid 4px var(--primary-color);

      span:first-child {
        font-weight: bold;
        color: var(--primary-color);
      }

      .count-badge {
        color: gray;
        background-color: transparent;
        opacity: 0.5;
      }
    `}
`;

export function Tab(props) {
  return (
    <TabStyle
      isActive={props.isActive}
      className="p-4 border-gray-200 border-r flex items-center text-sm"
    >
      <span>{props.children}</span>
      {props.count && (
        <span className="count-badge px-2 text-xs ml-2">{props.count}</span>
      )}
    </TabStyle>
  );
}

Tab.Holder = styled.div`
  display: flex;
  justify-content: start;
`;

export const Button = (props) => {
  const activeClass = !props.disabled ? 'bg-primary' : ' bg-gray-400';
  return <button 
  	{...props}
  	className={`${activeClass} inline-flex items-center text-white rounded-lg px-4 py-2 text-sm`}
  	>
    <span>{props.children}</span> {props.IconRight}
  </button>
};

const StyledThemeToggle = styled.button`
	overflow: hidden;
	border-radius: 50%;
	&:focus { outline: none; }

	&, &::after {
		background-color: lightblue;
		${props => !props.isDarkMode && css`
			background-color: orange;
		`}
		border-radius: 50%;
		height: 1.3rem;
		width: 1.3rem;
		transition: all .2s ease-in;
	}
	
	&::after {
		content: "";
		display: block;
		height: 90%;
		background-color: #333;
		transform: translate(-30%, -20%);

		${props => !props.isDarkMode && css`
			background-color: rgba(255, 255, 255);
			transform: translate(-50%, 0);
		`}
	}
`

export const ThemeToggle = (props) => {
	return (
		<StyledThemeToggle {...props} title="Toggle Dark Mode"/>
	)
}
