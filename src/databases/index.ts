import { config } from '../config';
import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const db = config.dbConfig;
const dbConnection = {
  client: 'pg',
  connection: {
    charset: 'utf8',
    timezone: 'UTC',
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.name,
    port: db.port,
  },
  pool: {
    min: 2,
    max: 10,
  },
  ...knexSnakeCaseMappers(),
};

export default Knex(dbConnection);
