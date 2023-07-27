import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1689627084092 implements MigrationInterface {
  name = 'CreateUserTable1689627084092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "nama" character varying(30) NOT NULL, "alamat" character varying(50) NOT NULL, "no_telp" character varying(20) NOT NULL, "kode" character(3) NOT NULL, CONSTRAINT "UQ_a735edf6ad5e2917260d377388d" UNIQUE ("nama"), CONSTRAINT "UQ_db8a3fd859c29858a4a32e4a35f" UNIQUE ("kode"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "stok" integer NOT NULL, "harga" integer NOT NULL, "kode" character varying(50) NOT NULL, "perusahaan_id" integer, CONSTRAINT "UQ_d6ad9c57525a32cf19112bf12e4" UNIQUE ("kode"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "username" character varying(20) NOT NULL, "name" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_f47b4e0b010f69084c512c1e597" FOREIGN KEY ("perusahaan_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_f47b4e0b010f69084c512c1e597"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
