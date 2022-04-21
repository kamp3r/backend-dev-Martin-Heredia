import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    const getDataCart = async () => {
      const data = [];
      await axios
        .get('http://localhost:8080/api/carrito/2/productos')
        .then((res) => data.push({ ...res.data, id: res.data.id }))
        .catch((err) => console.log(err));
      setCart(data);
    };
    getDataCart();
  }, []);

  console.log(cart)

  return (
    <>
      <div className='cart'>
        <div className='cart-header'>
          <h1>Carrito</h1>
        </div>
        <div className='cart-body'>
          {cart.map((basket) => (
            <div key={basket.id} className='cart-item'>
              {basket.products.map((item) => (
                <div key={item.id} className='cart-item-body'>
                  <div className='cart-item-img'>
                    <img src={item.thumbnail} alt='producto' />
                  </div>
                  <div className='cart-item-info'>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
