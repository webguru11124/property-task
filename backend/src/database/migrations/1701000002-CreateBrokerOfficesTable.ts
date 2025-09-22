import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateBrokerOfficesTable1701000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'broker_offices',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'name', type: 'varchar', length: '200', isNullable: false },
                    { name: 'city_id', type: 'uuid', isNullable: false },
                    { name: 'address', type: 'varchar', length: '300', isNullable: false },
                    { name: 'postal_code', type: 'varchar', length: '4', isNullable: true },
                    { name: 'phone', type: 'varchar', length: '20', isNullable: false },
                    { name: 'email', type: 'varchar', length: '100', isNullable: false },
                    { name: 'website', type: 'varchar', length: '200', isNullable: true },
                    { name: 'latitude', type: 'decimal', precision: 10, scale: 8, isNullable: true },
                    { name: 'longitude', type: 'decimal', precision: 11, scale: 8, isNullable: true },
                    { name: 'is_active', type: 'boolean', default: true },
                    { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'broker_offices',
            new TableForeignKey({
                columnNames: ['city_id'],
                referencedTableName: 'cities',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'broker_offices',
            new TableIndex({ name: 'IDX_BROKER_OFFICES_CITY', columnNames: ['city_id'] }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('broker_offices');
    }
}


