import React from 'react';
import './Item.css';
import ItemCount from '../ItemCount/ItemCount.js';

const formatoNumero = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'USD',
});

const Item = ({ item }) => {
  return (
    <div className='cardProducto'>
      <img className='cardImage' src={item.thumbnail} alt={item.title} />
      <h2 className='name'>{item.title}</h2>
      <h3 className='price'>{formatoNumero.format(item.price)}</h3>
      <h3 className='code'>{item.code}</h3>
      <ItemCount initial={0} stock={item.stock} item={item} />
      <h4 className='stock'>Stock: {item.stock} Unidades</h4>
    </div>
  );
};

export default Item;
