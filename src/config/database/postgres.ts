import { Client } from 'pg';
import config from '../common/index';
import { PostgresError } from '../../errors/postgres-error';

class PostgresDb {
  private client: Client;

  public initializeClient = async (): Promise<void> => {
    try {
      this.client = new Client({
        user: config.postgres.user,
        host: config.postgres.host,
        database: config.postgres.db,
        password: config.postgres.password,
        port: config.postgres.port,
      });
      await this.client.connect();
      console.info('Database Connected!');
    } catch (error) {
      console.error('Error initializing Postgres: ', error);
      throw new PostgresError('postgres-initializing');
    }
  };

  public execute = async (query: string, values?: any): Promise<any[]> => {
    try {
      const result: any = await this.client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new PostgresError('postgres-query');
    }
  };

  public initialConfiguration = async (): Promise<void> => {
    try {
      const initialDdl = `
      CREATE TABLE IF NOT EXISTS "history" (
        "id" bigserial NOT NULL,
        "email" VARCHAR(100) NOT NULL,
        "type" VARCHAR(100) NOT NULL,
        "date" timestamp NOT NULL,
        CONSTRAINT history_pkey PRIMARY KEY ("id")
      );`;
      await this.client.query(initialDdl);
    } catch (error) {
      console.error(error);
      throw new PostgresError('postgres-initial-ddl');
    }
  };
}

export const postgresDb = new PostgresDb();
