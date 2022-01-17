import React from 'react';
import {
  calcDaysInMonth,
  calcMonthOffset,
  getEventsOnDate,
  getMonthName,
  getWeekdayName
} from '../../../utils';
import DayCell from './DayCell/DayCell';

import styles from './DayView.module.css';

const convertMultiDayEvent = (event) => {

};

const DayView = ({ onViewSwitch, date, setDate, events, setIdx }) => {
  const { month, year } = date;
  const daysInMonth = calcDaysInMonth(month, year);
  const offset = calcMonthOffset(month, year);

  const onLeftClick = () => {
    let _month = month === 0 ? 11 : month - 1;
    let _year = month === 0 ? year - 1 : year;

    setDate({
      month: _month,
      year: _year
    });
    setIdx((idx) => --idx);
  };

  const onRightClick = () => {
    let _month = month === 11 ? 0 : month + 1;
    let _year = month === 11 ? year + 1 : year;

    setDate({
      day: 0,
      month: _month,
      year: _year
    });
    setIdx((idx) => ++idx);
  };

  const renderDayView = () => {
    const amountOfRows = 6;

    let prevMonthIncrement = 0;
    let nextMonthIncrement = 0;
    return new Array(amountOfRows).fill(0).map((_, rowIdx) => {
      return (
        <div className={styles.row} key={`${month}/${rowIdx}`}>
          {new Array(7).fill(0).map((_, dateIdx) => {
            // i add 1 to dateIdx because i want dates to start from 1
            const calculatedDay = 7 * rowIdx + (dateIdx + 1) - offset;
            let actualDay = calculatedDay;
            let weekday = getWeekdayName(month, year, actualDay);
            let belongsTo = 'own';

            let eventsOnThisDate = getEventsOnDate(
              { day: actualDay, month, year },
              events
            );

            // days from prev month
            if (calculatedDay <= 0) {
              const prevMonth = month === 0 ? 11 : month - 1;
              const prevYear = month === 0 ? year - 1 : year;
              const daysInPrevMonth = calcDaysInMonth(prevMonth, prevYear);
              belongsTo = 'prev';

              actualDay =
                daysInPrevMonth -
                (offset === 1 ? 0 : offset - 1) +
                prevMonthIncrement;

              weekday = getWeekdayName(prevMonth, prevYear, actualDay);
              eventsOnThisDate = getEventsOnDate(
                { day: actualDay, month: prevMonth, year: prevYear },
                events
              );

              prevMonthIncrement++;
              // days from next month
            } else if (calculatedDay > daysInMonth) {
              const nextMonth = month === 11 ? 0 : month + 1;
              const nextYear = month === 11 ? year + 1 : year;
              belongsTo = 'next';

              actualDay = 1 + nextMonthIncrement;

              weekday = getWeekdayName(nextMonth, nextYear, actualDay);
              eventsOnThisDate = getEventsOnDate(
                { day: actualDay, month: nextMonth, year: nextYear },
                events
              );
              nextMonthIncrement++;
            }

            return (
              <DayCell
                key={dateIdx}
                date={{ ...date, day: actualDay }}
                isToday={
                  actualDay === new Date().getDate() &&
                  year === new Date().getFullYear() &&
                  month === new Date().getMonth()
                }
                belongsTo={belongsTo}
                weekday={weekday}
                events={eventsOnThisDate}
                onPrevDayClick={() => onLeftClick()}
                onNextDayClick={() => onRightClick()}
              />
            );
          })}
        </div>
      );
    });
  };
  return (
    <>
      <div className={styles.dayView}>{renderDayView()}</div>
      <div className={styles.panel}>
        <div className={styles.month}>
          {getMonthName(month, 'long')}, {year}
        </div>
        <button onClick={onLeftClick} className={styles.left}>
          Previous Month
        </button>
        <button onClick={onRightClick} className={styles.right}>
          Next Month
        </button>
      </div>
    </>
  );
};

export default DayView;
