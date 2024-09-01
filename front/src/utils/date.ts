import {format} from 'date-fns';

const getToday = () => {
  const today = format(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
    'yyyy-MM-dd',
  );

  return today;
};

/** 2024-02-02 => 2
 * 
 * 일 수 만 추출하는 함수
 */
const getDateFromHypenDate = (date: string) => {
  return date.split('-')[2].replace(/0(\d{1})$/, '$1')
}

const getMonthYearDetails = (initialDate: Date) => {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const firstDayofWeek = startDate.getDay(); // 매달 1일이 무슨요일인지에 대한 인덱스 (0(일) ~ 6(토))
  const lastDayofWeek = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 1,
    0,
  ).getDay();
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(), //달의 마지막 날짜
  );
  const lastDate = Number(lastDateString);

  const wholeDates = [];

  for (let i = 0; i < firstDayofWeek; i++) {
    const prevDay = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      -1 * i,
    ).getDate(); //달의 마지막 날짜
    const wholeDate = `${initialDate.getFullYear()}-${initialDate.getMonth()}-${prevDay}`;
    wholeDates.unshift(format(wholeDate, 'yyyy-MM-dd'));
  }
  for (let i = 1; i <= lastDate; i++) {
    const wholeDate = `${year}-${month}-${i}`;
    wholeDates.push(format(wholeDate, 'yyyy-MM-dd'));
  }
  for (let i = 1; i <= 6 - lastDayofWeek; i++) {
    const wholeDate = `${initialDate.getFullYear()}-${
      initialDate.getMonth() + 2
    }-${i}`;
    wholeDates.push(format(wholeDate, 'yyyy-MM-dd'));
  }

  return {
    month,
    year,
    startDate,
    wholeDates,
  };
};

type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  wholeDates: string[];
};

const getNewMonthYear = (prevDate: MonthYear, increment: number) => {
  const newMonthYear = new Date(
    prevDate.startDate.setMonth(prevDate.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
};

export {getMonthYearDetails, getNewMonthYear, getToday, getDateFromHypenDate};

export type {MonthYear};
