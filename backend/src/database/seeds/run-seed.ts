import 'reflect-metadata';
import dataSource from '../../../ormconfig';
import { seedCities } from './seed-cities.js';
import { seedBrokerOffices } from './seed-broker-offices.js';

async function runSeeds() {
    const ds = await dataSource.initialize();
    try {
        await ds.transaction(async (manager) => {
            await seedCities(manager);
            await seedBrokerOffices(manager);
        });
        // eslint-disable-next-line no-console
        console.log('✅ Database seeding completed successfully!');
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('❌ Seeding failed:', err);
        process.exitCode = 1;
    } finally {
        await ds.destroy();
    }
}

runSeeds();
