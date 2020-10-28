import React from "react";
import Layout from "./Layout";
import Preloader from '../components/Preloader';
import PizzaCard from "../components/PizzaCard";
import { H1, P } from "@wigxel/react-components/lib/typography";
import { useProducts } from '../hooks/useProducts';

export const Menu = () => {
	const { products: pizzas = [], loading = false } = useProducts();

  return (
    <Layout>
      <div className="py-8 flex-1 px-2">
      	<section className="px-4">
	        <H1 bold className="mb-2">
	          Order Now.
	        </H1>
	        <P className="-mt-4 w-5/6">
	          Click <i>Add to Cart</i> when you see what you like.
	        </P>
	        {loading && <div className="py-4">
	        	<Preloader size={40} />
	        </div>}
        </section>
        <div className="grid grid-cols-2 col-gap-4 row-gap-6 lg:grid-cols-4 lg:gap-6 w-full mt-4">
          {pizzas
            .map((e) => {
              return <PizzaCard key={e.getId()} {...e} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
