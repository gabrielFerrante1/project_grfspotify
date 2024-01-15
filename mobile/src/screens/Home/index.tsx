import { useEffect, useState } from "react"
import { Music } from "../../@types/Music"
import { MusicItem } from "../../components/Music"
import { useApi } from "../../hooks/api"
import { Container, PageTitle, PageTitleImportant, Musics } from "./styles"

export const HomeScreen = () => {
    const [musics, setMusics] = useState<Music[]>([])

    useEffect(() => {
        const getMusics = async () => {
            const getMusics = await useApi<{ data: Music[] }>("search", "get", { query: 's' })
            setMusics(getMusics.data.data)
        }
        getMusics()
    }, [])

    return (
        <Container>
            <PageTitle>Músicas para <PageTitleImportant>você</PageTitleImportant></PageTitle>

            <Musics>
                {musics.map((item, key) => (
                    <MusicItem
                        key={key}
                        data={item}

                    />
                ))}
            </Musics>
        </Container>
    )
}