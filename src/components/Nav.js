import React from 'react';
import { Link, navigate } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="orders">Order Ahead!</Link>
        </li>
      </ul>
    </nav>
  );
}
