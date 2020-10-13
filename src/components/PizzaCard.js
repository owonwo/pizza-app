import React from "react";
import { P } from "@wigxel/react-components/lib/typography";
import styled from "styled-components";
import HideReveal from "./Typography/HideReveal";
import { useDispatch } from "../stores/CartStore";

const StyledCard = styled.div`
  figure {
    img {
      transition: all 0.3s ease-in 0.15s;
    }
  }

  &:hover img {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const PizzaCard = (props) => {
  const dispatch = useDispatch();

  return (
    <StyledCard className=" p-2 relative cursor-pointer">
      <figure className="h-64 overflow-hidden bg-gray-200 rounded-xl relative w-full">
        <img
          src={props.image}
          alt={props.name}
          className="w-full object-cover h-full absolute top-0 right-0 bottom-0 left-0"
        />
      </figure>
      <div className="mt-2">
        <P>
          <b>{props.name}</b>
        </P>
        <div className="flex justify-between">
          <P>$ 10.20</P>
          <button
            className="outline-none"
            onClick={() => {
              console.log("Adding to Cart");
              dispatch({
                type: "ADD_TO_CART",
                payload: props.id,
              });
            }}
          >
            <HideReveal text="Add To Cart" />
          </button>
        </div>
      </div>
    </StyledCard>
  );
};

export default PizzaCard;
