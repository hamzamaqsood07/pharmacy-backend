/* eslint-disable prettier/prettier */
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceMedicine } from './invoiceMedicine.entity';

export enum InvoiceStatus {
  INPROGRESS = 'inProgress',
  COMPLETED = 'completed',
}

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  invoiceNumber: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value, // when saving
      from: (value: string) => parseFloat(value), // when reading
    },
  })
  discount: number;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.INPROGRESS,
  })
  status: InvoiceStatus;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value, // when saving
      from: (value: string) => parseFloat(value), // when reading
    },
  })
  grossTotal: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value, // when saving
      from: (value: string) => parseFloat(value), // when reading
    },
  })
  netTotal: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
    transformer: {
      to: (value: number) => value, // when saving
      from: (value: string) => parseFloat(value), // when reading
    },
  })
  cashPaid: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
    transformer: {
      to: (value: number) => value, // when saving
      from: (value: string) => parseFloat(value), // when reading
    },
  })
  balance: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  customer: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  user: User;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  organization: Organization;

  @OneToMany(
    () => InvoiceMedicine,
    (invoiceMedicine) => invoiceMedicine.invoice,
  )
  invoiceMedicines: InvoiceMedicine[];
}
