import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { DeviceGroup } from "./DeviceGroup"

@Entity("access_schedules")
export class AccessSchedule {
  @PrimaryGeneratedColumn()
  scheduleId: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column()
  groupId: number

  @ManyToOne(() => DeviceGroup)
  @JoinColumn({ name: "groupId" })
  group: DeviceGroup

  @Column({ type: "boolean", default: true })
  enabled: boolean

  @Column({ type: "simple-json" })
  days: {
    0: boolean // Sunday
    1: boolean // Monday
    2: boolean // Tuesday
    3: boolean // Wednesday
    4: boolean // Thursday
    5: boolean // Friday
    6: boolean // Saturday
  }

  @Column({ type: "int" })
  startTime: number // Minutes since midnight

  @Column({ type: "int" })
  endTime: number // Minutes since midnight

  @Column({
    type: "varchar",
    enum: ["internet_access", "content_filtering"],
    default: "internet_access",
  })
  type: "internet_access" | "content_filtering"

  @Column({ nullable: true })
  createdBy: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

