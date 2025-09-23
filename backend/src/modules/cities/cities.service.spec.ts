import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  it('returns [] for search term < 2 chars', async () => {
    const service = new CitiesService({} as any);
    const res = await service.searchCities('o');
    expect(res).toEqual([]);
  });
});
