import React from "react";
import { P } from "@wigxel/react-components/lib/typography";
import styled from "styled-components";
import HideReveal from "./Typography/HideReveal";
import { useDispatch, useStore } from "../stores/CartStore";
import { Check } from "react-feather";

const StyledCard = styled.div`
  figure {
    img {
      transition: all 0.3s ease-in 0.15s;
    }
  }

  &:hover figure img {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const PizzaCard = (props) => {
  const dispatch = useDispatch();
  const { items = [] } = useStore();

  const inCart = items.findIndex((a) => a.getId() === props.getId()) !== -1;

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
          <P className="font-bold text-primary">$ {props.price}</P>

          {inCart ? (
            <span className="text-green-400 flex items-center">
              <Check size={15} /> <span className="ml-2">Added</span>
            </span>
          ) : (
            <button
              className="outline-none"
              onClick={() => {
                console.log("Adding to Cart");
                dispatch({
                  type: "ADD_TO_CART",
                  payload: props,
                });
              }}
            >
              <HideReveal text="Add To Cart" />
            </button>
          )}
        </div>
      </div>
    </StyledCard>
  );
};

export default PizzaCard;
