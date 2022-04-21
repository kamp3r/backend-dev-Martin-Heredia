import React, {useState} from 'react';
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [clickeado, setClickeado] = useState(false);
  const toggle = () => setClickeado(!clickeado);

  return (
    <nav className='NavbarItems'>
      <h1 className='navbarLogo'>
        <Link to='/' className='logolink'>
          <i className='fa-brands fa-usps'></i>
          <span className='nameShop'>BodegAR</span>
        </Link>
      </h1>
      <div className='menuIcono' onClick={toggle}>
        <i className={clickeado ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clickeado ? 'navMenu activo' : 'navMenu'}>
        <NavLink to='/' onClick={toggle} className='nav-links'>
          Home
        </NavLink>
        <NavLink to='/products' onClick={toggle} className='nav-links'>
          Productos
        </NavLink>
        <NavLink to='/adminPage' onClick={toggle} className='nav-links'>
          Admin
        </NavLink>
        <NavLink to='/cart' onClick={toggle} className='nav-links'>
          Carrito
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
