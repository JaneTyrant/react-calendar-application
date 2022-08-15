import React from "react";
import { setMonth } from "date-fns";
import styles from "./MonthList.module.scss";

const MonthList = (props) => {
  const { currentDate, setDate, showMonthList } = props;
  const chooseMonth = (m) => {
    const newDate = setMonth(currentDate, m);
    setDate(newDate);
    showMonthList();
  };

  let array = [];

  const titles = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  titles.map((t, i) => {
    return array.push(
      <span
        onClick={() => this[chooseMonth(i)]}
        className={styles["month-cell"]}
        key={"month" + i}
      >
        {t}
      </span>
    );
  });

  let rows = [];
  let cells = [];

  array.forEach((row, i) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
  });
  rows.push(cells);

  const Monthlist = rows.map((d, i) => {
    return <div key={"month" + i}>{d}</div>;
  });

  return <article className={"month-list"}>{Monthlist}</article>;
};

export default MonthList;
