import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ThankYou.module.css';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate('/');
  };

  return (
    <div className={styles.thankYou}>
      <h1>Thank you for your order</h1>
      <button className={styles.actionButton} onClick={handleNewOrder}>Order Again</button>
    </div>
  );
};

export default ThankYou;
