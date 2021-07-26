import calculatePizzaPrice from './calculatePizzaPrice';

export default function calcualteOrderTotal(order, pizzas) {
  // Loop over each item in the order
  const total = order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  // Calc total for that pizza
  // Add total to the running total
  return total;
}
