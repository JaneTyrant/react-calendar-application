import React, { Component } from "react";
import PropTypes from "prop-types";
import { add, format, sub } from "date-fns";
import cx from "classnames";
import styles from "./Month.module.scss";
import MonthList from "../MonthList";
import MonthWeeks from "../MonthWeeks/MonthWeeks.js";

const TitleWeek = () => {
  const titles = ["S", "M", "T", "W", "T", "F", "S"];
  return titles.map((t, i) => (
    <span className={styles["title-week"]} key={i}>
      {t}
    </span>
  ));
};

const yearClasses = cx(styles["month-year"], styles.year);

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMonthList: false,
      addToDate: true,
    };
  }
  changeDate = (duration, addToDate) => {
    const { currentDate, setDate } = this.props;
    const newDate = addToDate
      ? sub(currentDate, duration)
      : add(currentDate, duration);
    setDate(newDate);
  };
  showMonthList = () => {
    const { showMonthList } = this.state;
    this.setState({
      showMonthList: !showMonthList,
    });
  };
  render() {
    const { currentDate, setDate } = this.props;
    const { showMonthList, addToDate } = this.state;
    return (
      <>
        <article className={styles["month-article"]}>
          <div className={styles["date-wrapper"]}>
            <button
              className={styles["month-button"]}
              onClick={() => this.changeDate({ months: 1 }, addToDate)}
            >
              &#60;
            </button>
            <p className={styles["month-year"]} onClick={this.showMonthList}>{format(currentDate, "LLLL")}</p>
            <button className={styles["year-button"]} onClick={() => this.changeDate({ years: 1 }, !addToDate)}>&#94;</button>
            <button className={styles["year-button"]} onClick={() => this.changeDate({ years: 1 }, addToDate)}>&#94;</button>
            <div>
              <p className={yearClasses} >{format(currentDate, "yyyy")}</p>
              <button
                className={styles["month-button"]}
                onClick={() => this.changeDate({ months: 1 }, !addToDate)}
              >
                &#62;
              </button>
            </div>
          </div>
          <article className={styles["month-days-article"]}>
            {showMonthList && (
              <MonthList
                currentDate={currentDate}
                setDate={setDate}
                showMonthList={this.showMonthList}
              />
            )}
            {!showMonthList && (
              <>
                <div>
                  <TitleWeek />
                </div>
                <MonthWeeks currentDate={currentDate} />
              </>
            )}
          </article>
        </article>
      </>
    );
  }
}

Month.defaultProps = {
  currentDate: new Date(),
};

Month.propTypes = {
  currentDate: PropTypes.object.isRequired,
  setDate: PropTypes.func,
};

export default Month;
