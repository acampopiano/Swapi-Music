interface Artist {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
}

interface Images {
    height: number
    url: string
    width: number
}

export interface IArtist {
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
    }
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}
export interface SongItem {
    album: {
        album_type: string
        artists: Artist[]
        available_markets: string[]
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        images: Images[]
        name: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        type: string
        uri: string
    }
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
    }
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

interface ISong {
    items: SongItem[]
}

export default ISong
