export type Config = {
  port: string;
  nodeEnv: string;
  postgres: {
    host: string;
    port: number;
    user: string;
    password: string;
    db: string;
  };
};
