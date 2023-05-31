import "../styles/Listings.css"

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const subtotal = count * 13000;

  return (
    <div className ="Coo1">
      <div className ="Listings-main-holding-counter">
      <button className="counter-button" onClick={() => setCount(count - 1)}>-</button>
      <span className="counter-button2" >{count}</span>
      <button className="counter-button" onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div className="Listing-main-Holding-Subtotal">
        <span>subtotal: </span>
        <span>{subtotal}</span>
      </div>
    </div>
  );
}

export default Counter;