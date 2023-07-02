import React, { createContext, useReducer, ReactNode  } from 'react';
import {IPizza, ITopping } from '../reducers/ToppingReducer';

export interface IOrder {
  pizzas: IPizza;
  pizzeriaId: number;
  toppings: ITopping[];
  totalPrice: number;
}


type OrderState = IOrder[];

type OrderAction = 
  | { type: 'ADD_TO_ORDER'; payload: IOrder }
  | { type: 'CLEAR_ORDERS' };

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      return [...state, action.payload];
      case 'CLEAR_ORDERS':
        return []; // clear all orders
    default:
      return state;
  }
};

const OrderContext = createContext<{ state: OrderState; dispatch: React.Dispatch<OrderAction>; }>({ state: [], dispatch: () => {} });

interface OrderProviderProps {
  children: ReactNode;
}

const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, []);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
