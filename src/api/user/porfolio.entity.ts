import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryColumn()
  public userId: string;

  @Column()
  public poolAddress: string;

  @Column("decimal")
  public tokens: number;

  @Column("decimal")
  public investedAmount: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}