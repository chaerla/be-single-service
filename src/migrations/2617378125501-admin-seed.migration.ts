import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../core/entitites/user.entity';
import { hash } from 'bcrypt';

export class Seed2617378125501 implements MigrationInterface {
  name = 'Seed2617378125501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: 'admin',
        username: 'admin',
        password: await hash('admin', 10),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users`);
  }
}
