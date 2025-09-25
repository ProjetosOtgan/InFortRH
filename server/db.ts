import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../shared/schema"

const connection = new Pool({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "postgres",
  port: Number.parseInt(process.env.PGPORT || "5432"),
  max: 10,
  connectionTimeoutMillis: 60000,
  idleTimeoutMillis: 60000,
  ssl: false,
})

export const db = drizzle(connection, { schema })

connection
  .getConnection()
  .then((conn) => {
    console.log("✅ Conexão MySQL estabelecida com sucesso")
    conn.release()
  })
  .catch((err) => {
    console.error("❌ Erro na conexão MySQL:", err.message)
  })
