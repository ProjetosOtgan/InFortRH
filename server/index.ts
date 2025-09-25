import express from "express"
import cors from "cors"
import path from "path"

// Importar rotas
import authRoutes from "./routes/auth"
import userRoutes from "./routes/users"
import payslipRoutes from "./routes/payslips"
import timeoffRoutes from "./routes/timeoff"
import meetingRoutes from "./routes/meetings"
import announcementRoutes from "./routes/announcements"
import eventRoutes from "./routes/events"
import notificationRoutes from "./routes/notifications"
import meRoutes from "./routes/me"
import downloadRoutes from "./routes/downloads"

const app = express()
const PORT = Number.parseInt(process.env.PORT || "3001")

const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://fmarechal.com", "https://www.fmarechal.com"]
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Middleware para logs de request
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Servir arquivos estáticos
app.use("/uploads", express.static(path.resolve("uploads")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../.next/static")))
  app.use("/_next", express.static(path.join(__dirname, "../.next")))
}

// Rotas da API
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/payslips", payslipRoutes)
app.use("/api/timeoff-requests", timeoffRoutes)
app.use("/api/meetings", meetingRoutes)
app.use("/api/announcements", announcementRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/me/notifications", notificationRoutes)
app.use("/api/me", meRoutes)
app.use("/api/downloads", downloadRoutes)

// Rota de teste de saúde
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor InFort RH funcionando",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
})

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../.next/server/pages/index.html"))
  })
}

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Erro:", err)
  res.status(500).json({ error: "Erro interno do servidor" })
})

// Rota 404 para API
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "Rota da API não encontrada" })
})

// Iniciar servidor
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`🔗 API disponível em: http://${HOST}:${PORT}/api`)
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`)
})

export default app
