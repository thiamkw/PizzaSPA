import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

interface IPizza {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/pizzeria/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => setPizzas(data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/pizza/pizzeria/${event.target.value}`);
  };

  return (
    <div className={styles.homePage}>
      <h1>Welcome to John Pizza Store!</h1>
      <select className={styles.dropdown} onChange={handleChange}>
        <option value="default">Please select</option>
        {pizzas.map(pizza => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Home;
