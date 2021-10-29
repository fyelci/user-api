import { config } from './src/config';

const db = config.dbConfig;
export = {
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
  migrations: {
    directory: 'src/databases/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: 'src/databases/seeds',
  },
};
