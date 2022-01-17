import classNames from 'classnames';
import React from 'react';
import styles from './DayCell.module.css';
import { icons } from '../../../../constants';

const DayCell = ({
  belongsTo = 'own',
  isToday = false,
  date,
  weekday,
  events,
  onPrevDayClick,
  onNextDayClick
}) => {
  const { day, month, year } = date;
  const _events = events.filter((event) => event.multiDayEvent);
  console.log(`${year}/${month + 1}/${day}: `, _events);

  const handleClick = () => {
    if (belongsTo === 'next') {
      onNextDayClick();
      return;
    } else if (belongsTo === 'prev') {
      onPrevDayClick();
      return;
    }
  };


  return (
    <div
      className={classNames(`${styles.cell}`, {
        [styles.foreignCell]: belongsTo !== 'own',
        [styles.todayCell]: isToday
      })}
      onClick={() => handleClick()}
    >
      <div className={styles.weekday}>{weekday}</div>
      <div className={styles.date}>{day}</div>

      <div
        className={styles.eventsIcons}
      >
        {events.map(({ icon, title, multiDayEvent }, idx) => {
          if (multiDayEvent) return false;
          return (
            <div key={idx} title={title}>
              <img className={styles.icon} src={icons[icon]} alt='' />
            </div>
          );
        })}
      </div>

      <div
        className={styles.multiDayEvents}
      >
      </div>
    </div>
  );
};

export default DayCell;
