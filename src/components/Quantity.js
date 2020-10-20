import React from 'react';
import { MinusCircle, PlusCircle } from 'react-feather';

export const Quantity = (props) => {
	return (
		<span className="inline-flex self-end py-2">

      <button type="button" aria-label="Decrement Quantity"
      	className={props.value === 1 && 'opacity-50'} onClick={props.onDecrement}>
        <MinusCircle />
      </button>

      <span className="px-4">{props.value}</span>

      <button type="button" aria-label="Increment Quantity"  onClick={props.onIncrement}>
        <PlusCircle />
      </button>

    </span>
  )
}

export default Quantity;