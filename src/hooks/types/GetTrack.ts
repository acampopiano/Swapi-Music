import { IArtist, IArtists, IImages } from '../../hooks/types/GetSearch'

interface GetTrack {
    album: {
        album_type: string
        artists: IArtist[]
        available_markets: string[]
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        images: IImages[]
        name: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        type: string
        uri: string
    }
    artists: IArtists[]
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
    is_playable: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}
export default GetTrack
