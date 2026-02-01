import { config } from 'dotenv';

config();

export const envConfig = {
  PORT: Number(process.env.PORT),
  DB_URL: String(process.env.DATABASE_URL),
  TOKEN_KEY: String(process.env.TOKEN_KEY),
  TOKEN_TIME: Number(process.env.TOKEN_TIME),
  SUPERADMIN_USERNAME: String(process.env.SUPERADMIN_USERNAME),
  SUPERADMIN_PASSWORD: String(process.env.SUPERADMIN_PASSWORD),
  SUPERADMIN_PHONE_NUMBER: String(process.env.SUPERADMIN_PHONE_NUMBER),
  FILE_PATH: String(process.env.FILE_PATH),
  BASE_URL: String(process.env.BASE_URL)
};