import { useDispatch, useStore } from "../stores/CartStore";

const useCart = () => {
  const { items } = useStore();
  const dispatch = useDispatch();
 	
 	const deliveryFee = 25;

  return {
  	items,
  	deliveryFee,
  	clearCart: dispatch.curry('CLEAR_CART'),
  	getTotal: () => items.reduce((alloc, e) => alloc + e.price * (e.quantity || 1), 0)
  }
};

export default useCart;
