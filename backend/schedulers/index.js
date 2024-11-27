import { CronJob } from "cron";
import checkBirthdays from "./checkBirthdays.js";
import checkEmployeesEvents from "./checkEmployeesEvents.js";

const initializeScheduler = () => {
  console.log("Initializing birthday notification scheduler...");

  //schedule to run every 30 minutes for testing -- 
  //TO DO - change to once a day
  const job = new CronJob(
    "*/30 * * * * *",
    async () => {
      console.log("Running birthday notification scheduler...");
      try {
        // Execute the birthday notification logic
         await checkBirthdays();
         await checkEmployeesEvents();
        console.log("Scheduler run was successful");
        return result;
      } catch (error) {
        console.error("Error running birthday scheduler:", error);
      }
    },
    null, // onComplete
    true // start
  );
};

export default initializeScheduler;
