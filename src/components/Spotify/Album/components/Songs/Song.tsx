import { FC } from 'react'
import GetTimeSongs from '../../../../../hooks/GetTimeSongs/GetTimeSongs'
import { IArtist } from '../../../../../hooks/types/GetTopSongs'
import * as S from '../../../../../styles/components/Spotify/MainSongs/components/Song/Song.style'
import Link from 'next/link'
interface IProps {
    song: IArtist
}

const Song: FC<IProps> = ({ song }) => {
    const [hour, minutes, seconds] = GetTimeSongs({ ms: song?.duration_ms })

    console.log(song)

    return (
        <S.Song key={song?.id}>
            <S.SongMain>
                <S.SongDescription>
                    <S.SontTitle>{song?.name}</S.SontTitle>
                    {song?.artists?.map((artist, index) => (
                        <Link
                            key={artist?.id}
                            href={{
                                pathname: '/artist/[pid]',
                                query: {
                                    pid: artist?.id,
                                },
                            }}
                        >
                            <a>
                                {index === 0 ? '' : `,`} {artist?.name}
                            </a>
                        </Link>
                    ))}
                </S.SongDescription>
            </S.SongMain>
            <S.SongMinutesBox>
                <p>
                    {' '}
                    {hour ? `${hour} ${minutes}` : ''}{' '}
                    {!hour
                        ? `${minutes}:${
                              seconds?.toFixed(0).length === 1
                                  ? `0${seconds.toFixed()}`
                                  : seconds?.toFixed()
                          }`
                        : ''}
                </p>
            </S.SongMinutesBox>
        </S.Song>
    )
}

export default Song
