import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "../shared/schema"

const sqlite = new Database("./database.db")
export const db = drizzle(sqlite, { schema })

try {
  console.log("✅ Conexão SQLite estabelecida com sucesso")
} catch (err: any) {
  console.error("❌ Erro na conexão SQLite:", err.message)
}
