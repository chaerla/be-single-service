import { join } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSourceOptions } from 'typeorm';

const nodeEnv = process.env.NODE_ENV || '';
const config = dotenv.parse(fs.readFileSync(`${nodeEnv}.env`));

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  //host: '10.58.224.3',
  port: parseInt(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
  synchronize: false,
  logging: true,
  migrationsRun: true,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
};
