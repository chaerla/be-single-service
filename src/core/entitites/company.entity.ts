// Company.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nama: string;

  @Column({ type: 'varchar', length: 50 })
  alamat: string;

  @Column({ type: 'varchar', length: 20 })
  no_telp: string;

  @Column({ type: 'char', length: 3, unique: true })
  kode: string;

  @OneToMany(() => Item, (item) => item.perusahaan)
  barang: Item[];
}
