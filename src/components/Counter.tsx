import React, { FC, useState } from 'react';
import classes from './Counter.module.scss';

interface CounterProps {}

export const Counter: FC<CounterProps> = ({}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <h1>{count}</h1>
      <button className={classes.btn} type='button' onClick={increment}>
        increment
      </button>
    </div>
  );
};
