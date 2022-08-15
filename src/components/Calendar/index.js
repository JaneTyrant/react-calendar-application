import React, { Component } from "react";
import Day from "./Day";
import Month from "./Month";
import styles from "./Calendar.module.scss";
import { thisDate } from "../../utils/utils.js";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: thisDate,
    };
  }
  setDate = (date) => {
    this.setState({ currentDate: date });
  };
  render() {
    const { currentDate } = this.state;
    return (
      <>
        <section className={styles["calendar-section"]}>
          <div className={styles["calendar-section_container"]}>
            <Day currentDate={currentDate} />
            <Month currentDate={currentDate} setDate={this.setDate} />
          </div>
        </section>
      </>
    );
  }
}

export default Calendar;
