import { CronJob } from "cron";
import checkBirthdays from "./checkBirthdays.js";
import checkEmployeesEvents from "./checkEmployeesEvents.js";

const initializeBirthdayScheduler = () => {
  console.log("Initializing birthday notification scheduler...");

  //schedule to run every 2 minutes
  const job = new CronJob(
    "*/30 * * * * *",
    async () => {
      console.log("Running birthday notification scheduler...");
      try {
        // Execute the birthday notification logic
        const result = await checkBirthdays();
        // const result = await checkEmployeesEvents();
        console.log("Scheduler run was successful", result);
        return result;
      } catch (error) {
        console.error("Error running birthday scheduler:", error);
      }
    },
    null, // onComplete
    true // start
  );
};

export default initializeBirthdayScheduler;
