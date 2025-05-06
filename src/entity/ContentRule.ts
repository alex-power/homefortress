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

@Entity("content_rules")
export class ContentRule {
  @PrimaryGeneratedColumn()
  ruleId: number

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

  @Column({
    type: "varchar",
    enum: ["adult", "social", "gaming", "streaming", "custom"],
    default: "custom",
  })
  category: "adult" | "social" | "gaming" | "streaming" | "custom"

  @Column({ nullable: true })
  customRegex: string

  @Column({ nullable: true })
  createdBy: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

