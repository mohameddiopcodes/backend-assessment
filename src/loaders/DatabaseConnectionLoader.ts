import { Connection, createConnection, ConnectionOptions } from "typeorm";
import { Car } from "../api/models";

export async function DatabaseConnectionLoader (
): Promise<Connection> {
  const mysql_config : ConnectionOptions = {
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Car],
    synchronize: true,
    logging: false
  };
  const connection: Connection = await createConnection(mysql_config);
  console.log("[database] connected", connection.name);

  return connection;
}
