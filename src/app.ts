import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import { createConnection } from "typeorm"
import path from "path"
import { PiholeClient } from "./services/PiholeClient"
import { ParentalControlService } from "./services/ParentalControlService"
import { PiholeController } from "./controllers/PiholeController"
import { ParentalController } from "./controllers/ParentalController"
import { User } from "./entity/User"
import { DeviceGroup } from "./entity/DeviceGroup"
import { Device } from "./entity/Device"
import { AccessSchedule } from "./entity/AccessSchedule"
import { ContentRule } from "./entity/ContentRule"
import { DomainOverride } from "./entity/DomainOverride"

// Load environment variables
const PIHOLE_API_BASE = process.env.PIHOLE_API_BASE || "http://localhost/admin/api.php"
const PIHOLE_AUTH_TOKEN = process.env.PIHOLE_AUTH_TOKEN || ""
const PIHOLE_FTL_SOCKET = process.env.PIHOLE_FTL_SOCKET || "/run/pihole-FTL.sock"
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 8080
const DB_PATH = process.env.DB_PATH || path.resolve(__dirname, "../data/pihole-enhanced.sqlite")

// Initialize database connection
async function initializeApp() {
  try {
    // Connect to SQLite database
    const connection = await createConnection({
      type: "sqlite",
      database: DB_PATH,
      entities: [User, DeviceGroup, Device, AccessSchedule, ContentRule, DomainOverride],
      synchronize: true, // Set to false in production and use migrations
      logging: process.env.NODE_ENV === "development",
    })

    console.log("Database connection established")

    // Initialize Pi-hole client
    const piholeClient = new PiholeClient(PIHOLE_API_BASE, PIHOLE_AUTH_TOKEN, PIHOLE_FTL_SOCKET)

    // Initialize parental control service
    const parentalService = new ParentalControlService(piholeClient)

    // Create Express app
    const app = express()

    // Middleware
    app.use(helmet())
    app.use(cors())
    app.use(compression())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, "public")))

    // Initialize controllers
    const piholeController = new PiholeController(piholeClient, parentalService)
    const parentalController = new ParentalController(parentalService)

    // Routes
    app.use("/api/pihole", piholeController.router)
    app.use("/api/parental", parentalController.router)

    // Error handling middleware
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack)
      res.status(500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined,
      })
    })

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

    // Schedule task to enforce parental controls
    setInterval(async () => {
      try {
        await parentalService.enforceSchedules()
      } catch (error) {
        console.error("Error enforcing schedules:", error)
      }
    }, 60000) // Check every minute

    return { app, connection }
  } catch (error) {
    console.error("Failed to initialize application:", error)
    throw error
  }
}

// Start the application
if (require.main === module) {
  initializeApp().catch((err) => {
    console.error("Application failed to start:", err)
    process.exit(1)
  })
}

export default initializeApp

