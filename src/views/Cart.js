import React from "react";
import Layout from "./Layout";
import useCart from '../hooks/useCart';
import { useHistory } from 'react-router-dom';
import { Button } from '@wigxel/react-components/lib/buttons';
import { MinusCircle, PlusCircle, Trash, ArrowLeft } from "react-feather";
import { H1, H3, P } from "@wigxel/react-components/lib/typography";
import { useDispatch, actions } from "../stores/CartStore";

// TODO: Notification Stack. 
// Show Notification when a user adds an item to the cart
export const Cart = () => {
	const history = useHistory();
  const { items, getTotal } = useCart()
  const total = getTotal();

  return (
    <Layout>
      <div className="py-8 flex-1 px-4">
      	<button className="text-xs lg:-ml-24"
      		onClick={() => history.push('/')}>
      		<ArrowLeft /> MENU
      	</button>

        <H1 bold className="mb-0">
          Cart
        </H1>

        {/**<P className="-mt-2">Select Quantity and Checkout.</P>**/}
        <P className="-mt-2">
	        {items.length > 1 ? 
	        		<React.Fragment>They are <b>{items.length || 0}</b> Pizza in Cart.</React.Fragment>
	        		: items.length > 0 ? <React.Fragment>You only have <b>{items.length}</b> type of Pizza in Cart.</React.Fragment>
	        			: 'No Pizza in Cart.'
	        }
        </P>
        <br/>
        <div className="py-2 lg:w-1/2 lg:-ml-6">
          {items.map((e, idx) => (
          	<CartItem {...e} key={idx} index={idx} />
          ))}
        </div>
        <div className="flex justify-between items-start select-none border-t border-b border-mix py-4">
        	<div>
        		<H3>Total Billing</H3>
        	</div>
        	<div className="text-right">
        		<H3 bold>$ {(total).toFixed(2)}</H3>
        	</div>
        </div>
       	 <div className="flex justify-end py-4">
        	<Button
        		primary
        		disabled={items.length === 0}
        		onClick={() => history.push('/shipping')}
	        		// IconRight={<ArrowRight size={20} className="ml-4"/>}>
	        		>
	        		Proceed to Checkout
	        	</Button>
	       </div>
      </div>
    </Layout>
  );
};

const CartItem = (e) => {
	const dispatch = useDispatch();
	const quantity = e.quantity || 1;

	const setQuantity = (quantity) => dispatch({
		type: actions.SET_ITEM_QUANTITY,
		itemIndex: e.index,
		quantity: quantity
	})

	const removeItem = () => {
			dispatch({
				type: actions.REMOVE_ITEM,
				payload: e.getId()
			})
	}

	return (
		<div className="flex mb-4 w-full relative">
			<b className="pt-4 w-8 hidden lg:inline-block">{e.index + 1}.</b>

    	<figure>
    		<img 
    			src={e.image} 
    			className="w-24 h-24 rounded-lg p-2 bg-mix" 
    			alt={e.name} />
    	</figure>

    	<section className="px-4 flex-1 flex flex-col justify-between">
      	<h1 className="text-lg">{e.name}</h1>
        <span>
          $ {e.price}  &nbsp;/  &nbsp;<span className="opacity-50">${Number(e.price * quantity).toFixed(2)}</span>
        </span>
        <button className="inline-flex  items-center outline-none text-sm hover:text-red self-start mt-4"
        	onClick={removeItem}>
      		<Trash size={15} /> &nbsp; REMOVE
      	</button>
        <Quantity value={+quantity}
        	onIncrement={() => setQuantity(quantity + 1)}
        	onDecrement={() => quantity >= 2 ? setQuantity(quantity - 1) : removeItem()}
        	/>
      </section>
    </div>
  )
}

const Quantity = (props) => {
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

export default Cart;
