import type { Config } from './types';

const config: Config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  },
};

export default config;
