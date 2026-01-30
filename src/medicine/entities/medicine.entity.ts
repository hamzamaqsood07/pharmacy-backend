/* eslint-disable prettier/prettier */
import { Organization } from "src/organization/entities/organization.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medicine {
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    name:string

    @Column({default:0})
    qty:number

    @Column('decimal', { precision: 10, scale: 2, default: 0 ,transformer: {
    to: (value: number) => value,  // when saving
    from: (value: string) => parseFloat(value), // when reading
    }})
    salesPrice:number

    @Column('decimal', { precision: 10, scale: 2, default: 0 ,transformer: {
    to: (value: number) => value,  // when saving
    from: (value: string) => parseFloat(value), // when reading
    }})
    purchasePrice:number

    @Column({default:0})
    packSize:number

    @Column({type:'timestamp',default:()=>"NOW()"})
    createdAt:Date

    @Column({type:'timestamp',default:()=>"NOW()",onUpdate:"NOW()"})
    updatedAt:Date

    @ManyToOne(()=>Organization,{onDelete:"CASCADE"})
    organization:Organization
}
