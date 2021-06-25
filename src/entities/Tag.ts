import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Expose } from 'class-transformer'

@Entity('tags')
class Tag {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Expose({ name: 'nameCustom' })
  nameCustom(): string {
    return `#${this.name}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Tag }
