import { months, days } from './constants';

export const calcDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthName = (month, length) => {
  return months[month][length];
};

export const getWeekdayName = (month, year, day) => {
  return days[new Date(year, month, day).getDay()];
};

export const calcMonthOffset = (month, year) => {
  return new Date(year, month, 0).getDay();
};

export const calcDistanceBetweenDates = (start_date, end_date) => {
  const timeDiff = end_date.getTime() - start_date.getTime();
  return timeDiff / (1000 * 3600 * 24);
};

const isDateBetweenTwoDates = (from, to, target) => {
  return target.getTime() <= to.getTime() && target.getTime() >= from.getTime();
};

export const getEventsOnDate = (date, events) => {
  const _events = [];
  const { day, month, year } = date;
  const dateString = `${year}/${month + 1}/${day}`;
  const keys = Object.keys(events);

  keys.forEach((key) => {
    const dates = key.split(' - ');
    const start_date = dates[0];
    const end_date = dates[1];
    if (start_date === dateString) {
      _events.push(...events[key]);
      return;
    }
    const from = new Date(start_date);
    const to = new Date(end_date);
    const target = new Date(dateString);

    to && isDateBetweenTwoDates(from, to, target) && _events.push(...events[key]);
  });

  return _events;
};
