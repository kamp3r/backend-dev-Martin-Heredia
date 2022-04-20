import React, { useState, useEffect } from "react";
import "./ItemCount.css";
import axios from 'axios'

const ItemCount = ({ initial, stock}) => {
  const [elementos, setElementos] = useState(initial);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [disabledSuma, setDisabledSuma] = useState(false);
  const [disabledResta, setDisabledResta] = useState(false);

  useEffect(() => {
    if (elementos > initial || stock < elementos) {
      setDisabledResta(false);
      setDisabledSuma(false);
      setDisabledAdd(false);
    } else if (elementos <= initial) {
      setDisabledResta(true);
      setDisabledAdd(true);
    }
    if (elementos >= stock) {
      setDisabledSuma(true);
    }
  }, [elementos, initial, stock]);

  const suma = () => {
    setElementos(elementos + 1);
  };
  const resta = () => {
    setElementos(elementos - 1);
  };

  const crearCarrito = () =>{
    axios.post('http://localhost:8080/api/carrito/')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  
  const agregarItem = () =>{
    axios.post('http://localhost:8080/api/carrito/')
      .then(res => console.log(res.data.products))
      .catch(err => console.log(err))
  }

  return (
    <div className="itemCount">
      <div className="containerButtons">
        <button
          onClick={resta}
          disabled={disabledResta}
          className="decremento ButtCount"
        >
          <i className="fas fa-minus"></i>
        </button>
        <button className="numeroSeleccionado">{elementos}</button>
        <button
          onClick={suma}
          disabled={disabledSuma}
          className="aumento ButtCount"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <button className="agregarItem" onClick={()=>{crearCarrito(); agregarItem()}} disabled={disabledAdd} >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
