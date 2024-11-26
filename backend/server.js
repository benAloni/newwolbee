import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./Connection/dbConnection.js";
import router from "./routes/index.js";
import initializeBirthdayScheduler from "./schedulers/index.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(express.static("fronted"));

app.use(
  cors({
    origin: [
      "http://www.wolbee.com",
      "https://wolbee-front-gkfchuwp6q-uc.a.run.app",
      "http://localhost:3000",
      "https://newwolbee-l7cc.onrender.com",
      "https://216.24.57.252:443",
    ],
    credentials: true,
  })
);

// FOR GOOD GOOD PRACTICE. since"" empty env is a red flag
const port = process.env.PORT ?? 5000;


dbConnection().then(() => {
  // initializeBirthdayScheduler();
  app.use("/api", router);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
