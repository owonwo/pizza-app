export const PizzaFactory = (props, idx) => {
  return {
  	getId() {
  		return this.$$index;
  	},
    id: Symbol("pizza"),
    $$index: "pizza.item--" + idx,
    ...props,
  };
};