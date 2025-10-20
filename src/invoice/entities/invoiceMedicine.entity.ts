/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Medicine } from 'src/medicine/entities/medicine.entity';

@Entity()
export class InvoiceMedicine {
  @PrimaryColumn('uuid')
  invoiceId: string;

  @PrimaryColumn('uuid')
  medicineId: string;

  @ManyToOne(() => Invoice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @ManyToOne(() => Medicine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;

   @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value, // when saving
      from: (value: string) => parseFloat(value), // when reading
    },
  })
  medDiscount: number;

  @Column()
  qty: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0,transformer: {
  to: (value: number) => value,  // when saving
  from: (value: string) => parseFloat(value), // when reading
} })
  salesPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0,transformer: {
  to: (value: number) => value,  // when saving
  from: (value: string) => parseFloat(value), // when reading
} })
  purchasePrice: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;
}
