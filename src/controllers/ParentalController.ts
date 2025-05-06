import { Router, type Request, type Response } from "express"
import type { ParentalControlService } from "../services/ParentalControlService"
import { authMiddleware } from "../middleware/auth"

export class ParentalController {
  public router: Router
  private parentalService: ParentalControlService

  constructor(parentalService: ParentalControlService) {
    this.router = Router()
    this.parentalService = parentalService
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // All routes require authentication
    this.router.use(authMiddleware)

    // Device Groups
    this.router.get("/groups", this.getDeviceGroups.bind(this))
    this.router.get("/groups/:id", this.getDeviceGroup.bind(this))
    this.router.post("/groups", this.createDeviceGroup.bind(this))
    this.router.put("/groups/:id", this.updateDeviceGroup.bind(this))
    this.router.delete("/groups/:id", this.deleteDeviceGroup.bind(this))

    // Devices
    this.router.get("/devices", this.getDevices.bind(this))
    this.router.get("/devices/:id", this.getDevice.bind(this))
    this.router.post("/devices", this.createDevice.bind(this))
    this.router.put("/devices/:id", this.updateDevice.bind(this))
    this.router.delete("/devices/:id", this.deleteDevice.bind(this))
    this.router.post("/devices/sync", this.syncDevices.bind(this))

    // Access Schedules
    this.router.get("/schedules", this.getAccessSchedules.bind(this))
    this.router.get("/groups/:groupId/schedules", this.getGroupSchedules.bind(this))
    this.router.post("/schedules", this.createAccessSchedule.bind(this))
    this.router.put("/schedules/:id", this.updateAccessSchedule.bind(this))
    this.router.delete("/schedules/:id", this.deleteAccessSchedule.bind(this))

    // Content Rules
    this.router.get("/content-rules", this.getContentRules.bind(this))
    this.router.get("/groups/:groupId/content-rules", this.getGroupContentRules.bind(this))
    this.router.post("/content-rules", this.createContentRule.bind(this))
    this.router.put("/content-rules/:id", this.updateContentRule.bind(this))
    this.router.delete("/content-rules/:id", this.deleteContentRule.bind(this))

    // Domain Overrides
    this.router.get("/domain-overrides", this.getDomainOverrides.bind(this))
    this.router.get("/groups/:groupId/domain-overrides", this.getGroupDomainOverrides.bind(this))
    this.router.post("/domain-overrides", this.createDomainOverride.bind(this))
    this.router.put("/domain-overrides/:id", this.updateDomainOverride.bind(this))
    this.router.delete("/domain-overrides/:id", this.deleteDomainOverride.bind(this))
  }

  // Device Groups
  private async getDeviceGroups(req: Request, res: Response) {
    try {
      const groups = await this.parentalService.getDeviceGroups()
      res.json(groups)
    } catch (error) {
      console.error("Error getting device groups:", error)
      res.status(500).json({ error: "Failed to get device groups" })
    }
  }

