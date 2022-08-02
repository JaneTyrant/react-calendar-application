import React, { Component } from "react";
import Day from "./Day";
import Month from "./Month";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }
  setDate = (date) => {
    this.setState({ currentDate: date });
  };
  render() {
    const { currentDate } = this.state;
    return (
      <>
        <Day currentDate={currentDate} />
        <Month currentDate={currentDate} setDate={this.setDate} />
      </>
    );
  }
}

export default Calendar;
