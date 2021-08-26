/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref}/>
    </div>
  );
});

Input.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

export default Input;