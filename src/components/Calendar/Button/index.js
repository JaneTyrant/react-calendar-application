import React from "react";
import PropTypes from "prop-types";
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

Button.defaultProps = {
  currentDate: new Date(),
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  arrow: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  addToDate: PropTypes.bool.isRequired,
  currentDate: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
};

export default Button;
