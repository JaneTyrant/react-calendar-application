import React from "react";
import { add, sub } from "date-fns";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { value, arrow, buttonClass, addToDate, currentDate, setDate } = props;
  const changeDate = (duration, addToDate) => {
    const newDate = addToDate
      ? sub(currentDate, duration)
      : add(currentDate, duration);
    setDate(newDate);
  };
  return (
    <button
      className={styles[buttonClass]}
      onClick={() => changeDate({ [value]: 1 }, addToDate)}
    >
      {arrow}
    </button>
  );
};

export default Button;
