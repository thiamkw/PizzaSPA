import React, { useContext, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';
import styles from './ReviewOrder.module.css';
import { useNavigate } from 'react-router-dom';

interface IReviewOrder {
  order: any;
}

const ReviewOrder: React.FC = () => {
  const { state, dispatch } = useContext(OrderContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const totalOrderPrice = state.reduce((total: number, order: any) => total + order.totalPrice, 0);
  const navigate = useNavigate();

  const handleSubmitOrder = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error('Order submission failed');
      }

      console.log('Order submitted successfully');
      dispatch({ type: 'CLEAR_ORDERS' });
      navigate('/thank-you');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
     <div className={styles.reviewOrderContainer}>
      <h1>Review Order</h1>
      {state.map((order: any, index: number) => (
        <div key={index} className={styles.orderCard}>
          <h2>{order.pizzas.name} - ${order.pizzas.basePrice.toFixed(2)}</h2>
          <ul>
            {order.toppings.map((topping: any) => (
              <li key={topping.id}>{topping.name} - ${topping.basePrice.toFixed(2)}</li>
            ))}
          </ul>
          <p>Order Total: ${order.totalPrice.toFixed(2)}</p>
        </div>
      ))}

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={styles.totalPrice}>
        <h2>Total Price: ${totalOrderPrice.toFixed(2)}</h2>
        <button className={styles.actionButton} onClick={handleSubmitOrder}>Submit Order</button>
      </div>
    </div>
  );
};
export default ReviewOrder;
