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

@Entity("domain_overrides")
export class DomainOverride {
  @PrimaryGeneratedColumn()
  overrideId: number

  @Column()
  domain: string

  @Column()
  groupId: number

  @ManyToOne(() => DeviceGroup)
  @JoinColumn({ name: "groupId" })
  group: DeviceGroup

  @Column({
    type: "varchar",
    enum: ["block", "allow"],
    default: "block",
  })
  action: "block" | "allow"

  @Column({ nullable: true })
  comment: string

  @Column({ nullable: true })
  createdBy: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

