
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './PizzaList.module.css';
import axios from 'axios';

export interface IPizza {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
}

  const PizzaList: React.FC = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/pizza/pizzeria/${id}`)
      .then(response => setPizzas(response.data))
      .catch(error => console.error(error));

  }, [id]);

  return (
    <div className={styles.pizzaList}>
      {pizzas.map(pizza => (
        <div key={pizza.id} className={styles.pizzaCard}>
          <h2>{pizza.name}</h2>
          <p>{pizza.description}</p>
          <p>${pizza.basePrice.toFixed(2)}</p>
          <Link to={`/pizza/${pizza.id}/pizzeria/${id}/topping`} className={styles.pizzaCardLink}>Select</Link>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;



