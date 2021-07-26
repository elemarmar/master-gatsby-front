import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import formatMoney from '../utils/formatMoney';
import PizzasPage from './pizzas';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calcualteOrderTotal from '../utils/calculateOrderTotal';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });
  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="orders" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            id="mapleSyrup"
            type="text"
            name="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calcualteOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
