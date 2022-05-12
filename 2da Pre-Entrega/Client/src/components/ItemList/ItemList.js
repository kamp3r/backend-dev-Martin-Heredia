import React from "react";
import "./ItemList.css";
import Item from "../Item/Item";

const ItemList = ({ items }) => {
  return (
    <div className="grillaProductos">
      {items.map((item) => {
        return <Item item={item} key={item._id || item.id} />;
      })}
    </div>
  );
};

export default ItemList;
