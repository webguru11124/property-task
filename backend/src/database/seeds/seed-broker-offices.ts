import { EntityManager } from 'typeorm';
import { City } from '../../modules/cities/entities/city.entity';
import { BrokerOffice } from '../../modules/brokers/entities/broker-office.entity';

const brokerOfficesData = [
  // Oslo (3)
  {
    name: 'DNB Eiendom Oslo Sentrum',
    cityName: 'Oslo',
    address: 'Karl Johans gate 27, 0159 Oslo',
    phone: '+47 23 11 72 00',
    email: 'oslo-sentrum@dnbeiendom.no',
    website: 'https://dnbeiendom.no',
    postalCode: '0159',
  },
  {
    name: 'Nordvik & Partners Oslo',
    cityName: 'Oslo',
    address: 'Storgata 33, 0184 Oslo',
    phone: '+47 22 99 50 00',
    email: 'oslo-storgata@nordvikpartners.no',
    website: 'https://nordvikpartners.no',
    postalCode: '0184',
  },
  {
    name: 'Privatmegleren Oslo',
    cityName: 'Oslo',
    address: 'Grensen 13, 0159 Oslo',
    phone: '+47 23 00 30 00',
    email: 'oslo-grensen@privatmegleren.no',
    website: 'https://privatmegleren.no',
    postalCode: '0159',
  },

  // Bergen (3)
  {
    name: 'Eiendomsmegler Vest Bergen',
    cityName: 'Bergen',
    address: 'Torgallmenningen 2, 5014 Bergen',
    phone: '+47 55 55 97 00',
    email: 'bergen-torgallmenningen@em-vest.no',
    website: 'https://em-vest.no',
    postalCode: '5014',
  },
  {
    name: 'DNB Eiendom Bergen',
    cityName: 'Bergen',
    address: 'Jonsvollsgaten 2, 5011 Bergen',
    phone: '+47 55 21 70 00',
    email: 'bergen@dnbeiendom.no',
    website: 'https://dnbeiendom.no',
    postalCode: '5011',
  },
  {
    name: 'Krogsveen Bergen',
    cityName: 'Bergen',
    address: 'Strandgaten 20, 5013 Bergen',
    phone: '+47 55 55 55 55',
    email: 'bergen@krogsveen.no',
    website: 'https://krogsveen.no',
    postalCode: '5013',
  },

  // Trondheim (3)
  {
    name: 'EM1 Midt-Norge',
    cityName: 'Trondheim',
    address: 'Kjøpmannsgata 37, 7011 Trondheim',
    phone: '+47 73 53 50 00',
    email: 'trondheim@em1.no',
    website: 'https://em1.no',
    postalCode: '7011',
  },
  {
    name: 'Krogsveen Trondheim',
    cityName: 'Trondheim',
    address: 'Munkegata 1, 7011 Trondheim',
    phone: '+47 73 80 35 00',
    email: 'trondheim@krogsveen.no',
    website: 'https://krogsveen.no',
    postalCode: '7011',
  },
  {
    name: 'DNB Eiendom Trondheim',
    cityName: 'Trondheim',
    address: 'Søndre gate 4, 7011 Trondheim',
    phone: '+47 73 88 30 00',
    email: 'trondheim@dnbeiendom.no',
    website: 'https://dnbeiendom.no',
    postalCode: '7011',
  },

  // Stavanger (2)
  {
    name: 'Meglerhuset Rele',
    cityName: 'Stavanger',
    address: 'Klubbgata 5, 4006 Stavanger',
    phone: '+47 51 85 85 85',
    email: 'stavanger@meglerhuset-rele.no',
    website: 'https://meglerhuset-rele.no',
    postalCode: '4006',
  },
  {
    name: 'DNB Eiendom Stavanger',
    cityName: 'Stavanger',
    address: 'Lars Hertervigs gate 3, 4005 Stavanger',
    phone: '+47 51 84 00 00',
    email: 'stavanger@dnbeiendom.no',
    website: 'https://dnbeiendom.no',
    postalCode: '4005',
  },

  // Kristiansand (2)
  {
    name: 'Sørmegleren Kristiansand',
    cityName: 'Kristiansand',
    address: 'Markens gate 45, 4611 Kristiansand',
    phone: '+47 38 12 41 00',
    email: 'kristiansand@sormegleren.no',
    website: 'https://sormegleren.no',
    postalCode: '4611',
  },
  {
    name: 'DNB Eiendom Kristiansand',
    cityName: 'Kristiansand',
    address: 'Ravnedalen 2, 4616 Kristiansand',
    phone: '+47 38 00 00 00',
    email: 'kristiansand@dnbeiendom.no',
    website: 'https://dnbeiendom.no',
    postalCode: '4616',
  },

  // Drammen (1)
  {
    name: 'DNB Eiendom Drammen',
    cityName: 'Drammen',
    address: 'Nedre Storgate 10, 3015 Drammen',
    phone: '+47 32 04 00 00',
    email: 'drammen@dnbeiendom.no',
    website: 'https://dnbeiendom.no',
    postalCode: '3015',
  },
];

export async function seedBrokerOffices(manager: EntityManager): Promise<void> {
  const cityRepo = manager.getRepository(City);
  const officeRepo = manager.getRepository(BrokerOffice);
  for (const o of brokerOfficesData) {
    const city = await cityRepo.findOne({ where: { name: o.cityName } });
    if (!city) continue;

    const existing = await officeRepo.findOne({ where: { email: o.email } });
    if (!existing) {
      const office = officeRepo.create({
        name: o.name,
        city_id: city.id,
        address: o.address,
        postal_code: o.postalCode,
        phone: o.phone,
        email: o.email,
        website: o.website,
        latitude: city.latitude,
        longitude: city.longitude,
        is_active: true,
      });
      await officeRepo.save(office);
    }
  }
}
