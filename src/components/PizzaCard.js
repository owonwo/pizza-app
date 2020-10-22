import React from "react";
import { P } from "@wigxel/react-components/lib/typography";
import styled from "styled-components";
import HideReveal from "./Typography/HideReveal";
import { useDispatch } from "../stores/CartStore";
import { Check, Plus } from "react-feather";
import Quantity from './Quantity'
import useCurrency from '../hooks/useCurrency';
import useCart from '../hooks/useCart';

const setColor = props => props.theme.colors._3 || '#333';

const StyledCard = styled.div`
  .in-cart {
  	color: ${setColor};
  	border-color: ${setColor};
  }

  .price-tag {
  	color: ${setColor};
  }

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
  const { inCart } = useCart();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = React.useState(1);

  return (
    <StyledCard className=" p-2 relative cursor-pointer flex flex-col">
      <figure className="h-64 flex-shrink-0 overflow-hidden bg-gray-200 rounded-xl relative w-full">
        <img
          src={props.image}
          alt={props.name}
          className="w-full object-cover h-full absolute top-0 right-0 bottom-0 left-0"
        />
      </figure>
      <div className="mt-2 flex-1 flex flex-col justify-between">
      	<div>
	        <P>
	          <b>{props.name}</b>
	        </P>
	        <p className="text-sm mb-2">
	        	{props.description}
	        </p>
        </div>
        <div className="flex flex-col">
        	<div className="flex justify-between items-center my-2">
	          <P className="font-bold price-tag text-xl">{formatPrice(props.price)}</P>
	          <Quantity 
	          	value={quantity}
	          	onIncrement={() => setQuantity(quantity + 1)}
	          	onDecrement={() => quantity >= 2 && setQuantity(quantity - 1)} />
          </div>
          {inCart(props.getId()) ? (
            <span className="in-cart w-full md:w-auto border py-2 px-2 flex items-center justify-center rounded-lg">
              <Check size={15} /> <span className="ml-2">Added</span>
            </span>
          ) : (
            <button
              className="outline-none w-full md:w-auto flex items-center justify-center  border px-2 py-2 border-mix rounded-lg
              	hover:border-gray-800"
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { ...props, quantity },
                });
              	setQuantity(1)
              }}
            >
              <Plus size={15} className="mr-2" /> <HideReveal text="Add To Cart" />
            </button>
          )}
        </div>
      </div>
    </StyledCard>
  );
};

export default PizzaCard;
