import React from "react";
import {
  add,
  format,
  sub,
  eachDayOfInterval,
  lastDayOfMonth,
  getDay,
} from "date-fns";
import styles from "./Month.module.scss";

const TitleWeek = () => {
  const titles = ["S", "M", "T", "W", "T", "F", "S"];
  return titles.map((t, i) => <span key={i}>{t}</span>);
};

const Month = (props) => {
  const { currentDate, setDate } = props;
  const addToDate = (duration) => {
    const newDate = add(currentDate, duration);
    setDate(newDate);
  };
  const subfromDate = (duration) => {
    const newDate = sub(currentDate, duration);
    setDate(newDate);
  };
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const firstDayOfMonth2 = getDay(firstDayOfMonth);

  const emptyDays = () => {
    const array = [];
    for (let i = 0; i < firstDayOfMonth2; i++) {
      array.push(<span key={"empty" + i}>0</span>);
    }
    return array;
  };

  const monthDays = () => {
    return eachDayOfInterval({
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: lastDayOfMonth(currentDate),
    }).map((date, i) => {
      if (format(date, "d") === format(currentDate, "d")) {
        return (
          <span key={i} className={styles["current-day"]}>
            {format(date, "d")}
          </span>
        );
      } else {
        return <span key={i}>{format(date, "d")}</span>;
      }
    });
  };

  const monthDaysEmptyDays = [];
  monthDaysEmptyDays.push(...emptyDays());
  monthDaysEmptyDays.push(...monthDays());

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

  const MonthWeeks = arrayWeeks.map((d, i) => {
    return <div key={"div" + i}>{d}</div>;
  });
  return (
    <>
      <section>
        <p>
          <button onClick={() => subfromDate({ months: 1 })}>
            Substract 1 month
          </button>
          <button onClick={() => addToDate({ months: 1 })}>Add 1 month</button>
        </p>
        <div>
          <p>{format(currentDate, "LLLL yyyy")}</p>
        </div>
        <div>
          <TitleWeek />
        </div>
        <article>{MonthWeeks}</article>
      </section>
    </>
  );
};

export default Month;
