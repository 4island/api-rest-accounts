import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER_NAME || "",
    password: process.env.PASSWORD || ""
};
