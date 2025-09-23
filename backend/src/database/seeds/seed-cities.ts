import { EntityManager } from 'typeorm';
import { City } from '../../modules/cities/entities/city.entity';

const norwegianCities = [
  {
    name: 'Oslo',
    county: 'Oslo',
    code: '0301',
    lat: 59.9139,
    lng: 10.7522,
    population: 697010,
  },
  {
    name: 'Bergen',
    county: 'Vestland',
    code: '4601',
    lat: 60.3913,
    lng: 5.3221,
    population: 285911,
  },
  {
    name: 'Trondheim',
    county: 'Trøndelag',
    code: '5001',
    lat: 63.4305,
    lng: 10.3951,
    population: 184193,
  },
  {
    name: 'Stavanger',
    county: 'Rogaland',
    code: '1103',
    lat: 58.97,
    lng: 5.7331,
    population: 143574,
  },
  {
    name: 'Kristiansand',
    county: 'Agder',
    code: '4204',
    lat: 58.1599,
    lng: 8.0182,
    population: 112588,
  },
];

export async function seedCities(manager: EntityManager): Promise<void> {
  const repo = manager.getRepository(City);
  for (const c of norwegianCities) {
    const existing = await repo.findOne({
      where: { municipality_code: c.code },
    });
    if (!existing) {
      const city = repo.create({
        name: c.name,
        county: c.county,
        municipality_code: c.code,
        latitude: String(c.lat),
        longitude: String(c.lng),
        population: c.population,
      });
      await repo.save(city);
    }
  }
}
