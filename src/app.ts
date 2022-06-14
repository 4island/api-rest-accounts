import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import router from "./routes/bank.routes";

const app = express();

app.use(cors());

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/bank", router);


export default app;
