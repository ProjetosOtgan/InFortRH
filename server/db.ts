import mysql from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"
import * as schema from "../shared/schema"

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  ssl: false,
  charset: "utf8mb4",
  timezone: "+00:00",
})

export const db = drizzle(connection, { schema, mode: "default" })

connection
  .getConnection()
  .then((conn) => {
    console.log("✅ Conexão MySQL estabelecida com sucesso")
    conn.release()
  })
  .catch((err) => {
    console.error("❌ Erro na conexão MySQL:", err.message)
  })
