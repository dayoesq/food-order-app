import React from 'react';
import PropTypes from 'prop-types';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import dinningTable from '../../assets/dinning-table.jpg';

const Header = props => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Food Order</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={dinningTable} alt='Dinning Table' />
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  onShowCart: PropTypes.func
};

export default Header;