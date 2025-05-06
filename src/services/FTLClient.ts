import net from "net"
import { EventEmitter } from "events"

export class FTLClient extends EventEmitter {
  private socket: net.Socket | null = null
  private buffer = ""
  private connected = false
  private socketPath: string
  private connectTimeout: number
  private responseTimeout: number

  constructor(socketPath = "/run/pihole-FTL.sock", connectTimeout = 5000, responseTimeout = 10000) {
    super()
    this.socketPath = socketPath
    this.connectTimeout = connectTimeout
    this.responseTimeout = responseTimeout
  }

  async connect(): Promise<void> {
    if (this.connected) {
      return
    }

    return new Promise((resolve, reject) => {
      this.socket = net.createConnection({ path: this.socketPath })

      const connectTimeout = setTimeout(() => {
        this.socket?.destroy()
        reject(new Error(`Connection timeout after ${this.connectTimeout}ms`))
      }, this.connectTimeout)

      this.socket.on("connect", () => {
        clearTimeout(connectTimeout)
        this.connected = true
        this.emit("connected")
        resolve()
      })

      this.socket.on("data", (data) => {
        this.buffer += data.toString()
        this.emit("data", data.toString())
      })

      this.socket.on("error", (error) => {
        this.connected = false
        this.emit("error", error)
        reject(error)
      })

      this.socket.on("close", () => {
        this.connected = false
        this.emit("disconnected")
      })
    })
  }

  async disconnect(): Promise<void> {
    if (!this.connected || !this.socket) {
      return
    }

    return new Promise((resolve) => {
      this.socket?.end(() => {
        this.connected = false
        this.socket = null
        resolve()
      })
    })
  }

  async sendCommand(command: string): Promise<string> {
    if (!this.connected || !this.socket) {
      await this.connect()
    }

    return new Promise((resolve, reject) => {
      // Clear the buffer before sending a new command
      this.buffer = ""

      const responseTimeout = setTimeout(() => {
        reject(new Error(`Response timeout after ${this.responseTimeout}ms`))
      }, this.responseTimeout)

      // Set up a one-time data listener for this command
      const dataHandler = (data: string) => {
        // Check if the response is complete (ends with a newline)
        if (this.buffer.endsWith("\n")) {
          clearTimeout(responseTimeout)
          this.socket?.removeListener("data", dataHandler)
          resolve(this.buffer.trim())
        }
      }

      this.socket?.on("data", dataHandler)

      // Send the command
      this.socket?.write(`${command}\n`, (err) => {
        if (err) {
          clearTimeout(responseTimeout)
          this.socket?.removeListener("data", dataHandler)
          reject(err)
        }
      })
    })
  }

  async getStats(): Promise<Record<string, string>> {
    const response = await this.sendCommand(">stats")
    const lines = response.split("\n")
    const stats: Record<string, string> = {}

    for (const line of lines) {
      if (line.includes(":")) {
        const [key, value] = line.split(":").map((part) => part.trim())
        stats[key] = value
      }
    }

    return stats
  }

  async getTopDomains(count = 10): Promise<string[]> {
    const response = await this.sendCommand(`>top-domains (${count})`)
    return response.split("\n").filter((line) => line.trim() !== "")
  }

  async getTopClients(count = 10): Promise<string[]> {
    const response = await this.sendCommand(`>top-clients (${count})`)
    return response.split("\n").filter((line) => line.trim() !== "")
  }

  async getForwardDestinations(): Promise<string[]> {
    const response = await this.sendCommand(">forward-dest")
    return response.split("\n").filter((line) => line.trim() !== "")
  }

  async getQueryTypes(): Promise<string[]> {
    const response = await this.sendCommand(">querytypes")
    return response.split("\n").filter((line) => line.trim() !== "")
  }

  async getVersion(): Promise<string> {
    const response = await this.sendCommand(">version")
    return response.trim()
  }

  async getDbStats(): Promise<string[]> {
    const response = await this.sendCommand(">dbstats")
    return response.split("\n").filter((line) => line.trim() !== "")
  }

  async getClientNames(): Promise<Record<string, string>> {
    const response = await this.sendCommand(">clientnames")
    const lines = response.split("\n").filter((line) => line.trim() !== "")
    const clientNames: Record<string, string> = {}

    for (const line of lines) {
      const [ip, name] = line.split(" ").map((part) => part.trim())
      if (ip && name) {
        clientNames[ip] = name
      }
    }

    return clientNames
  }

  async getOverTimeData(seconds = 600): Promise<string[]> {
    const response = await this.sendCommand(`>overTime (${seconds})`)
    return response.split("\n").filter((line) => line.trim() !== "")
  }
}

