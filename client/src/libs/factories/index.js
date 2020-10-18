export const PizzaFactory = (props, idx) => {
  return {
  	getId() {
  		return this.id;
  	},
    id: props.id,
    $$index: "pizza.item--" + idx,
    ...props,
  };
};