import 'reflect-metadata'
import dataSource from '../../../ormconfig'
import { City } from '../../modules/cities/entities/city.entity'

/*
  Fetch Norwegian cities from Kartverket and upsert into database.
*/

type ApiItem = any

const SOURCE_URL = 'https://api.kartverket.no/stedsnavn/v1/navn?navneobjekttype=Tettsted&utkoordsys=WGS84&treffPerSide=1000'

function normalize(items: ApiItem[]) {
    return items.map((it) => {
        const name: string = it?.skrivemåte || it?.stedsnavn || it?.navn || ''
        const county: string = it?.fylker?.[0]?.fylkesnavn || it?.fylke || ''
        const code: string = it?.kommuner?.[0]?.kommunenummer || it?.kommunenummer || ''
        const lat: number = Number(it?.representasjonspunkt?.lat ?? it?.representasjonspunkt?.nord ?? 0)
        const lng: number = Number(it?.representasjonspunkt?.lon ?? it?.representasjonspunkt?.øst ?? 0)
        return { name, county, code, lat, lng }
    })
}

async function run() {
    const ds = await dataSource.initialize()
    try {
        const res = await fetch(SOURCE_URL)
        if (!res.ok) throw new Error(`Fetch failed ${res.status}`)
        const payload: any = await res.json()
        const items: ApiItem[] = Array.isArray(payload?.navn) ? payload.navn : []
        const list = normalize(items)
        const repo = ds.getRepository(City)
        let created = 0, updated = 0
        for (const c of list) {
            const existing = await repo.findOne({ where: [{ municipality_code: c.code }, { name: c.name, county: c.county }] })
            if (existing) {
                existing.latitude = String(c.lat)
                existing.longitude = String(c.lng)
                existing.county = c.county || existing.county
                await repo.save(existing)
                updated++
            } else {
                const city = repo.create({
                    name: c.name,
                    county: c.county,
                    municipality_code: c.code || '0000',
                    latitude: String(c.lat),
                    longitude: String(c.lng),
                    population: null,
                })
                await repo.save(city)
                created++
            }
        }
        // eslint-disable-next-line no-console
        console.log(`✅ Cities import complete. created=${created} updated=${updated}`)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('❌ Cities import failed:', e)
        process.exitCode = 1
    } finally {
        await ds.destroy()
    }
}

run()


