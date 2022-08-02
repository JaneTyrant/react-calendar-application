import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const Day = (props) => {
  const { currentDate } = props;
  return (
    <div>
      <p>{format(currentDate, "EEEE")}</p>
      <p>{format(currentDate, "d")}</p>
    </div>
  );
};
// Friday, 29 July, 2022 year

Day.defaultProps = {
  currentDate: new Date(),
};

Day.propTypes = {
  currentDate: PropTypes.object.isRequired,
};

export default Day;
