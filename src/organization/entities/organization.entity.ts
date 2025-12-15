/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orgTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  licenseNo: string; 

  @Column({ nullable: true })
  ntnNo: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  logoUrl: string | null;

  @Column({ nullable: true })
  primaryColor: string;

  @Column({ nullable: true })
  secondaryColor: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.organization)
  users: Promise<User[]>;
}
