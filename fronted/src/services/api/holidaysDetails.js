import { client } from "../axiosClient/axiosClientApi";
import Holidays from "date-holidays";

export const fetchHolidaysDetailsOptions = async () => {
  try {
    const response = await client.get("/getHolidaysOptionsDetails");
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.log("Error fetching holidays options details:", error);
  }
};

export const getHolidaysFromApi = async () => {
  const currentYear = new Date().getFullYear();
  const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = normalizeDate(new Date());
  const tomorrow = new Date(today);
  const nextWeek = new Date(today);
  const nextTwoWeeks = new Date(today);
  const nextMonth = new Date(today);

  tomorrow.setDate(today.getDate() + 22);
  nextWeek.setDate(today.getDate() + 5);
  nextTwoWeeks.setDate(today.getDate() + 14);
  nextMonth.setDate(today.getDate() + 30);

  const countryCode = "IL";
  // Fetch holidays based on country code for the current year
  const hd = new Holidays(countryCode);
  const holidaysData = hd.getHolidays(currentYear);

  let holidays = [];
  const holidayStartsTomorrow = holidaysData.find((holiday) => {
    const holidayStartDate = normalizeDate(new Date(holiday.start));
    return holidayStartDate.getTime() === tomorrow.getTime();
  });
  const holidayStartsNextWeek = holidaysData.find((holiday) => {
    const holidayStartDate = normalizeDate(new Date(holiday.start));
    return holidayStartDate.getTime() === nextWeek.getTime();
  });
  const holidayStartsNextTwoWeeks = holidaysData.find((holiday) => {
    const holidayStartDate = normalizeDate(new Date(holiday.start));
    return holidayStartDate.getTime() === nextTwoWeeks.getTime();
  });
  const holidayStartsNextMonth = holidaysData.find((holiday) => {
    const holidayStartDate = normalizeDate(new Date(holiday.start));
    return holidayStartDate.getTime() === nextMonth.getTime();
  });
  if (holidayStartsTomorrow) {
    holidays.push(holidayStartsTomorrow);
  }
  if (holidayStartsNextWeek) {
    holidays.push(holidayStartsNextWeek);
  }
  if (holidayStartsNextTwoWeeks) {
    holidays.push(holidayStartsNextTwoWeeks);
  }
  if (holidayStartsNextMonth) {
    holidays.push(holidayStartsNextMonth);
  }

  // Format holidays, adjusting to the next year if today's date has passed the holiday date
  const formattedHolidays = holidays.map((holiday) => {
    const holidayDate = new Date(holiday.date);
    // If holiday has passed, set it to the same date in the next year
    if (holidayDate < today) {
      holidayDate.setFullYear(currentYear + 1);
    }
    return {
      name: holiday.name,
      date: holidayDate.toISOString().split("T")[0], // format as YYYY-MM-DD
    };
  });
  return formattedHolidays;
};
