/*
  Fetch Norwegian cities from a public API and print normalized JSON suitable for seeding.
  Configure the source URL below.
*/

type InputCity = {
    name: string
    county?: string
    municipalityCode?: string
    lat?: number
    lng?: number
    population?: number
}

async function main() {
    // Public API (Kartverket Stedsnavn) — urban settlements with WGS84 coordinates
    // Docs: https://api.kartverket.no/stedsnavn/v1/
    const SOURCE_URL = 'https://api.kartverket.no/stedsnavn/v1/navn?navneobjekttype=Tettsted&utkoordsys=WGS84&treffPerSide=1000'

    const res = await fetch(SOURCE_URL)
    if (!res.ok) throw new Error(`Failed to fetch cities: ${res.status}`)
    const payload: any = await res.json()

    const items: any[] = Array.isArray(payload?.navn) ? payload.navn : []

    const normalized = items.map((it) => {
        const name: string = it?.skrivemåte || it?.stedsnavn || it?.navn || ''
        const county: string = it?.fylker?.[0]?.fylkesnavn || it?.fylke || ''
        const municipalityCode: string = it?.kommuner?.[0]?.kommunenummer || it?.kommunenummer || ''
        const lat: number = Number(it?.representasjonspunkt?.lat ?? it?.representasjonspunkt?.nord ?? 0)
        const lng: number = Number(it?.representasjonspunkt?.lon ?? it?.representasjonspunkt?.øst ?? 0)
        return {
            name,
            county,
            code: municipalityCode,
            lat,
            lng,
            population: null as number | null,
        }
    })

    process.stdout.write(JSON.stringify(normalized, null, 2))
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})


