import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  // const [amountIsValid, setAmountIsValid] = useState(false);
  const amountInputRef = useRef();
  const submitHandler = e => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5) {
      // setAmountIsValid(false);
      return;
    }
    // setAmountIsValid(true);
    props.onAddToCart(enteredAmountNum);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler} noValidate>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button type='submit'>+ Add</button>
      {/* {!amountIsValid && <p style={{color: 'red'}}>please enter valid amount (1-5)</p>} */}
    </form>
  );
};

MealItemForm.propTypes = {
  id: PropTypes.string,
  onAddToCart: PropTypes.func
};

export default MealItemForm;