import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PizzaList from './pages/PizzaList/PizzaList';
import ToppingList from './pages/ToppingList/ToppingList';
import Header from './components/Header/Header';
import { OrderProvider } from './context/OrderContext';
import ReviewOrder from './pages/ReviewOrder/ReviewOrder';
import ThankYou from './pages/ThankYou/ThankYou';



const App: React.FC = () => {

  return (
    <Router>
      <OrderProvider>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/pizzeria/:id" element={<PizzaList/>} />
        <Route path="/pizza/:pizzaId/pizzeria/:pizzeriaId/topping" element={<ToppingList />} /> 
        <Route path="/review-order" element={<ReviewOrder />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      </OrderProvider>
    </Router>
  );
};

export default App;
