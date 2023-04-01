/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import express, { type Request, type Response, type NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/environment";
import { logger } from "./utils/logger";
import { routes } from "./routes";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import { deserializedToken } from "./middleware/auth.middleware";

dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(config.db as string)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error(err));

const app = express();
const port = config.port || 5000;
const CLIENT_BASE_URL = config.client_base_url || "http://127.0.0.1:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// DIRECTORY PATH
const _filename = path.join(__dirname);
const _dirname = path.dirname(_filename);
app.use("/assets", express.static(path.join(_dirname, "public/assets")));

// Cors
app.use(
  cors({
    origin: [CLIENT_BASE_URL, "http://127.0.0.1:4173", "*"],
    credentials: true
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(deserializedToken);

// All routes
routes(app);

app.use("/", (req: Request, res: Response) => {
  res.status(200).send({ status: true, statusCode: 200, message: `Server is running on port ${port}.` });
});

app.listen(port, () => {
  logger.info(`Server listening on port ${port}, url: http://localhost:${port}`);
});
