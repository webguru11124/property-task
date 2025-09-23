import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCitiesTable1701000001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'county',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'municipality_code',
            type: 'char',
            length: '4',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'decimal',
            precision: 10,
            scale: 8,
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'decimal',
            precision: 11,
            scale: 8,
            isNullable: false,
          },
          {
            name: 'population',
            type: 'integer',
            isNullable: true,
          },
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
      }),
      true,
    );

    await queryRunner.createIndex(
      'cities',
      new TableIndex({ name: 'IDX_CITIES_NAME', columnNames: ['name'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('cities', 'IDX_CITIES_NAME');
    await queryRunner.dropTable('cities');
  }
}
