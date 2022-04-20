import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TableManage.css';
import {
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from 'reactstrap';

const formatoNumero = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'USD',
});

const TableManage = () => {
  const [data, setData] = useState([]);
  const [modalType, setModalType] = useState('');
  const [modal, setModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    thumbnail: '',
    description: '',
    code: '',
    stock: '',
  });

  const modalAction = () => {
    setModal(!modal);
  };

  const modalEliminarAction = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const inputChange = (e) => {
    const input = e.target.value;
    setFormData({ ...formData, [e.target.name]: input });
  };

  const fetchProducts = async () => {
    await axios
      .get('http://localhost:8080/api/productos/')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const postData = async () => {
    await axios
      .post('http://localhost:8080/api/productos/', formData)
      .then((res) => {
        fetchProducts();
        modalAction();
      })
      .catch((err) => console.log(err));
  };

  const putData = async () => {
    await axios
      .put('http://localhost:8080/api/productos/' + formData.id, formData)
      .then((res) => {
        modalAction();
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };

  const deleteData = async () => {
    await axios
      .delete('http://localhost:8080/api/productos/' + formData.id)
      .then((res) => {
        modalEliminarAction();
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };

  const takeData = (item) => {
    setModalType('update');
    setFormData({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      description: item.description,
      code: item.code,
      stock: item.stock,
    });
  };

  return (
    <>
      <div className='buttonContainer'>
        <button
          onClick={() => {
            setFormData('null');
            setModalType('post');
            modalAction();
          }}
          className='btn btn-warning buttonazoAgregar'
        >
          Agregar Producto
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Stock</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
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
                  onClick={() => {
                    takeData(item);
                    modalEliminarAction();
                  }}
                ></i>
                {'   '}
                <i
                  className='fa-solid fa-pen-to-square'
                  onClick={() => {
                    takeData(item);
                    modalAction();
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal centered fullscreen='md' scrollable size='lg' isOpen={modal}>
        <ModalHeader>Carga tu producto</ModalHeader>
        <ModalBody>
          <div className='form-group formularioDeCarga'>
            <label htmlFor='id'>ID</label>
            <input
              className='form-control'
              readOnly
              type='text'
              name='id'
              id='id'
              onChange={inputChange}
              value={formData ? formData.id : data.length + 1 }
            />
            <label htmlFor='title'>Title</label>
            <input
              className='form-control'
              type='text'
              name='title'
              placeholder='Nombre del producto'
              onChange={inputChange}
              value={formData ? formData.title : ''}
            />
            <label htmlFor='price'>Price</label>
            <input
              className='form-control'
              type='number'
              name='price'
              placeholder='Precio del producto'
              onChange={inputChange}
              value={formData ? formData.price : ''}
            />
            <label htmlFor='thumbnail'>Thumbnail</label>
            <input
              className='form-control'
              type='url'
              name='thumbnail'
              placeholder='Cargar URL de imagen a mostrar'
              onChange={inputChange}
              value={formData ? formData.thumbnail : ''}
            />
            <label htmlFor='description'>Description</label>
            <input
              className='form-control'
              type='text'
              name='description'
              placeholder='Descripción del producto'
              onChange={inputChange}
              value={formData ? formData.description : ''}
            />
            <label htmlFor='code'>Code</label>
            <input
              className='form-control'
              type='text'
              name='code'
              placeholder='Codigo del producto'
              onChange={inputChange}
              value={formData ? formData.code : ''}
            />
            <label htmlFor='stock'>Stock</label>
            <input
              className='form-control'
              type='text'
              name='stock'
              placeholder='Stock del producto'
              onChange={inputChange}
              value={formData ? formData.stock : ''}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          {modalType === 'post' ? (
            <Button color='success' size='lg' onClick={postData}>
              Cargar Producto
            </Button>
          ) : (
            <Button color='success' size='lg' onClick={putData}>
              Actualizar Producto
            </Button>
          )}
          <Button color='danger' size='lg' onClick={modalAction}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        centered
        fullscreen='md'
        scrollable
        size='lg'
        isOpen={modalEliminar}
      >
        <ModalHeader>
          <p className='textoHeader'>Requiere confirmacion</p>
        </ModalHeader>
        <ModalBody>
          <p className='textoCuerpo'>¿Deseas eliminar este producto?</p>
        </ModalBody>
        <ModalFooter>
          <Button color='success' size='lg' onClick={deleteData}>
            Eliminar Producto
          </Button>
          <Button color='danger' size='lg' onClick={modalEliminarAction}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TableManage;
