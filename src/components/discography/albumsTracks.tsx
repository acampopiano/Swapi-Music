import { FC, useContext } from 'react'
import Song from '../../components/Spotify/Album/components/Songs/Song'
import GetData from '../../hooks/GetData/GetData'
import { Album } from '../../hooks/types/GetAlbum'
import UserContext from '../../hooks/UserContext/UserContext'
import UserTrackContext from '../../hooks/UserTrackContext/UserTrackContext'
import * as SSong from '../../styles/components/Spotify/MainSongs/Main.style'
import * as S from '../../styles/pages/album/album.style'

interface IProps {
    id: string
}

const AlbumsTracks: FC<IProps> = ({ id }) => {
    const { setTracks } = useContext(UserContext)

    const urlAlbumsTracks = id ? `https://api.spotify.com/v1/albums/${id}` : ''
    const {
        images,
        name,
        artists,
        tracks,
        type,
        id: idFrom,
    } = GetData<Album>(urlAlbumsTracks)

    const newTracks = tracks?.items?.map((track, index) => {
        return {
            id: track.id,
            position: index,
            trackname: track.name,
            artist: track.artists,
            album: {
                id: idFrom,
                name,
                type,
            },
            duration_ms: track.duration_ms,
            images: images[2]?.url,
        }
    })
    const handlePlayId = (id: number) => {
        setTracks({
            tracks: newTracks,
            position: id,
            from: {
                id: idFrom,
                name,
                type,
            },
        })
    }
    return (
        <S.AlbumAside>
            {tracks?.items.map((track, index) => (
                <SSong.SongCard key={track.id}>
                    <Song
                        song={track}
                        handleId={() => handlePlayId(index)}
                        index={index}
                    />
                </SSong.SongCard>
            ))}
        </S.AlbumAside>
    )
}

export default AlbumsTracks