  private async getDeviceGroup(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const group = await this.parentalService.getDeviceGroup(id)
      if (!group) {
        return res.status(404).json({ error: "Device group not found" })
      }
      res.json(group)
    } catch (error) {
      console.error("Error getting device group:", error)
      res.status(500).json({ error: "Failed to get device group" })
    }
  }

  private async createDeviceGroup(req: Request, res: Response) {
    try {
      const groupData = req.body
      const group = await this.parentalService.createDeviceGroup(groupData)
      res.status(201).json(group)
    } catch (error) {
      console.error("Error creating device group:", error)
      res.status(500).json({ error: "Failed to create device group" })
    }
  }

  private async updateDeviceGroup(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const groupData = req.body
      const group = await this.parentalService.updateDeviceGroup(id, groupData)
      if (!group) {
        return res.status(404).json({ error: "Device group not found" })
      }
      res.json(group)
    } catch (error) {
      console.error("Error updating device group:", error)
      res.status(500).json({ error: "Failed to update device group" })
    }
  }

  private async deleteDeviceGroup(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const success = await this.parentalService.deleteDeviceGroup(id)
      if (!success) {
        return res.status(404).json({ error: "Device group not found" })
      }
      res.status(204).send()
    } catch (error) {
      console.error("Error deleting device group:", error)
      res.status(500).json({ error: "Failed to delete device group" })
    }
  }

  // Devices
  private async getDevices(req: Request, res: Response) {
    try {
      const devices = await this.parentalService.getDevices()
      res.json(devices)
    } catch (error) {
      console.error("Error getting devices:", error)
      res.status(500).json({ error: "Failed to get devices" })
    }
  }

  private async getDevice(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const device = await this.parentalService.getDevice(id)
      if (!device) {
        return res.status(404).json({ error: "Device not found" })
      }
      res.json(device)
    } catch (error) {
      console.error("Error getting device:", error)
      res.status(500).json({ error: "Failed to get device" })
    }
  }

  private async createDevice(req: Request, res: Response) {
    try {
      const deviceData = req.body
      const device = await this.parentalService.createDevice(deviceData)
      res.status(201).json(device)
    } catch (error) {
      console.error("Error creating device:", error)
      res.status(500).json({ error: "Failed to create device" })
    }
  }

  private async updateDevice(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const deviceData = req.body
      const device = await this.parentalService.updateDevice(id, deviceData)
      if (!device) {
        return res.status(404).json({ error: "Device not found" })
      }
      res.json(device)
    } catch (error) {
      console.error("Error updating device:", error)
      res.status(500).json({ error: "Failed to update device" })
    }
  }

  private async deleteDevice(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const success = await this.parentalService.deleteDevice(id)
      if (!success) {
        return res.status(404).json({ error: "Device not found" })
      }
      res.status(204).send()
    } catch (error) {
      console.error("Error deleting device:", error)
      res.status(500).json({ error: "Failed to delete device" })
    }
  }

  private async syncDevices(req: Request, res: Response) {
    try {
      await this.parentalService.syncDevicesWithNetwork()
      res.json({ success: true, message: "Devices synced successfully" })
    } catch (error) {
      console.error("Error syncing devices:", error)
      res.status(500).json({ error: "Failed to sync devices" })
    }
  }

  // Access Schedules
  private async getAccessSchedules(req: Request, res: Response) {
    try {
      const schedules = await this.parentalService.getAccessSchedules()
      res.json(schedules)
    } catch (error) {
      console.error("Error getting access schedules:", error)
      res.status(500).json({ error: "Failed to get access schedules" })
    }
  }

  private async getGroupSchedules(req: Request, res: Response) {
    try {
      const groupId = Number.parseInt(req.params.groupId)
      const schedules = await this.parentalService.getAccessSchedulesForGroup(groupId)
      res.json(schedules)
    } catch (error) {
      console.error("Error getting group schedules:", error)
      res.status(500).json({ error: "Failed to get group schedules" })
    }
  }

  private async createAccessSchedule(req: Request, res: Response) {
    try {
      const scheduleData = req.body
      const schedule = await this.parentalService.createAccessSchedule(scheduleData)
      res.status(201).json(schedule)
    } catch (error) {
      console.error("Error creating access schedule:", error)
      res.status(500).json({ error: "Failed to create access schedule" })
    }
  }

  private async updateAccessSchedule(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const scheduleData = req.body
      const schedule = await this.parentalService.updateAccessSchedule(id, scheduleData)
      if (!schedule) {
        return res.status(404).json({ error: "Access schedule not found" })
      }
      res.json(schedule)
    } catch (error) {
      console.error("Error updating access schedule:", error)
      res.status(500).json({ error: "Failed to update access schedule" })
    }
  }

  private async deleteAccessSchedule(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const success = await this.parentalService.deleteAccessSchedule(id)
      if (!success) {
        return res.status(404).json({ error: "Access schedule not found" })
      }
      res.status(204).send()
    } catch (error) {
      console.error("Error deleting access schedule:", error)
      res.status(500).json({ error: "Failed to delete access schedule" })
    }
  }

  // Content Rules
  private async getContentRules(req: Request, res: Response) {
    try {
      const rules = await this.parentalService.getContentRules()
      res.json(rules)
    } catch (error) {
      console.error("Error getting content rules:", error)
      res.status(500).json({ error: "Failed to get content rules" })
    }
  }

  private async getGroupContentRules(req: Request, res: Response) {
    try {
      const groupId = Number.parseInt(req.params.groupId)
      const rules = await this.parentalService.getContentRulesForGroup(groupId)
      res.json(rules)
    } catch (error) {
      console.error("Error getting group content rules:", error)
      res.status(500).json({ error: "Failed to get group content rules" })
    }
  }

  private async createContentRule(req: Request, res: Response) {
    try {
      const ruleData = req.body
      const rule = await this.parentalService.createContentRule(ruleData)
      res.status(201).json(rule)
    } catch (error) {
      console.error("Error creating content rule:", error)
      res.status(500).json({ error: "Failed to create content rule" })
    }
  }

  private async updateContentRule(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const ruleData = req.body
      const rule = await this.parentalService.updateContentRule(id, ruleData)
      if (!rule) {
        return res.status(404).json({ error: "Content rule not found" })
      }
      res.json(rule)
    } catch (error) {
      console.error("Error updating content rule:", error)
      res.status(500).json({ error: "Failed to update content rule" })
    }
  }

  private async deleteContentRule(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const success = await this.parentalService.deleteContentRule(id)
      if (!success) {
        return res.status(404).json({ error: "Content rule not found" })
      }
      res.status(204).send()
    } catch (error) {
      console.error("Error deleting content rule:", error)
      res.status(500).json({ error: "Failed to delete content rule" })
    }
  }

  // Domain Overrides
  private async getDomainOverrides(req: Request, res: Response) {
    try {
      const overrides = await this.parentalService.getDomainOverrides()
      res.json(overrides)
    } catch (error) {
      console.error("Error getting domain overrides:", error)
      res.status(500).json({ error: "Failed to get domain overrides" })
    }
  }

  private async getGroupDomainOverrides(req: Request, res: Response) {
    try {
      const groupId = Number.parseInt(req.params.groupId)
      const overrides = await this.parentalService.getDomainOverridesForGroup(groupId)
      res.json(overrides)
    } catch (error) {
      console.error("Error getting group domain overrides:", error)
      res.status(500).json({ error: "Failed to get group domain overrides" })
    }
  }

  private async createDomainOverride(req: Request, res: Response) {
    try {
      const overrideData = req.body
      const override = await this.parentalService.createDomainOverride(overrideData)
      res.status(201).json(override)
    } catch (error) {
      console.error("Error creating domain override:", error)
      res.status(500).json({ error: "Failed to create domain override" })
    }
  }

  private async updateDomainOverride(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const overrideData = req.body
      const override = await this.parentalService.updateDomainOverride(id, overrideData)
      if (!override) {
        return res.status(404).json({ error: "Domain override not found" })
      }
      res.json(override)
    } catch (error) {
      console.error("Error updating domain override:", error)
      res.status(500).json({ error: "Failed to update domain override" })
    }
  }

  private async deleteDomainOverride(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const success = await this.parentalService.deleteDomainOverride(id)
      if (!success) {
        return res.status(404).json({ error: "Domain override not found" })
      }
      res.status(204).send()
    } catch (error) {
      console.error("Error deleting domain override:", error)
      res.status(500).json({ error: "Failed to delete domain override" })
    }
  }
}

