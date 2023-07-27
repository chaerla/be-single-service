import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableItem1689662405537 implements MigrationInterface {
  name = 'AlterTableItem1689662405537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "nama"`);
    await queryRunner.query(
      `ALTER TABLE "item" ADD "nama" character varying(50) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "nama"`);
    await queryRunner.query(
      `ALTER TABLE "item" ADD "nama" character varying NOT NULL`,
    );
  }
}
