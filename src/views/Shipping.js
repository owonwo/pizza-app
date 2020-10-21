import React from 'react';
import * as R from 'ramda';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { trace } from '@wigxel/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@wigxel/react-components/lib/cards';
import { Labelled } from "@wigxel/react-components/lib/form";
import { Button } from '@wigxel/react-components/lib/buttons';
import { H2, H3, H4, P } from "@wigxel/react-components/lib/typography";
import { deliverySchema } from '../libs/validators';
import { showErrMessageIfAny } from '../components/FormHelpers';
import useCurrency from '../hooks/useCurrency';


import Layout from "./Layout";
import useCart from '../hooks/useCart';
import { useStore as useAuthStore } from '../stores/AuthStore';

const noDigits = (evt) => {
	if (evt.nativeEvent.code.includes("Digit")) return evt.preventDefault();
}

export default function Shipping () {
	const history = useHistory();
	const { user } = useAuthStore();
	const { toggle } = Modal.useModal();
	const { formatPrice } = useCurrency();
	const { items, deliveryFee, getTotal, clearCart } = useCart();

	const { register, errors, watch, setValue, formState } = useForm({
		resolver: yupResolver(deliverySchema),
		mode: "onChange",
		defaultValues: {
			// name: "John Snow",
			// email: "Joseph.owonwo@wigxel.io",
			// phone: "03203923",
			// zipcode: '209823',
			// delivery_address: "27 Kings Avenue, Porter Land, UK."
		}
	});
	
	// takes the user back to the Cart page
	//  if they are no items in the cart.
	if (items.length === 0)
		(history.length === 2)
			? history.replace('/cart') 
			: history.goBack('');

	const total = getTotal();

	const makeOrderRequest = (formData) => {
		console.log('Shipping Info', formData)
		toggle('order-placed');
		// clearCart();
	}

	React.useEffect(() => {
		R.compose(
			R.map(([key, value], idx) => setValue(key, value, false)),
			R.toPairs,
			R.pick(['name', 'email', 'phone']),
		)(user || { })
	}, [setValue, user]);


	return <Layout>
		<div className="py-8">
			<form className="grid grid-cols-1 gap-2 w-full lg:w-1/2 px-4">
				<H2 bold>Checkout</H2>
				<P className="pb-8 -mt-2">Enter Checkout Information below.</P>

				<Labelled.Input ref={register} type="text" fullwidth name="name" label="Full Name •" placeholder="John Snow" 
					onKeyDown={noDigits}
					message={showErrMessageIfAny('name', errors)}/>
				<Labelled.Input ref={register} type="text" fullwidth name="email" label="Email Address •" placeholder="john.snow@domain.com"
					onKeyDown={noDigits} 
					inputmode="email"
					message={showErrMessageIfAny('email', errors)}/>
				<Labelled.Number ref={register} type="number" fullwidth name="phone" 
					label="Phone Number •" 
					placeholder="+ 20 398 2039"
					inputmode="tel"
					style={{ textAlign: "left" }}
					message={showErrMessageIfAny('phone', errors)}
					/>
					<Labelled.Number ref={register} type="number" fullwidth name="zipcode" 
					label="ZIP Code •" 
					placeholder="500238"
					inputmode="tel"
					style={{ textAlign: "left" }}
					message={showErrMessageIfAny('phone', errors)}
					/>
				<div  fullwidth className="pt-1" />
				<Labelled.Textarea ref={register} fullwidth name="delivery_address" label="Delivery Address •" 
					placeholder="Enter your full address here." 
					message={showErrMessageIfAny('delivery_address', errors)}
					/>
				<div className="mt-4">
				</div>
			</form>
			<div className="w-full lg:w-1/2 px-4">
				<H4 bold>Order Information</H4>

				<div className="flex justify-between items-start select-none border-t border-b border-gray-200 py-4 mb-4">
        	<div>
        		<div>Total Cost</div>
        		<div>Delivery Fee</div>
        		<H3>Total Billing</H3>
        	</div>
        	<div className="text-right">
        		<div>{formatPrice(total)}</div>
        		{watch('zipcode') ? <div>+ {formatPrice(deliveryFee)}</div> : "--"}
        		<H3 bold>{
        			watch('zipcode') ? 
        			formatPrice(total + deliveryFee)
        			: formatPrice(total) }</H3>
        	</div>
        </div>

				<Button 
					primary
      		className="w-full md:w-auto"
					disabled={!formState.isValid}
					onClick={makeOrderRequest}>
					<span className="text-lg">Confirm Order</span>
				</Button>
			</div>
		</div>

		<Modal name="order-placed" size="sm"
			onClose={() => {
				clearCart()	
			}}>
			<div className="py-12 w-5/6 mx-auto">
			<H3 bold className="text-center mb-4">Order Placed</H3>
			<P className="text-center text-sm mb-24">Your order was successfully placed. You should receive a corresponding email at {watch('email')}</P>
			<Button
				primary
				fullwidth
				onClick={() => {
					clearCart()
					history.push('/')
				}}>
				Go To Menu
			</Button>
			</div>
		</Modal>
	</Layout>
}
