import { config } from "dotenv";
config();

export const envConfig = {
    PORT: Number(process.env.PORT),
    MONGO_URL: String(process.env.MONGO_URL),
    SUPERADMIN: {
        PHONE: String(process.env.SUPERADMIN_PHONE),
        PASSWORD: String(process.env.SUPERADMIN_PASSWORD)
    },
    TOKEN: {
        ACCESS_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TIME: String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TIME: String(process.env.REFRESH_TOKEN_TIME)
    }
};