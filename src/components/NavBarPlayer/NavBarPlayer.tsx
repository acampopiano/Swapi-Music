import Link from 'next/link'
import {
    ChangeEvent,
    FC,
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
} from 'react'
import GetData from '../../hooks/GetData/GetData'
import GetTrack from '../../hooks/types/GetTrack'
import UserContext from '../../hooks/UserContext/UserContext'
import {
    AleatoryButton,
    NavbarFooterBar,
    NavPlayer,
    PlayerInfoSong,
    RepeatButton,
} from '../../styles/components/NavBarPlayer/NavBarPlayer.style'
import * as SSong from '../../styles/components/Spotify/MainSongs/components/Song/Song.style'
import { GetIcon, GetPlayerIcons } from '../Icons/Icons'
import UserImage from '../Spotify/UserImage/UserImage'
import initState from './assets/initState.json'
import Artists from './components/Artitsts/Artists'
import GetSoloUrl from './helpers/GetSoloUrl'
import GetUrl from './helpers/GetUrl'
import reducer from './helpers/reducer'
import { IActions } from './types/types'

const NavBarPlayer: FC = () => {
    const { tracks, setTracks } = useContext(UserContext)
    const [controls, dispatch] = useReducer(reducer, initState)
    const audio = useRef<HTMLAudioElement>(null)
    const track = GetData<GetTrack>(GetUrl(tracks) || GetSoloUrl(tracks))
    const [, setCurrentTime] = useState(0)
    const handlePlay = () => {
        audio.current?.play()
        if (audio.current) {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: true },
            })
            audio.current.autoplay = controls.repeat
            audio.current.volume = controls.volumen / 100
        }
    }
    const handlePause = () => {
        audio.current?.pause()
        dispatch({
            type: IActions.ON_Play,
            payload: { ...controls, play: false },
        })
    }
    const handleNext = () => {
        if (controls.repeat && controls.aleatory) {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: true },
            })
            setTracks({
                ...tracks,
                position:
                    tracks.position >= tracks.tracks.length - 1
                        ? 0
                        : Math.floor(Math.random() * tracks?.tracks?.length),
            })
        } else if (controls.repeat) {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: true },
            })
            setTracks({
                ...tracks,
                position:
                    tracks.position >= tracks.tracks.length - 1
                        ? 0
                        : tracks.position + 1,
            })
        } else if (controls.aleatory) {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: true },
            })
            setTracks({
                ...tracks,
                position:
                    tracks.position >= tracks.tracks.length - 1
                        ? 0
                        : Math.floor(Math.random() * tracks?.tracks?.length),
            })
        } else {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: false },
            })
            setTracks({
                ...tracks,
                position:
                    tracks.position >= tracks.tracks.length - 1
                        ? 0
                        : tracks.position + 1,
            })
        }
    }
    const handleBack = () => {
        if (controls.repeat) {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: true },
            })
            setTracks({
                ...tracks,
                position:
                    tracks.position <= 0
                        ? tracks.tracks.length - 1
                        : tracks.position - 1,
            })
        } else {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: false },
            })
            setTracks({
                ...tracks,
                position:
                    tracks.position <= 0
                        ? tracks.tracks.length - 1
                        : tracks.position - 1,
            })
        }
    }

    const handleOnEnded = () => {
        if (controls.repeat) {
            if (controls.aleatory) {
                setTracks({
                    ...tracks,
                    position:
                        tracks.position >= tracks.tracks.length - 1
                            ? 0
                            : Math.floor(
                                  Math.random() * tracks?.tracks?.length
                              ),
                })
            } else {
                setTracks({
                    ...tracks,
                    position:
                        tracks.position >= tracks.tracks.length - 1
                            ? 0
                            : tracks.position + 1,
                })
            }
        } else {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: false },
            })
        }
    }

    const handleAleatory = () => {
        dispatch({
            type: IActions.ON_Aleatory,
            payload: { ...controls, aleatory: !controls.aleatory },
        })
        setTracks({
            ...tracks,
            aleatory: Math.random(),
        })
    }

    const handleRepeat = () => {
        if (controls.repeat) {
            if (controls.loop) {
                dispatch({
                    type: IActions.ON_Repeat,
                    payload: {
                        ...controls,
                        repeat: !controls.repeat,
                    },
                })
                dispatch({
                    type: IActions.ON_Loop,
                    payload: {
                        ...controls,
                        loop: !controls.loop,
                    },
                })
            } else {
                dispatch({
                    type: IActions.ON_Loop,
                    payload: {
                        ...controls,
                        loop: !controls.loop,
                    },
                })
            }
        } else {
            dispatch({
                type: IActions.ON_Repeat,
                payload: {
                    ...controls,
                    repeat: !controls.repeat,
                },
            })
        }
    }
    useLayoutEffect(() => {
        if (localStorage.getItem('tracks'))
            setTracks(JSON.parse(localStorage.getItem('tracks') || '{}'))
    }, [])

    useEffect(() => {
        if (audio.current) {
            audio.current.ontimeupdate = (event: any) => {
                // if (audio.current) {
                //     audio.current.currentTime = event.target.currentTime
                // }
                setCurrentTime(event.target.currentTime)
            }
        }
    }, [audio.current])

    // useEffect(() => {
    //     if (audio.current) {
    //         audio.current.currentTime = currentTime
    //     }
    // }, [currentTime])

    useEffect(() => {
        if (audio.current) {
            audio.current.autoplay = controls.aleatory || controls.repeat
        }
    }, [controls.aleatory, controls.repeat])

    useEffect(() => {
        if (controls.repeat || controls.aleatory) {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: true },
            })
        } else {
            dispatch({
                type: IActions.ON_Play,
                payload: { ...controls, play: false },
            })
        }
    }, [track])
    useEffect(() => {
        if (audio.current) {
            audio.current.src = track?.preview_url
        }
    }, [track])

    useEffect(() => {
        if (audio.current) {
            audio.current.volume = controls.volumen / 100
            audio.current.loop = controls.loop
        }
    }, [controls.volumen, controls.loop])

    useEffect(() => {
        if (Object.keys(tracks).length > 0) {
            localStorage.setItem('tracks', JSON.stringify(tracks))
        }
    }, [tracks])

    return (
        <>
            {Object.keys(track).length !== 0 && (
                <NavPlayer>
                    <PlayerInfoSong>
                        <UserImage
                            url={track?.album?.images[2].url}
                            displayName={track.album.name}
                            size={60}
                            bradius={10}
                        />
                        <SSong.SongDescription>
                            <SSong.SontTitle>{track?.name}</SSong.SontTitle>
                            <SSong.SongArtists>
                                <Artists {...{ track }} />
                            </SSong.SongArtists>
                        </SSong.SongDescription>
                    </PlayerInfoSong>
                    <audio ref={audio} preload="auto" onEnded={handleOnEnded}>
                        <source src={track?.preview_url} type="audio/mpeg" />
                        <picture>
                            <source
                                srcSet={track?.album?.images[2].url}
                                type="image/jpeg"
                            />
                        </picture>
                    </audio>

                    <SSong.SongPlayerIcons>
                        <header>
                            <AleatoryButton
                                aleatory={controls.aleatory}
                                onClick={handleAleatory}
                            >
                                <GetPlayerIcons name="aleatory" />
                            </AleatoryButton>
                            <SSong.SongButton onClick={handleBack}>
                                {<GetIcon name="back" />}
                            </SSong.SongButton>
                            <SSong.SongButtonIcon
                                onClick={() => {
                                    controls.play ? handlePause() : handlePlay()
                                }}
                            >
                                <GetPlayerIcons
                                    name={controls.play ? 'pause' : 'play'}
                                />
                            </SSong.SongButtonIcon>
                            <SSong.SongButton onClick={handleNext}>
                                {<GetIcon name="next" />}
                            </SSong.SongButton>

                            <RepeatButton
                                onClick={handleRepeat}
                                repeat={controls.repeat}
                            >
                                <GetPlayerIcons
                                    name={`${
                                        controls.repeat && controls.loop
                                            ? 'repeatloop'
                                            : 'repeat'
                                    }`}
                                />
                            </RepeatButton>
                        </header>
                        <NavbarFooterBar>
                            <p>
                                {Math.round(
                                    audio.current?.currentTime
                                        ? audio.current.currentTime
                                        : 0
                                ) > 9
                                    ? `0:${Math.round(
                                          audio.current?.currentTime
                                              ? audio.current.currentTime
                                              : 0
                                      )}`
                                    : `0:0${Math.round(
                                          audio.current?.currentTime
                                              ? audio.current.currentTime
                                              : 0
                                      )}`}
                            </p>
                            <input
                                type="range"
                                name="progress"
                                id="progress"
                                value={Math.round(
                                    Number(audio.current?.currentTime || 0)
                                )}
                                onChange={(event: any) => {
                                    if (audio.current) {
                                        audio.current.currentTime =
                                            event.target.value
                                    }
                                }}
                                min="0"
                                max="30"
                            />
                            <p>0:30</p>
                        </NavbarFooterBar>
                    </SSong.SongPlayerIcons>
                    <SSong.SongPlayerVolumen>
                        <Link href="/queue">
                            <a>
                                {' '}
                                <GetPlayerIcons name="queue" />
                            </a>
                        </Link>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={controls.volumen}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                dispatch({
                                    type: IActions.ON_Volumen,
                                    payload: {
                                        ...controls,
                                        volumen: parseInt(event.target.value),
                                    },
                                })
                            }
                            step="any"
                        />
                    </SSong.SongPlayerVolumen>
                </NavPlayer>
            )}
        </>
    )
}

export default NavBarPlayer
