import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("lpcache")
export class LPCache {
  @PrimaryColumn()
  public pollAddress: string;

  @Column()
  public name: string;

  @Column("decimal")
  public price: number;

  @Column()
  public age: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
