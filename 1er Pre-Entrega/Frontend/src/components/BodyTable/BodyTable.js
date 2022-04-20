import React from 'react';

const formatoNumero = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  });

const bodyTable = (data) => {
  return (
    <div>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{formatoNumero.format(item.price)}</td>
            <td>
              <img src={item.thumbnail} alt={item.title} />
            </td>
            <td>{item.stock}</td>
            <td>{item.code}</td>
            <td>
              <i
                className='fa-solid fa-eraser'
                onClick={updateData(item.id)}
              ></i>{' '}
              <i className='fa-solid fa-pen-to-square'></i>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default bodyTable;
