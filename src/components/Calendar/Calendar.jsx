import React, { useState } from 'react';
import styles from './Calendar.module.css';
import DayView from './DayView/DayView';
import MonthView from './MonthView/MonthView';
import YearView from './YearView/YearView';
import { dayView, monthView, yearView } from '../../constants';

const parseEvents = (events) => {
  const _events = {};

  events.forEach((event) => {
    let key = event.start_date;
    if (event.multiDayEvent) {
      key = `${event.start_date} - ${event.end_date}`;
    }
    _events[key] ? _events[key].push(event) : (_events[key] = [event]);
  });
  return _events;
};

const Calendar = ({ events }) => {
  const [idx, setIdx] = useState(0);
  const _date = new Date();
  const [view, setView] = useState(dayView);
  const [date, setDate] = useState({
    month: _date.getMonth(),
    year: _date.getFullYear()
  });

  let _events = parseEvents(events);

  const renderView = (key, className = '', date) => {
    switch (view) {
      case dayView: {
        return (
          <div key={key} className={`${styles.container} ${className}`}>
            <DayView
              events={_events}
              onViewSwitch={setView}
              date={date}
              setDate={setDate}
              setIdx={setIdx}
            />
          </div>
        );
      }

      case monthView: {
        return <MonthView onViewSwitch={setView} />;
      }

      case yearView: {
        return <YearView onViewSwitch={setView} />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className={styles.calendar}>
      {renderView(idx - 1, styles.left, {
        month: date.month === 0 ? 11 : date.month - 1,
        year: date.month === 0 ? date.year - 1 : date.year
      })}
      {renderView(idx, '', date)}
      {renderView(idx + 1, styles.right, {
        month: date.month === 11 ? 0 : date.month + 1,
        year: date.month === 11 ? date.year + 1 : date.year
      })}
    </div>
  );
};

export default Calendar;
