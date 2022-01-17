import React from 'react';
import DayCell from '../DayCell/DayCell';
import styles from './MultiEventCells.module.css';

export default function MultiEventCells({ eventDuration, events, dayProps }) {
  // duration of event in days
  return (
    <div className={styles.container}>
      <div className={styles.event}>Event</div>
      {new Array(eventDuration).fill(0).map((_, idx) => {
        return <DayCell key={idx} {...dayProps} />;
      })}
    </div>
  );
}
