import React from "react";
import PropTypes from "prop-types";
import {
  format,
  eachDayOfInterval,
  lastDayOfMonth,
  startOfMonth,
  getDay,
} from "date-fns";
import cx from "classnames";
import { thisDate } from "../../../utils/utils.js";
import styles from "./MonthWeeks.module.scss";

const MonthWeeks = (props) => {
  const { currentDate } = props;

  const currentDayClasses = cx(styles["month-day"], styles["current-day"]);

  const firstDateOfMonth = startOfMonth(currentDate);
  const firstDayOfMonth = getDay(firstDateOfMonth);

  const emptyDays = () => {
    const array = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      array.push(
        <span className={styles["empty-day"]} key={"empty" + i}>
          0
        </span>
      );
    }
    return array;
  };

  const monthDays = () => {
    return eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: lastDayOfMonth(currentDate),
    }).map((date, i) => {
      if (
        format(date, "d") === format(currentDate, "d") &&
        currentDate.toString() === thisDate.toString()
      ) {
        return (
          <span key={i} className={currentDayClasses}>
            {format(date, "d")}
          </span>
        );
      } else {
        return (
          <span className={styles["month-day"]} key={i}>
            {format(date, "d")}
          </span>
        );
      }
    });
  };

  const monthDaysEmptyDays = [];
  monthDaysEmptyDays.push(...emptyDays(), ...monthDays());

  let arrayWeeks = [];
  let arrayOneWeek = [];

  monthDaysEmptyDays.forEach((day, i) => {
    if (i % 7 !== 0) {
      arrayOneWeek.push(day);
    } else {
      arrayWeeks.push(arrayOneWeek);
      arrayOneWeek = [];
      arrayOneWeek.push(day);
    }
    if (i === monthDaysEmptyDays.length - 1) {
      arrayWeeks.push(arrayOneWeek);
    }
  });

  const MonthWeeks = arrayWeeks.map((week, i) => (
    <div key={"div" + i}>{week}</div>
  ));
  return MonthWeeks;
};

MonthWeeks.defaultProps = {
  currentDate: new Date(),
};

MonthWeeks.propTypes = {
  currentDate: PropTypes.object.isRequired,
};

export default MonthWeeks;
