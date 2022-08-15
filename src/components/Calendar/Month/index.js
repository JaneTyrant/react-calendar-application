import React, { Component } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import cx from "classnames";
import styles from "./Month.module.scss";
import MonthList from "../MonthList";
import MonthWeeks from "../MonthWeeks/MonthWeeks.js";
import Button from "../Button";

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
    };
  }
  showMonthList = () => {
    const { showMonthList } = this.state;
    this.setState({
      showMonthList: !showMonthList,
    });
  };
  render() {
    const { currentDate, setDate } = this.props;
    const { showMonthList } = this.state;
    return (
      <>
        <article className={styles["month-article"]}>
          <div className={styles["date-wrapper"]}>
            <Button value="months" arrow="&#60;" buttonClass="month-button" addToDate={true} currentDate={currentDate} setDate={setDate} />
            
            <p className={styles["month-year"]} onClick={this.showMonthList}>{format(currentDate, "LLLL")}</p>
            <Button value="years" arrow="&#94;" buttonClass="year-button" addToDate={false} currentDate={currentDate} setDate={setDate} />
            <Button value="years" arrow="&#94;" buttonClass="year-button" addToDate={true} currentDate={currentDate} setDate={setDate} />
            <div>
              <p className={yearClasses} >{format(currentDate, "yyyy")}</p>
              <Button value="months" arrow="&#62;" buttonClass="month-button" addToDate={false} currentDate={currentDate} setDate={setDate} />
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
