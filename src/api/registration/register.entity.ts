import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Registration {
  @PrimaryColumn()
  public hashedEmail: string;

  @Column()
  @Generated("uuid")
  public userid: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
