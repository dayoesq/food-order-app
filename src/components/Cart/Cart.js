import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map(item =>
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onAdd={() => cartAddHandler(item)}
        onRemove={() => cartRemoveHandler(item.id)}
      />
    )}
  </ul>;
  return (
    <Modal onClick={props.onClick}>
      { cartItems }
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button> }
      </div>
    </Modal>
    
  );
};

Cart.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func
};

export default Cart;