import { useEffect, useState } from "react"
import { Music } from "../../@types/Music"
import { MusicItem } from "../../components/Music"
import { useApi } from "../../hooks/api"
import {
    Container,
    PageTitle,
    PageTitleImportant,
    Musics,
    InputSearch,
    Input,
    GenreCard,
    GenreCardTitle

} from "./styles"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useTheme } from "styled-components"

export const SearchScreen = () => {
    const [inputSearch, setInputSeach] = useState('')
    const [musics, setMusics] = useState<Music[]>([])

    const theme = useTheme()

    useEffect(() => {
        const getMusics = async () => {
            const getMusics = await useApi<{ data: Music[] }>("search", "get", { query: inputSearch })
            setMusics(getMusics.data.data)
        }
        getMusics()
    }, [inputSearch])

    return (
        <Container>
            <PageTitle>Buscar por <PageTitleImportant>músicas</PageTitleImportant></PageTitle>

            <InputSearch>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <Input
                    placeholder="Pesquisar por músicas"
                    value={inputSearch}
                    onChangeText={t => setInputSeach(t)}
                />
            </InputSearch>

            {musics == undefined || musics.length <= 0 ?
                <>
                    <GenreCard style={{ backgroundColor: theme.COLORS.BLUE1 }} onPress={() => setInputSeach('Internacional')}>
                        <GenreCardTitle>Eletrônicas / Internacionais</GenreCardTitle>
                    </GenreCard>
                    <GenreCard style={{ backgroundColor: theme.COLORS.ATTENTION_LIGHT8 }} onPress={() => setInputSeach('Pagode')}>
                        <GenreCardTitle>Pagodes</GenreCardTitle>
                    </GenreCard>
                    <GenreCard style={{ backgroundColor: theme.COLORS.GREEN2 }} onPress={() => setInputSeach('Samba')}>
                        <GenreCardTitle>Sambas</GenreCardTitle>
                    </GenreCard>
                    <GenreCard style={{ backgroundColor: theme.COLORS.PURPLE1 }} onPress={() => setInputSeach('Festa')}>
                        <GenreCardTitle>Festa</GenreCardTitle>
                    </GenreCard>
                </>
                :
                <Musics>
                    {musics.map((item, key) => (
                        <MusicItem
                            key={key}
                            data={item}

                        />
                    ))}
                </Musics>
            }
        </Container>
    )
}