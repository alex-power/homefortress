import { getRepository } from "typeorm"
import type { PiholeClient } from "./PiholeClient"
import { DeviceGroup } from "../entity/DeviceGroup"
import { Device } from "../entity/Device"
import { AccessSchedule } from "../entity/AccessSchedule"
import { ContentRule } from "../entity/ContentRule"
import { DomainOverride } from "../entity/DomainOverride"

export class ParentalControlService {
  private piholeClient: PiholeClient

  constructor(piholeClient: PiholeClient) {
    this.piholeClient = piholeClient
  }

  // Device Group Methods
  async getDeviceGroups(): Promise<DeviceGroup[]> {
    const repository = getRepository(DeviceGroup)
    return repository.find()
  }

  async getDeviceGroup(id: number): Promise<DeviceGroup | undefined> {
    const repository = getRepository(DeviceGroup)
    return repository.findOne(id)
  }

  async createDeviceGroup(groupData: Partial<DeviceGroup>): Promise<DeviceGroup> {
    const repository = getRepository(DeviceGroup)
    const group = repository.create(groupData)
    return repository.save(group)
  }

  async updateDeviceGroup(id: number, groupData: Partial<DeviceGroup>): Promise<DeviceGroup | undefined> {
    const repository = getRepository(DeviceGroup)
    await repository.update(id, groupData)
    return this.getDeviceGroup(id)
  }

  async deleteDeviceGroup(id: number): Promise<boolean> {
    const repository = getRepository(DeviceGroup)
    const result = await repository.delete(id)
    return result.affected ? result.affected > 0 : false
  }

  // Device Methods
  async getDevices(): Promise<Device[]> {
    const repository = getRepository(Device)
    return repository.find({ relations: ["group"] })
  }

  async getDevice(id: number): Promise<Device | undefined> {
    const repository = getRepository(Device)
    return repository.findOne(id, { relations: ["group"] })
  }

  async getDeviceByMac(macAddress: string): Promise<Device | undefined> {
    const repository = getRepository(Device)
    return repository.findOne({ where: { macAddress }, relations: ["group"] })
  }

  async createDevice(deviceData: Partial<Device>): Promise<Device> {
    const repository = getRepository(Device)
    const device = repository.create(deviceData)
    return repository.save(device)
  }

  async updateDevice(id: number, deviceData: Partial<Device>): Promise<Device | undefined> {
    const repository = getRepository(Device)
    await repository.update(id, deviceData)
    return this.getDevice(id)
  }

  async deleteDevice(id: number): Promise<boolean> {
    const repository = getRepository(Device)
    const result = await repository.delete(id)
    return result.affected ? result.affected > 0 : false
  }

  // Access Schedule Methods
  async getAccessSchedules(): Promise<AccessSchedule[]> {
    const repository = getRepository(AccessSchedule)
    return repository.find()
  }

  async getAccessSchedulesForGroup(groupId: number): Promise<AccessSchedule[]> {
    const repository = getRepository(AccessSchedule)
    return repository.find({ where: { groupId } })
  }

  async createAccessSchedule(scheduleData: Partial<AccessSchedule>): Promise<AccessSchedule> {
    const repository = getRepository(AccessSchedule)
    const schedule = repository.create(scheduleData)
    return repository.save(schedule)
  }

  async updateAccessSchedule(id: number, scheduleData: Partial<AccessSchedule>): Promise<AccessSchedule | undefined> {
    const repository = getRepository(AccessSchedule)
    await repository.update(id, scheduleData)
    return repository.findOne(id)
  }

  async deleteAccessSchedule(id: number): Promise<boolean> {
    const repository = getRepository(AccessSchedule)
    const result = await repository.delete(id)
    return result.affected ? result.affected > 0 : false
  }

  // Content Rule Methods
  async getContentRules(): Promise<ContentRule[]> {
    const repository = getRepository(ContentRule)
    return repository.find()
  }

  async getContentRulesForGroup(groupId: number): Promise<ContentRule[]> {
    const repository = getRepository(ContentRule)
    return repository.find({ where: { groupId } })
  }

  async createContentRule(ruleData: Partial<ContentRule>): Promise<ContentRule> {
    const repository = getRepository(ContentRule)
    const rule = repository.create(ruleData)
    return repository.save(rule)
  }

  async updateContentRule(id: number, ruleData: Partial<ContentRule>): Promise<ContentRule | undefined> {
    const repository = getRepository(ContentRule)
    await repository.update(id, ruleData)
    return repository.findOne(id)
  }

  async deleteContentRule(id: number): Promise<boolean> {
    const repository = getRepository(ContentRule)
    const result = await repository.delete(id)
    return result.affected ? result.affected > 0 : false
  }

  // Domain Override Methods
  async getDomainOverrides(): Promise<DomainOverride[]> {
    const repository = getRepository(DomainOverride)
    return repository.find()
  }

  async getDomainOverridesForGroup(groupId: number): Promise<DomainOverride[]> {
    const repository = getRepository(DomainOverride)
    return repository.find({ where: { groupId } })
  }

