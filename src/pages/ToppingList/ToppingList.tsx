import React, { useEffect, useState, useReducer, useContext  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ToppingList.module.css';
import { OrderContext, IOrder } from '../../context/OrderContext';
import { ITopping, IPizza, toppingReducer} from '../../reducers/ToppingReducer';
import axios from 'axios';


const ToppingList: React.FC = () => {
  const { pizzaId, pizzeriaId } = useParams();
  const [pizza, setPizza] = useState<IPizza | null>(null);
  const [toppings, setToppings] = useState<ITopping[]>([]);
  const [state, dispatch] = useReducer(toppingReducer, { selectedToppings: [], toppingTotal: 0, pizzaBasePrice: 0 });
  const [isOrderAdded, setIsOrderAdded] = useState(false);
  const navigate = useNavigate();
  const { dispatch: orderDispatch } = useContext(OrderContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/pizza/${pizzaId}`)
      .then(response => {
        setPizza(response.data);
        dispatch({ type: 'SET_PIZZA_BASE_PRICE', payload: response.data.basePrice });
      })
      .catch(error => console.error(error));
  }, [pizzaId]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/topping`)
      .then(response => setToppings(response.data))
      .catch(error => console.error(error));
  }, [pizzeriaId]);

  const handleSelect = (topping: ITopping) => {
    dispatch({ type: 'ADD_TOPPING', payload: topping });
  };

  const handleDeselect = (topping: ITopping) => {
    dispatch({ type: 'REMOVE_TOPPING', payload: topping });
  };

   const handleReviewOrder = () => {
    navigate('/review-order');
  };


  const handleAddToOrder = async () => {
    if (!pizza || !pizzeriaId) {
      console.error("Missing pizzaId or pizzeriaId");
      return;
    }

    const totalPrice = state.pizzaBasePrice + state.toppingTotal; // calculate total price

    const order: IOrder = {
      pizzas: pizza,
      pizzeriaId: parseInt(pizzeriaId as string),
      toppings: state.selectedToppings,
      totalPrice: state.pizzaBasePrice + state.toppingTotal,
    };

    orderDispatch({ type: 'ADD_TO_ORDER', payload: order });  
     setIsOrderAdded(true);

  };

  const handleContinueShopping = () => {
    navigate(`/pizza/pizzeria/${pizzeriaId}`);

  };


  return (
    <div>
      {pizza && (
         <div className={styles.pizzaDetail}>
          <h2>{pizza.name}</h2>
          <p>{pizza.description}</p>
          <p>${pizza.basePrice.toFixed(2)}</p>
        </div>
      )}

      <div className={styles.toppingList}>
        {toppings.map(topping => (
          <div key={topping.id} className={styles.toppingCard}>
            <h2>{topping.name}</h2>
            <p>${topping.basePrice.toFixed(2)}</p>
            {state.selectedToppings.find(t => t.id === topping.id) ? (
              <button onClick={() => handleDeselect(topping)}>Deselect</button>
            ) : (
              <button onClick={() => handleSelect(topping)}>Select</button>
            )}
          </div>
        ))}
      </div>

      <h2 className={styles.totalPrice}>Total Price: ${(state.pizzaBasePrice + state.toppingTotal).toFixed(2)}</h2>

      {!isOrderAdded && <button className={styles.actionButton} onClick={handleAddToOrder}>Add to Order</button>}
      {isOrderAdded && (
         <div>
         <button className={styles.actionButton} onClick={handleContinueShopping}>Continue Shopping</button>
         <button className={styles.actionButton} onClick={handleReviewOrder}>Review Order</button>
       </div>
      ) }
   
      
    </div>
  );
};

export default ToppingList;
