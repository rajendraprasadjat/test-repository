import * as React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type Hours = {
  title?: string;
  hours: Hours;
  children?: React.ReactNode;
  additionalHoursText?: any;
  timezone?: any;
  reopenDate?: any;
  site: any;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

/**
 * todayIndex is a constant which stores the value of Day
 */
const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 * it returns Days
 */

function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * creates a sortbyday function used for sorting for current day.
 * @param week
 * @returns weeks
 */

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

/**
 *  creates a renderHours Constant
 * @param week
 * @returns html elememt (day)
 */
const renderHours = (week: Week, site: any) => {

  const dayDom: JSX.Element[] = [];
  let i = 0;
  for (const [k, v] of Object.entries(sortByDay(week))) {
    let dayDate = new Date();

    const join = (t: any, a: any, s: any) => {
      function format(m: any) {
        const f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      }
      return a.map(format).join(s);
    }
    if (i > 0) {
      dayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    }
    const a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    const s = join(dayDate, a, " ");
    dayDate = s;
    dayDom.push(
      <DayRow
        key={k}
        dayDate={dayDate}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        holidayhours={week.holidayHours}
        site={site}

      />
    );
    i++;
  }
  return <tbody className="font-normal">{dayDom}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

/**
 * creates a Function ConvertTo12HourFormat Constant
 * @param time
 * @param includeMeridiem
 * @returns 12 hour format timing with AM PM
 */

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  dayDate: any;
  holidayhours: any;
  site: any

};

/**
 * Create DayRow for Hours feild
 * @param props
 * @returns html elements (current day,dayname, open intervals)
 */

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, dayDate, holidayhours } = props;
  const [myDataAccordintToMe, setMyDataAccordintToMe] = React.useState<any>({});
  let a, s, holidayDate: any;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      const f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  const holidayarray: any[] = [];
  const holidayopenintervals: any[] = [];
  const keysFromData = holidayhours
    ? holidayhours.map((holiday: any) => {
      a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
      s = join(new Date(holiday.date), a, " ");
      holidayDate = s;
      holidayarray.push(holiday);
      return holidayDate;
    })
    : null;
  React.useEffect(() => {
    if (keysFromData) {
      const keysFromDataUnique = keysFromData.filter(
        (value: any, index: any, self: any) => {
          return self.indexOf(value) === index;
        }
      );
      const dataAccordintToMe: any = {};
      for (let index = 0; index < keysFromDataUnique.length; index++) {
        const element = keysFromDataUnique[index];
        dataAccordintToMe[element] = holidayarray.filter((fe: any) => {
          const adate = [
            { day: "numeric" },
            { month: "long" },
            { year: "numeric" },
          ];
          const matchdate = join(new Date(fe.date), adate, " ");
          return matchdate == element;
        });
      }
      setMyDataAccordintToMe(dataAccordintToMe);
    }
  }, []);

  let Status = false;
  for (const key in myDataAccordintToMe) {
    if (key.includes(dayDate)) {
      Status = true;
      holidayopenintervals.push(myDataAccordintToMe[key]);
    }
  }
  const { t } = useTranslation();
  return (
    <tr className={isToday ? "currentDay" : ""}>
      {Status ? (
        <td className="capitalize text-left pl-1 pr-4 dayName">
          <span>
            <b className="checked"></b>
            {t(dayName)} <b className="block text-sm font-normal">(Holiday)</b>
          </span>
        </td>
      ) : (
        <td className="capitalize text-left pl-1 pr-4 dayName">
          <span>
            {t(dayName)}
          </span>
        </td>
      )}

      {!day.isClosed && (
        <td className="dayTime pr-1">
          {Status
            ? holidayopenintervals &&
            holidayopenintervals?.map((res: any) => {
              return res?.map((openint: any) => {
                return (
                  <>
                    {openint.isClosed ? (
                      <div className="pr-1">
                        <span className="time-hours">{props?.site?.c_closed ? props?.site?.c_closed : `${t("Closed")}`}</span>
                      </div>
                    ) : (
                      openint?.openIntervals &&
                      openint?.openIntervals?.map((res: any, index: number) => {
                        return (
                          <div className="time-hours" key={index}>
                            <span className="time-open-hours">
                              {res?.start}
                            </span>
                            <span className="dash">-</span>
                            <span className="time-close-hours">
                              {res?.end}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </>
                );
              });
            })
            : day?.openIntervals?.map((res: any, index: number) => {
              return (
                <span className="time-hours" key={index}>
                  <span className="time-open-hours">{res?.start}</span>
                  <span className="dash">-</span>
                  <span className="time-close-hours">{res?.end}</span>
                </span>
              );
            })}
        </td>
      )}
      {day.isClosed && (
        Status ?
          <td className="capitalize text-left pl-1 pr-4">
            <span>
              {holidayopenintervals?.map((res: any) => {
                return (res?.map((openint: any) => {
                  return (openint?.openIntervals?.map((res: any) => {
                    return (
                      <>
                        <span className="time-hours">
                          <span className="time-open-hours">{res?.start}</span><span className="dash">-</span><span className="time-close-hours">{res?.end}</span>
                        </span>
                      </>
                    )
                  }))
                }))
              })}
            </span>
          </td> :
          <td className="pr-1">
            <span className="time-hours">{props?.site?.c_closed ? props?.site?.c_closed : `${t("Closed")}`}</span>
          </td>
      )}
    </tr>
  );
};

/**
 * Hours component
 * @param props
 * @returns html elements (holiday hours with popup and opening hours)
 */
const Hours = (props: Hours) => {
  const [dateTime, setDateTime] = useState("");
  useEffect(() => {
    const id = setInterval(() => setDateTime(`${date} ${month} ${year}`), 30);
    const d = new Date(hours.reopenDate);
    let date: any = d.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();

    return () => {
      clearInterval(id);
    }
  }, []);
  const { title, hours } = props;
  const titleString = title && (
    <div className="text-xl font-semibold mb-4">{title}</div>
  );
  const { t } = useTranslation();
  return (
    <div>
      {titleString}
      <table>
        {props?.hours && props?.hours.reopenDate ? (
          <tbody>
            <tr>
              <td>
                {props?.additionalHoursText} <br />
                 {t("The Store will reopen at")} {`${dateTime}`}
              </td>
            </tr>
          </tbody>
        ) : (
          <>{renderHours(hours, props?.site)}</>
        )}
      </table>
    </div>
  );
};
export default Hours;
