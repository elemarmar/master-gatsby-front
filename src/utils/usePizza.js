import { format } from 'prettier';
import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attatchNamesAndPrices';
import calcualteOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // state is up in the provider, we access both state and updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Make function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // funciton that runs when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calcualteOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    // 4. Send this data to a serverless function when they checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    // parse response
    const text = JSON.parse(await res.text());

    // Check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down for your pizza!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
