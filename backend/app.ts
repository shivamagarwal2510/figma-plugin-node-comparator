require("dotenv").config();
import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
export const app = express();
import authRouter from "./routes/auth"
// body parser
app.use(express.json({"limit":"50mb"}));

// cors
app.use(cors());

app.use('/api/auth', authRouter);
