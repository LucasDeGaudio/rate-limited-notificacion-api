import { postgresDb } from '../config/database/postgres';
import { configurationConstants } from '../constants/configuration';
import { PostgresError } from '../errors/postgres-error';
import { TimeConfig } from '../interfaces/resources/configuration';

class PostgresRepository {
  public getCurrentValueByTypeAndEmail = async (
    type: string,
    email: string,
  ): Promise<TimeConfig> => {
    try {
      const allowedConfig: TimeConfig = configurationConstants[type];

      const query = ` SELECT count(id) FROM history
      WHERE date > current_timestamp - interval '1 minutes' * $1
      and email = $4
      and type = $5
      union all
      SELECT count(id) FROM history
      WHERE date > current_timestamp - interval '1 hours' * $2
      and email = $4
      and type = $5
      union all
      SELECT count(id) FROM history
      WHERE date > current_timestamp - interval '1 days' * $3
      and email = $4
      and type = $5`;

      const history: any[] = await postgresDb.execute(query, [
        allowedConfig.minutes,
        allowedConfig.hours,
        allowedConfig.days,
        email,
        type,
      ]);

      return {
        minutes: Number(history[0].count),
        hours: Number(history[1].count),
        days: Number(history[2].count),
      };
    } catch (error) {
      console.error(
        '<postgres-repository> Error getting current values: ',
        error,
      );
      throw new PostgresError('getCurrentValue');
    }
  };

  public addHistory = async (type: string, email: string): Promise<void> => {
    try {
      const query = `INSERT INTO history (email, type, date) values ($1, $2, now())`;
      await postgresDb.execute(query, [email, type]);
    } catch (error) {
      console.error('<postgres-repository> Error adding history: ', error);
      throw new PostgresError('addHistory');
    }
  };
}

export const postgresRepository = new PostgresRepository();
