import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateLeadsTable1701000003000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'leads',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'full_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          { name: 'phone', type: 'varchar', length: '25', isNullable: false },
          { name: 'email', type: 'varchar', length: '100', isNullable: false },
          { name: 'city_id', type: 'uuid', isNullable: false },
          { name: 'comment', type: 'text', isNullable: true },
          { name: 'assigned_broker_id', type: 'uuid', isNullable: true },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['city_id'],
            referencedTableName: 'cities',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'leads',
      new TableIndex({ name: 'IDX_LEADS_EMAIL', columnNames: ['email'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('leads', 'IDX_LEADS_EMAIL');
    await queryRunner.dropTable('leads');
  }
}
