import React from "react";
import { dayView } from "../../../constants";

const YearView = ({ onViewSwitch }) => {
  return <div onClick={() => onViewSwitch(dayView)}>YearView</div>;
};

export default YearView;
