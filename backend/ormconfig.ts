// backend/ormconfig.ts
import { DataSource } from "typeorm";


export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'plyo_user',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'plyo_leads',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/database/migrations/*{.ts,.js}"],
  subscribers: ["src/database/subscribers/*{.ts,.js}"],
});
