import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1546526977195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION pgcrypto;')
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP EXTENSION IF EXISTS pgcrypto')
  }
}
