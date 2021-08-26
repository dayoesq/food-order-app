import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [itemAdded, setItemAdded] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfItems = items.length > 0 ? items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0) : 0;

  const btnClasses = `${classes.button} ${ itemAdded ? classes.bump : '' }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setItemAdded(true);
    const timer = setTimeout(() => {
      setItemAdded(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

HeaderCartButton.propTypes = {
  onClick: PropTypes.func
};

export default HeaderCartButton;
