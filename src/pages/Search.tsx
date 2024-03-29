import { NextPage } from 'next'
import { FC, useContext, useState } from 'react'
import ArtistCard from '../components/Artist/Artist'
import Categories from '../components/Search/Categories/Categories'
import SearchBar from '../components/Search/SearchBar/SearchBar'
import Song from '../components/Spotify/MainSongs/components/Song/Song'
import PlayList from '../components/Spotify/Playlist/PlayList'
import UserImage from '../components/Spotify/UserImage/UserImage'
import GetData from '../hooks/GetData/GetData'
import GetSearch from '../hooks/GetSearch/GetSearch'
import { GetCategories } from '../hooks/types/GetCategories'
import { IGetSearch } from '../hooks/types/GetSearch'
import UserTrackContext from '../hooks/UserTrackContext/UserTrackContext'
import { FormContainer } from '../styles/components/Search/SearchBar.style'
import * as SFollow from '../styles/components/User/Following.style'
import * as STracks from '../styles/components/Spotify/MainSongs/Main.style'
import * as S from '../styles/general/styles'
import * as SAlbums from '../styles/components/albums/albums.style'
import * as SPlaylist from '../styles/pages/library/library.style'

import Link from 'next/link'
import {
    SearchArstitMainDesc,
    SearchArtist,
    SearchArtistMain,
    SearchImageContainer,
    SearchProfileContainer,
    SearchSection1,
    SearchTitleCategory,
    SearchTracksContainer,
    SearchType,
} from '../styles/pages/Search/Search.style'
const Search: NextPage = () => {
    const [search, setSearch] = useState('')
    const [mount, setMount] = useState(false)
    const {
        data: { albums, artists, playlists, episodes, tracks, shows },
        setCount,
    } = GetSearch<IGetSearch>(search, setMount)
    const { setTracks } = useContext(UserTrackContext)

    const url = `https://api.spotify.com/v1/browse/categories?limit=50`

    const { categories } = GetData<GetCategories>(url)

    const newTracks = tracks?.items?.map((track) => {
        return {
            id: track.id,
        }
    })
    const handlePlayId = (id: number) => {
        setTracks({ tracks: newTracks, position: id })
    }

    console.log(albums)

    return (
        <S.StyledContainer>
            <FormContainer>
                <SearchBar
                    onChange={(event) => {
                        setSearch(event.target.value)
                        setCount(0)
                    }}
                    setSearch={setSearch}
                    value={search}
                    setMount={setMount}
                />
            </FormContainer>
            {!search && <Categories Categories={categories} />}
            {mount && (
                <>
                    <SearchSection1>
                        {artists?.items?.length !== 0 && (
                            <>
                                <SearchProfileContainer>
                                    <SearchTitleCategory>
                                        Result
                                    </SearchTitleCategory>
                                    <SearchArtistMain
                                        href={{
                                            pathname: '/artists/[pid]/',
                                            query: {
                                                pid: artists?.items[0].id,
                                            },
                                        }}
                                    >
                                        <SearchArstitMainDesc>
                                            <SearchImageContainer>
                                                <UserImage
                                                    url={
                                                        artists?.items[0]
                                                            ?.images &&
                                                        artists?.items[0]
                                                            ?.images[0]?.url
                                                    }
                                                    displayName={
                                                        artists?.items[0].name
                                                    }
                                                    bradius={500}
                                                    height={250}
                                                    width={250}
                                                />
                                            </SearchImageContainer>
                                            <SearchType>
                                                {artists?.items[0]?.type?.toUpperCase()}
                                            </SearchType>
                                            <SearchArtist>
                                                {artists?.items[0]?.name}
                                            </SearchArtist>
                                        </SearchArstitMainDesc>
                                    </SearchArtistMain>
                                </SearchProfileContainer>
                            </>
                        )}

                        {tracks?.items?.length !== 0 && (
                            <SearchTracksContainer>
                                <SearchTitleCategory>
                                    Tracks
                                </SearchTitleCategory>
                                {tracks?.items?.map((track, index) => (
                                    <STracks.SongCard key={track.id}>
                                        <div style={{ width: '1%' }}>
                                            <STracks.SongNumber>
                                                {index + 1}
                                            </STracks.SongNumber>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() =>
                                                    handlePlayId(index)
                                                }
                                            >
                                                Play
                                            </button>
                                        </div>
                                        <Song item={track} />
                                    </STracks.SongCard>
                                ))}
                            </SearchTracksContainer>
                        )}
                    </SearchSection1>
                    <div>
                        {playlists?.items?.length !== 0 && (
                            <>
                                <SearchTitleCategory>
                                    Playlists
                                </SearchTitleCategory>
                                <SFollow.ArtistCards height="248px">
                                    {playlists?.items?.map((playlist) => (
                                        <PlayList
                                            key={playlist.id}
                                            playlist={playlist}
                                        />
                                    ))}
                                </SFollow.ArtistCards>
                            </>
                        )}
                    </div>
                    <div>
                        {artists?.items?.length !== 0 && (
                            <>
                                <SearchTitleCategory>
                                    Artist
                                </SearchTitleCategory>
                                <SFollow.ArtistCards height="260px">
                                    {artists?.items?.map((artist) => (
                                        <ArtistCard
                                            key={artist.id}
                                            item={artist}
                                        />
                                    ))}
                                </SFollow.ArtistCards>
                            </>
                        )}
                    </div>
                    <div>
                        {albums && albums?.items?.length !== 0 && (
                            <>
                                <SearchTitleCategory>
                                    Albums
                                </SearchTitleCategory>
                                <SFollow.ArtistCards height="248px">
                                    {albums.items.map((album) => (
                                        <Link
                                            href={{
                                                pathname: '/album/[pid]',
                                                query: { pid: album?.id },
                                            }}
                                            passHref
                                            key={album.id}
                                        >
                                            <SAlbums.AlbumRedirect>
                                                {album.images.length > 0 && (
                                                    <UserImage
                                                        url={
                                                            album.images[0].url
                                                        }
                                                        displayName={album.name}
                                                        size={166}
                                                        bradius={10}
                                                    />
                                                )}
                                                <SPlaylist.PlaylistTitle>
                                                    {album.name.length > 16
                                                        ? `${album.name
                                                              .slice(0, 16)
                                                              .trim()}...`
                                                        : album.name.slice(
                                                              0,
                                                              16
                                                          )}
                                                </SPlaylist.PlaylistTitle>
                                                <SPlaylist.PlaylistAuthor>
                                                    {album.release_date.slice(
                                                        0,
                                                        4
                                                    )}
                                                </SPlaylist.PlaylistAuthor>
                                            </SAlbums.AlbumRedirect>
                                        </Link>
                                    ))}
                                </SFollow.ArtistCards>
                            </>
                        )}
                    </div>
                </>
            )}
        </S.StyledContainer>
    )
}

export default Search
