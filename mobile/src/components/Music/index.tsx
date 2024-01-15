import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "styled-components/native"
import { Music } from "../../@types/Music"
import { setMusicPlaying } from "../../redux/reducers/playerReducer"
import { RootState } from "../../redux/store"
import {
    Container,
    Avatar,
    Name,
    InfoMusic,
    InfoText
} from "./styles"
type Props = {
    data: Music
}

export const MusicItem = ({ data }: Props) => {
    const player = useSelector((state: RootState) => state.player)

    const dispatch = useDispatch()
    const theme = useTheme()

    const setMusic = () => dispatch(setMusicPlaying(data))

    return (
        <Container onPress={setMusic}>
            <Avatar
                source={{ uri: data.avatar }}
            />

            <InfoMusic>
                <Name style={{ color: player.musicPlaying.id === data.id ? theme.COLORS.PRIMARY : theme.COLORS.GRAY5 }} numberOfLines={1}>{data.name}</Name>

                <InfoText>Artista: {data.author} | Genêro: {data.genre}</InfoText>
            </InfoMusic>
        </Container>
    )
}