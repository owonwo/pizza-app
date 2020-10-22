import { parseISO, formatDistance } from 'date-fns';

export const PizzaFactory = (props) => {
  return {
    id: props.id,
  	getId() {
  		return this.id;
  	},
    ...props,
  };
};
 
export const OrderFactory = (props) => {
	return {
		toNow(){
			return formatDistance(parseISO(this.created_at), new Date(), { addSuffix: true })
		},
		...props
	}
}