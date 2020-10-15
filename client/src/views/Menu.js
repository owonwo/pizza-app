import React from "react";
import { FAKE_PIZZA_IMAGE_URL } from "../libs/data/constants";
import PizzaCard from "../components/PizzaCard";
import Layout from "./Layout";
import useCart from '../hooks/useCart'
import { H1, P } from "@wigxel/react-components/lib/typography";
import { PizzaFactory } from '../libs/factories';

export const Menu = () => {
  useCart();

  return (
    <Layout>
      <div className="py-8 flex-1 px-2">
        <H1 bold className="mb-2 px-4">
          Order Now.
        </H1>
        {/* <P>Will be delivered before you know it</P> */}
        {/* <P>Browse and Add to Cart. To get started.</P> */}
        <P className="-mt-4 w-5/6 px-4">
          Click <i>Add to Cart</i> when you see what you like.
        </P>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 w-full mt-4">
          {Array(30)
            .fill({
              price: 50.23,
              name: "Something Pizza",
              image: FAKE_PIZZA_IMAGE_URL,
            })
            .map(PizzaFactory)
            .map((e) => {
              return <PizzaCard {...e} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
