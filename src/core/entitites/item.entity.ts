// Item.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nama: string;

  @Column({ type: 'integer', unsigned: true })
  stok: number;

  @Column({ type: 'integer', unsigned: true })
  harga: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  kode: string;

  @ManyToOne(() => Company, (company) => company.barang, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'perusahaan_id' })
  perusahaan: Company;
}
