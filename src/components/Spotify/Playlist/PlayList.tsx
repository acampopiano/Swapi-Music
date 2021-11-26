import { useRouter } from 'next/router'
import { FC, useContext } from 'react'
import { Playlist } from '../../../hooks/types/GetPlayList'
import useActiveOptContext from '../../../hooks/useActiveOptContext/useActiveOptContext'
import * as S from '../../../styles/pages/library/library.style'
import UserImage from '../UserImage/UserImage'

interface IProps {
    playlist: Playlist
}

const PlayList: FC<IProps> = ({ playlist }) => {
    const { setActive } = useContext(useActiveOptContext)
    const router = useRouter()
    const handlePlaylist = () => {
        router.push(`/playlist/${playlist.id}`)
        setActive('')
    }

    return (
        <S.PlaylistCard onClick={handlePlaylist}>
            <UserImage
                url={playlist?.images[0]?.url}
                displayName={playlist.name}
                size={136}
                bradius={10}
            />
            <S.PlaylistTitle>
                {playlist.name.length > 16
                    ? `${playlist.name.slice(0, 16).trim()}...`
                    : playlist.name.slice(0, 16)}
            </S.PlaylistTitle>
            <S.PlaylistAuthor>{playlist.owner.display_name}</S.PlaylistAuthor>
        </S.PlaylistCard>
    )
}

export default PlayList