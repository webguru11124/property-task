import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddBrokerOfficeIndexes1701000010 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex(
            'broker_offices',
            new TableIndex({
                name: 'IDX_BROKER_OFFICES_ACTIVE',
                columnNames: ['is_active'],
            }),
        );

        await queryRunner.createIndex(
            'broker_offices',
            new TableIndex({
                name: 'IDX_BROKER_OFFICES_LAT_LNG',
                columnNames: ['latitude', 'longitude'],
            }),
        );

        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_broker_offices_active_only
      ON broker_offices (latitude, longitude)
      WHERE is_active = true
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('broker_offices', 'IDX_BROKER_OFFICES_ACTIVE');
        await queryRunner.dropIndex('broker_offices', 'IDX_BROKER_OFFICES_LAT_LNG');
        await queryRunner.query('DROP INDEX IF EXISTS idx_broker_offices_active_only');
    }
}


