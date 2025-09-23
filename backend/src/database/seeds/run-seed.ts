import 'reflect-metadata';
import dataSource from '../../../ormconfig';
import { seedCities } from './seed-cities';
import { seedBrokerOffices } from './seed-broker-offices';

async function runSeeds() {
  const ds = await dataSource.initialize();
  try {
    await ds.transaction(async (manager) => {
      await seedCities(manager);
      await seedBrokerOffices(manager);
    });

    console.log('✅ Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await ds.destroy();
  }
}

void runSeeds();
