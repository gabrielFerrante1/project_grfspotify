import Sound from "react-native-sound";
import { useEffect, useState } from 'react'
import ENV from '../../config/services'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPause, setPlay } from "../../redux/reducers/playerReducer";
import {
    Container,
    Music,
    MusicAvatar,
    MusicInfo,
    MusicTitle,
    MusicAuthor,
    MusicControls
} from "./styles";
import { TouchableOpacity } from 'react-native'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTheme } from "styled-components";

export const Player = () => {
    const player = useSelector((state: RootState) => state.player)

    const [sound, setSound] = useState<Sound>()

    const theme = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        if (player.musicPlaying.id == 0) return;

        const soundClass = new Sound(`${ENV.backend.base_url}/musics/${player.musicPlaying.path}`, Sound.MAIN_BUNDLE, err => { !err && dispatch(setPlay()) })
        setSound(soundClass)


    }, [player.musicPlaying])

    useEffect(() => {
        if (!player.isPlaying) {
            sound?.pause()
        } else {
            sound?.play()
        }
    }, [player.isPlaying])

    return (
        <Container>
            {player.musicPlaying.id !== 0 &&
                <Music>
                    <MusicAvatar source={{ uri: player.musicPlaying.avatar }} />

                    <MusicInfo>
                        <MusicTitle numberOfLines={1}>{player.musicPlaying.name}</MusicTitle>
                        <MusicAuthor numberOfLines={1}>{player.musicPlaying.author}</MusicAuthor>
                    </MusicInfo>

                    <MusicControls>
                        {player.isPlaying ?
                            <TouchableOpacity onPress={() => dispatch(setPause())}>
                                <FontAwesomeIcon icon={faPause} color={theme.COLORS.GRAY4} size={23} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => dispatch(setPlay())}>
                                <FontAwesomeIcon icon={faPlay} color={theme.COLORS.GRAY4} size={20} />
                            </TouchableOpacity>
                        }
                    </MusicControls>
                </Music>
            }
        </Container>
    )
}