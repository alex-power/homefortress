import { Router, type Request, type Response } from "express"
import type { PiholeClient } from "../services/PiholeClient"
import type { ParentalControlService } from "../services/ParentalControlService"
import { authMiddleware } from "../middleware/auth"

export class PiholeController {
  public router: Router
  private piholeClient: PiholeClient
  private parentalService: ParentalControlService

  constructor(piholeClient: PiholeClient, parentalService: ParentalControlService) {
    this.router = Router()
    this.piholeClient = piholeClient
    this.parentalService = parentalService
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // Public routes
    this.router.get("/status", this.getStatus.bind(this))
    this.router.get("/stats", this.getStats.bind(this))
    this.router.get("/top-domains", this.getTopDomains.bind(this))
    this.router.get("/top-blocked", this.getTopBlocked.bind(this))
    this.router.get("/top-clients", this.getTopClients.bind(this))
    this.router.get("/query-types", this.getQueryTypes.bind(this))
    this.router.get("/forward-destinations", this.getForwardDestinations.bind(this))
    this.router.get("/recent-queries", this.getRecentQueries.bind(this))
    this.router.get("/recent-blocked", this.getRecentBlocked.bind(this))
    this.router.get("/network-clients", this.getNetworkClients.bind(this))

    // Protected routes
    this.router.use(authMiddleware)
    this.router.post("/enable", this.enablePihole.bind(this))
    this.router.post("/disable", this.disablePihole.bind(this))
    this.router.post("/blacklist", this.addToBlacklist.bind(this))
    this.router.post("/whitelist", this.addToWhitelist.bind(this))
    this.router.delete("/blacklist/:domain", this.removeFromBlacklist.bind(this))
    this.router.delete("/whitelist/:domain", this.removeFromWhitelist.bind(this))
    this.router.get("/blacklist", this.getBlacklist.bind(this))
    this.router.get("/whitelist", this.getWhitelist.bind(this))
    this.router.get("/regexlist", this.getRegexlist.bind(this))
    this.router.get("/groups", this.getGroups.bind(this))
    this.router.post("/update-gravity", this.updateGravity.bind(this))
  }

  // Route handlers
  private async getStatus(req: Request, res: Response) {
    try {
      const status = await this.piholeClient.getEnhancedStatus()
      res.json(status)
    } catch (error) {
      console.error("Error getting status:", error)
      res.status(500).json({ error: "Failed to get Pi-hole status" })
    }
  }

  private async getStats(req: Request, res: Response) {
    try {
      const ftlStats = await this.piholeClient.getFTLStats()
      res.json(ftlStats)
    } catch (error) {
      console.error("Error getting FTL stats:", error)
      res.status(500).json({ error: "Failed to get Pi-hole FTL stats" })
    }
  }

  private async getTopDomains(req: Request, res: Response) {
    try {
      const count = req.query.count ? Number.parseInt(req.query.count as string) : 10
      const topDomains = await this.piholeClient.getTopDomains(count)
      res.json(topDomains)
    } catch (error) {
      console.error("Error getting top domains:", error)
      res.status(500).json({ error: "Failed to get top domains" })
    }
  }

  private async getTopBlocked(req: Request, res: Response) {
    try {
      const count = req.query.count ? Number.parseInt(req.query.count as string) : 10
      const topBlocked = await this.piholeClient.getTopBlockedDomains(count)
      res.json(topBlocked)
    } catch (error) {
      console.error("Error getting top blocked domains:", error)
      res.status(500).json({ error: "Failed to get top blocked domains" })
    }
  }

  private async getTopClients(req: Request, res: Response) {
    try {
      const count = req.query.count ? Number.parseInt(req.query.count as string) : 10
      const topClients = await this.piholeClient.getTopClients(count)
      res.json(topClients)
    } catch (error) {
      console.error("Error getting top clients:", error)
      res.status(500).json({ error: "Failed to get top clients" })
    }
  }

  private async getQueryTypes(req: Request, res: Response) {
    try {
      const queryTypes = await this.piholeClient.getQueryTypes()
      res.json(queryTypes)
    } catch (error) {
      console.error("Error getting query types:", error)
      res.status(500).json({ error: "Failed to get query types" })
    }
  }

  private async getForwardDestinations(req: Request, res: Response) {
    try {
      const forwardDestinations = await this.piholeClient.getForwardDestinations()
      res.json(forwardDestinations)
    } catch (error) {
      console.error("Error getting forward destinations:", error)
      res.status(500).json({ error: "Failed to get forward destinations" })
    }
  }

