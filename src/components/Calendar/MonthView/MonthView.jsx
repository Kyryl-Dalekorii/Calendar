import React from "react";
import { dayView, yearView } from "../../../constants";

const MonthView = ({ onViewSwitch }) => {
  return (
    <div>
      <div onClick={() => onViewSwitch(dayView)}>Switch to DayView</div>
      <div onClick={() => onViewSwitch(yearView)}>Switch to YearView</div>
    </div>
  );
};

export default MonthView;
