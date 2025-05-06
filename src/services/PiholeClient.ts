import axios, { type AxiosInstance } from "axios"
import { FTLClient } from "./FTLClient"
import type {
  PiholeStatus,
  QueryType,
  ForwardDestination,
  Query,
  TopItem,
  ClientItem,
  PiholeListItem,
  PiholeGroup,
} from "../types/pihole"

export class PiholeClient {
  private baseUrl: string
  private authToken: string
  private ftlClient: FTLClient
  private httpClient: AxiosInstance

  constructor(baseUrl = "http://localhost/admin/api.php", authToken = "", ftlSocketPath = "/run/pihole-FTL.sock") {
    this.baseUrl = baseUrl
    this.authToken = authToken
    this.ftlClient = new FTLClient(ftlSocketPath)

    this.httpClient = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  }

  // HTTP API Methods

  async getStatus(): Promise<PiholeStatus> {
    const response = await this.httpClient.get("?summary")
    return response.data
  }

  async getQueryTypes(): Promise<{ querytypes: QueryType[] }> {
    const response = await this.httpClient.get("?getQueryTypes")
    return response.data
  }

  async getForwardDestinations(): Promise<{ forward_destinations: ForwardDestination[] }> {
    const response = await this.httpClient.get("?getForwardDestinations")
    return response.data
  }

  async getQueries(limit = 100): Promise<Query[]> {
    const response = await this.httpClient.get(`?getAllQueries=${limit}`)
    return response.data.data || []
  }

  async getTopDomains(count = 10): Promise<TopItem[]> {
    const response = await this.httpClient.get(`?topItems=${count}`)
    return response.data.top_queries || []
  }

  async getTopBlockedDomains(count = 10): Promise<TopItem[]> {
    const response = await this.httpClient.get(`?topItems=${count}`)
    return response.data.top_ads || []
  }

  async getTopClients(count = 10): Promise<ClientItem[]> {
    const response = await this.httpClient.get(`?topClients=${count}`)
    return response.data.top_sources || []
  }

  async getRecentBlocked(): Promise<string> {
    const response = await this.httpClient.get("?recentBlocked")
    return response.data
  }

  async enablePihole(): Promise<{ status: string }> {
    const response = await this.httpClient.get(`?enable&auth=${this.authToken}`)
    return response.data
  }

  async disablePihole(seconds = 0): Promise<{ status: string }> {
    const endpoint = seconds > 0 ? `?disable=${seconds}&auth=${this.authToken}` : `?disable&auth=${this.authToken}`

    const response = await this.httpClient.get(endpoint)
    return response.data
  }

  async addDomainToBlacklist(domain: string, comment = ""): Promise<{ success: boolean; message: string }> {
    const response = await this.httpClient.get(
      `?add=${domain}&comment=${encodeURIComponent(comment)}&auth=${this.authToken}`,
    )
    return response.data
  }

  async addDomainToWhitelist(domain: string, comment = ""): Promise<{ success: boolean; message: string }> {
    const response = await this.httpClient.get(
      `?add=${domain}&list=white&comment=${encodeURIComponent(comment)}&auth=${this.authToken}`,
    )
    return response.data
  }

  async removeDomainFromBlacklist(domain: string): Promise<{ success: boolean; message: string }> {
    const response = await this.httpClient.get(`?delete=${domain}&auth=${this.authToken}`)
    return response.data
  }

  async removeDomainFromWhitelist(domain: string): Promise<{ success: boolean; message: string }> {
    const response = await this.httpClient.get(`?delete=${domain}&list=white&auth=${this.authToken}`)
    return response.data
  }

  async getBlacklist(): Promise<PiholeListItem[]> {
    const response = await this.httpClient.get(`?list=black&auth=${this.authToken}`)
    return response.data.data || []
  }

  async getWhitelist(): Promise<PiholeListItem[]> {
    const response = await this.httpClient.get(`?list=white&auth=${this.authToken}`)
    return response.data.data || []
  }

  async getRegexlist(): Promise<PiholeListItem[]> {
    const response = await this.httpClient.get(`?list=regex&auth=${this.authToken}`)
    return response.data.data || []
  }

  async getGroups(): Promise<PiholeGroup[]> {
    const response = await this.httpClient.get(`?groups&auth=${this.authToken}`)
    return response.data.data || []
  }

  async updateGravity(): Promise<{ success: boolean; message: string }> {
    const response = await this.httpClient.get(`?updateGravity&auth=${this.authToken}`)
    return response.data
  }

  // FTL Socket Methods

  async connectToFTL(): Promise<void> {
    return this.ftlClient.connect()
  }

  async disconnectFromFTL(): Promise<void> {
    return this.ftlClient.disconnect()
  }

  async getFTLStats(): Promise<Record<string, string>> {
    return this.ftlClient.getStats()
  }

  async getFTLVersion(): Promise<string> {
    return this.ftlClient.getVersion()
  }

  async getFTLDbStats(): Promise<string[]> {
    return this.ftlClient.getDbStats()
  }

  async getFTLClientNames(): Promise<Record<string, string>> {
    return this.ftlClient.getClientNames()
  }

  async getFTLOverTimeData(seconds = 600): Promise<string[]> {
    return this.ftlClient.getOverTimeData(seconds)
  }

  // Combined methods that use both APIs for enhanced functionality

  async getEnhancedStatus(): Promise<any> {
    try {
      const [httpStatus, ftlStats] = await Promise.all([this.getStatus(), this.getFTLStats().catch(() => ({}))])

      return {
        ...httpStatus,
        ftl_stats: ftlStats,
      }
    } catch (error) {
      console.error("Error getting enhanced status:", error)
      throw error
    }
  }

  async getNetworkClients(): Promise<any[]> {
    try {
      const [clientNames, topClients] = await Promise.all([
        this.getFTLClientNames().catch(() => ({})),
        this.getTopClients(100).catch(() => []),
      ])

      // Combine the data
      const clients = Object.entries(clientNames).map(([ip, name]) => {
        const clientStats = topClients.find((client) => client.ip === ip)
        return {
          ip,
          name,
          queries: clientStats?.count || 0,
        }
      })

      // Add any clients from topClients that weren't in clientNames
      topClients.forEach((client) => {
        if (!clientNames[client.ip]) {
          clients.push({
            ip: client.ip,
            name: client.name || client.ip,
            queries: client.count,
          })
        }
      })

      return clients
    } catch (error) {
      console.error("Error getting network clients:", error)
      throw error
    }
  }
}

