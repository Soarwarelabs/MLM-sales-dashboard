import { env } from "@env";

export const logger = (log: any) => {
  if (env.NODE_ENV === "development" || env.NODE_ENV === "test") {
    console.log(log);
  }
};
