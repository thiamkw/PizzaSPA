import React, { useContext } from 'react';
import styles from './Header.module.css';
import { OrderContext } from '../../context/OrderContext';


const Header: React.FC = () => {
  const { state } = useContext(OrderContext);

  return (
    <header className={styles.header}>
   
      <div className={styles.cart}>
        <span>Order: </span>
        <span>{state.length}</span>
      </div>
    </header>
  );
};

export default Header;