  async createDomainOverride(overrideData: Partial<DomainOverride>): Promise<DomainOverride> {
    const repository = getRepository(DomainOverride)
    const override = repository.create(overrideData)

    // Apply to Pi-hole if it's a block or allow rule
    if (override.action === "block") {
      await this.piholeClient.addDomainToBlacklist(override.domain, `Group ${override.groupId} block rule`)
    } else if (override.action === "allow") {
      await this.piholeClient.addDomainToWhitelist(override.domain, `Group ${override.groupId} allow rule`)
    }

    return repository.save(override)
  }

  async updateDomainOverride(id: number, overrideData: Partial<DomainOverride>): Promise<DomainOverride | undefined> {
    const repository = getRepository(DomainOverride)
    const existingOverride = await repository.findOne(id)

    if (existingOverride) {
      // If action changed, update Pi-hole lists
      if (overrideData.action && overrideData.action !== existingOverride.action) {
        if (existingOverride.action === "block") {
          await this.piholeClient.removeDomainFromBlacklist(existingOverride.domain)
        } else if (existingOverride.action === "allow") {
          await this.piholeClient.removeDomainFromWhitelist(existingOverride.domain)
        }

        if (overrideData.action === "block") {
          await this.piholeClient.addDomainToBlacklist(
            overrideData.domain || existingOverride.domain,
            `Group ${overrideData.groupId || existingOverride.groupId} block rule`,
          )
        } else if (overrideData.action === "allow") {
          await this.piholeClient.addDomainToWhitelist(
            overrideData.domain || existingOverride.domain,
            `Group ${overrideData.groupId || existingOverride.groupId} allow rule`,
          )
        }
      }

      // If domain changed but action stayed the same
      if (overrideData.domain && overrideData.domain !== existingOverride.domain && !overrideData.action) {
        if (existingOverride.action === "block") {
          await this.piholeClient.removeDomainFromBlacklist(existingOverride.domain)
          await this.piholeClient.addDomainToBlacklist(
            overrideData.domain,
            `Group ${overrideData.groupId || existingOverride.groupId} block rule`,
          )
        } else if (existingOverride.action === "allow") {
          await this.piholeClient.removeDomainFromWhitelist(existingOverride.domain)
          await this.piholeClient.addDomainToWhitelist(
            overrideData.domain,
            `Group ${overrideData.groupId || existingOverride.groupId} allow rule`,
          )
        }
      }
    }

    await repository.update(id, overrideData)
    return repository.findOne(id)
  }

  async deleteDomainOverride(id: number): Promise<boolean> {
    const repository = getRepository(DomainOverride)
    const override = await repository.findOne(id)

    if (override) {
      // Remove from Pi-hole lists
      if (override.action === "block") {
        await this.piholeClient.removeDomainFromBlacklist(override.domain)
      } else if (override.action === "allow") {
        await this.piholeClient.removeDomainFromWhitelist(override.domain)
      }
    }

    const result = await repository.delete(id)
    return result.affected ? result.affected > 0 : false
  }

  // Enforcement Methods
  async enforceSchedules(): Promise<void> {
    const now = new Date()
    const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const time = now.getHours() * 60 + now.getMinutes() // Minutes since midnight

    const scheduleRepository = getRepository(AccessSchedule)
    const deviceRepository = getRepository(Device)

    // Get all active schedules for the current day and time
    const activeSchedules = await scheduleRepository.find({
      where: {
        enabled: true,
        days: { [day]: true }, // Check if the current day is enabled in the schedule
        startTime: { $lte: time }, // Schedule start time is before or equal to current time
        endTime: { $gte: time }, // Schedule end time is after or equal to current time
      },
    })

    // For each active schedule, get the devices in the group and apply restrictions
    for (const schedule of activeSchedules) {
      const devices = await deviceRepository.find({
        where: { groupId: schedule.groupId },
      })

      for (const device of devices) {
        // Apply restrictions based on schedule type
        if (schedule.type === "internet_access") {
          // Block all internet access for this device
          // This would require integration with your network/router
          console.log(`Blocking internet access for device ${device.friendlyName} (${device.macAddress})`)
        } else if (schedule.type === "content_filtering") {
          // Apply content filtering rules for this device
          console.log(`Applying content filtering for device ${device.friendlyName} (${device.macAddress})`)
        }
      }
    }
  }

  // Utility Methods
  async syncDevicesWithNetwork(): Promise<void> {
    try {
      // Get network clients from Pi-hole
      const networkClients = await this.piholeClient.getNetworkClients()
      const deviceRepository = getRepository(Device)

      // For each client, check if it exists in our database
      for (const client of networkClients) {
        const existingDevice = await this.getDeviceByMac(client.ip)

        if (!existingDevice) {
          // Create a new device entry
          await this.createDevice({
            macAddress: client.ip,
            ipAddress: client.ip,
            friendlyName: client.name || client.ip,
            lastSeen: new Date(),
          })
        } else {
          // Update last seen time and IP if needed
          if (existingDevice.ipAddress !== client.ip) {
            await this.updateDevice(existingDevice.deviceId, {
              ipAddress: client.ip,
              lastSeen: new Date(),
            })
          } else {
            await this.updateDevice(existingDevice.deviceId, {
              lastSeen: new Date(),
            })
          }
        }
      }
    } catch (error) {
      console.error("Error syncing devices with network:", error)
      throw error
    }
  }
}

