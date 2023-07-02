export interface ITopping {
    id: number;
    name: string;
    basePrice: number;
    IsActive: boolean;
  }
  
  export interface IPizza {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    IsActive: boolean;
  }
  
  export type ToppingState = {
    selectedToppings: ITopping[];
    toppingTotal: number;
    pizzaBasePrice: number;
  };
  
  export type ToppingAction =
    | { type: 'ADD_TOPPING'; payload: ITopping }
    | { type: 'REMOVE_TOPPING'; payload: ITopping }
    | { type: 'SET_PIZZA_BASE_PRICE'; payload: number };
  
  export const toppingReducer = (state: ToppingState, action: ToppingAction): ToppingState => {
    switch (action.type) {
      case 'ADD_TOPPING':
        return {
          ...state,
          selectedToppings: [...state.selectedToppings, action.payload],
          toppingTotal: state.toppingTotal + action.payload.basePrice,
        };
      case 'REMOVE_TOPPING':
        const updatedToppings = state.selectedToppings.filter(topping => topping.id !== action.payload.id);
        return {
          ...state,
          selectedToppings: updatedToppings,
          toppingTotal: state.toppingTotal - action.payload.basePrice,
        };
      case 'SET_PIZZA_BASE_PRICE':
        return {
          ...state,
          pizzaBasePrice: action.payload,
        };
      default:
        return state;
    }
  };