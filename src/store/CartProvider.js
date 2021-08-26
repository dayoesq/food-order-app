import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import CartContext from './cart-context';

const initialCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(item => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(item => {
      return item.id === action.id;
    });
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return initialCartState;
};

const CartProvider = props => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const addItemHandler = item => {
    dispatch({ type: 'ADD_ITEM', item });
  };
  
  const removeItemHandler = id => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  };

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node
};

export default CartProvider;