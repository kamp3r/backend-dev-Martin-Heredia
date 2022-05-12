import React, { useState, useEffect } from 'react';
import Spinnerx from '../Spinner/Spinnerx';
import axios from 'axios'
import ItemList from '../ItemList/ItemList';

const ItemListContainer = () => {
  const [item, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();  
    }, 2000);
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true)
    axios
      .get('http://localhost:8080/api/products')
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
      setIsLoading(false)
  }

  return (
    <>
      <div className='ListContainer'>
        <div className='containerElement'>
          {isLoading ? <Spinnerx /> : <ItemList items={item} />}
        </div>
      </div>
    </>
  );
};

export default ItemListContainer;