  private async getRecentQueries(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 100
      const queries = await this.piholeClient.getQueries(limit)
      res.json(queries)
    } catch (error) {
      console.error("Error getting recent queries:", error)
      res.status(500).json({ error: "Failed to get recent queries" })
    }
  }

  private async getRecentBlocked(req: Request, res: Response) {
    try {
      const recentBlocked = await this.piholeClient.getRecentBlocked()
      res.json({ domain: recentBlocked })
    } catch (error) {
      console.error("Error getting recent blocked domain:", error)
      res.status(500).json({ error: "Failed to get recent blocked domain" })
    }
  }

  private async getNetworkClients(req: Request, res: Response) {
    try {
      const clients = await this.piholeClient.getNetworkClients()
      res.json(clients)
    } catch (error) {
      console.error("Error getting network clients:", error)
      res.status(500).json({ error: "Failed to get network clients" })
    }
  }

  private async enablePihole(req: Request, res: Response) {
    try {
      const result = await this.piholeClient.enablePihole()
      res.json(result)
    } catch (error) {
      console.error("Error enabling Pi-hole:", error)
      res.status(500).json({ error: "Failed to enable Pi-hole" })
    }
  }

  private async disablePihole(req: Request, res: Response) {
    try {
      const seconds = req.body.seconds ? Number.parseInt(req.body.seconds) : 0
      const result = await this.piholeClient.disablePihole(seconds)
      res.json(result)
    } catch (error) {
      console.error("Error disabling Pi-hole:", error)
      res.status(500).json({ error: "Failed to disable Pi-hole" })
    }
  }

  private async addToBlacklist(req: Request, res: Response) {
    try {
      const { domain, comment } = req.body
      if (!domain) {
        return res.status(400).json({ error: "Domain is required" })
      }
      const result = await this.piholeClient.addDomainToBlacklist(domain, comment)
      res.json(result)
    } catch (error) {
      console.error("Error adding to blacklist:", error)
      res.status(500).json({ error: "Failed to add domain to blacklist" })
    }
  }

  private async addToWhitelist(req: Request, res: Response) {
    try {
      const { domain, comment } = req.body
      if (!domain) {
        return res.status(400).json({ error: "Domain is required" })
      }
      const result = await this.piholeClient.addDomainToWhitelist(domain, comment)
      res.json(result)
    } catch (error) {
      console.error("Error adding to whitelist:", error)
      res.status(500).json({ error: "Failed to add domain to whitelist" })
    }
  }

  private async removeFromBlacklist(req: Request, res: Response) {
    try {
      const { domain } = req.params
      const result = await this.piholeClient.removeDomainFromBlacklist(domain)
      res.json(result)
    } catch (error) {
      console.error("Error removing from blacklist:", error)
      res.status(500).json({ error: "Failed to remove domain from blacklist" })
    }
  }

  private async removeFromWhitelist(req: Request, res: Response) {
    try {
      const { domain } = req.params
      const result = await this.piholeClient.removeDomainFromWhitelist(domain)
      res.json(result)
    } catch (error) {
      console.error("Error removing from whitelist:", error)
      res.status(500).json({ error: "Failed to remove domain from whitelist" })
    }
  }

  private async getBlacklist(req: Request, res: Response) {
    try {
      const blacklist = await this.piholeClient.getBlacklist()
      res.json(blacklist)
    } catch (error) {
      console.error("Error getting blacklist:", error)
      res.status(500).json({ error: "Failed to get blacklist" })
    }
  }

  private async getWhitelist(req: Request, res: Response) {
    try {
      const whitelist = await this.piholeClient.getWhitelist()
      res.json(whitelist)
    } catch (error) {
      console.error("Error getting whitelist:", error)
      res.status(500).json({ error: "Failed to get whitelist" })
    }
  }

  private async getRegexlist(req: Request, res: Response) {
    try {
      const regexlist = await this.piholeClient.getRegexlist()
      res.json(regexlist)
    } catch (error) {
      console.error("Error getting regexlist:", error)
      res.status(500).json({ error: "Failed to get regexlist" })
    }
  }

  private async getGroups(req: Request, res: Response) {
    try {
      const groups = await this.piholeClient.getGroups()
      res.json(groups)
    } catch (error) {
      console.error("Error getting groups:", error)
      res.status(500).json({ error: "Failed to get groups" })
    }
  }

  private async updateGravity(req: Request, res: Response) {
    try {
      const result = await this.piholeClient.updateGravity()
      res.json(result)
    } catch (error) {
      console.error("Error updating gravity:", error)
      res.status(500).json({ error: "Failed to update gravity" })
    }
  }
}

