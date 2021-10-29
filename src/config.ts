import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  env: string;
  port: number;
  secretKey: string;
  log: {
    format: string;
    dir: string;
  };
  dbConfig: {
    host: string;
    port: string;
    name: string;
    user: string;
    password: string;
  };
  cors: {
    origin: string;
    credentials: boolean;
  };
}

export const config: Config = Object.freeze({
  env: process.env.ENV || 'development',
  port: parseInt((process.env.PORT as string) || '8000'),
  dbConfig: {
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT || '5432',
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
  },
  secretKey: process.env.SECRET_KEY as string,
  cors: {
    origin: (process.env.CORS_ORIGIN as string) || '*',
    credentials: (process.env.CORS_CREDENTIALS as string) === 'true',
  },
  log: {
    format: process.env.LOG_FORMAT as string,
    dir: process.env.LOG_DIR as string,
  },
});
