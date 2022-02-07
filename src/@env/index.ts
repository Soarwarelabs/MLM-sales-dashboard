import { ENV } from "interfaces/env";

export const env: ENV = {
  API_KEY: process.env.REACT_APP_API_KEY || "",
  AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN || "",
  PROJECT_ID: process.env.REACT_APP_PROJECT_ID || "",
  PROJECT_BUCKET: process.env.REACT_APP_PROJECT_BUCKET || "",
  MESSENGER_SENDER_ID: process.env.REACT_APP_MESSENGER_SENDER_ID || "",
  APP_ID: process.env.REACT_APP_APP_ID || "",
  MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID || "",
  VAPID_KEY: process.env.REACT_APP_VAPID_KEY || "",
  NODE_ENV: process.env.NODE_ENV,
};
