import { config } from "dotenv";
config();

export const envs = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  host: process.env.HOST,
  grant_type: process.env.GRANT_TYPE,
};