import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "../../@types/Music";

export const playerReducer = createSlice({
    name: 'player',
    initialState: {
        isPlaying: false,
        musicPlaying: {
            id: 0,
            name: '',
            avatar: '',
            path: '',
            author: '',
            genre: ''
        } as Music
    },
    reducers: {
        setPlay: (state) => {
            state.isPlaying = true
        },
        setPause: (state) => {
            state.isPlaying = false
        },
        setMusicPlaying: (state, action: PayloadAction<Music>) => {
            if (state.isPlaying) state.isPlaying = false;

            state.musicPlaying = action.payload
        },
    }
})

export const { setPlay, setPause, setMusicPlaying, } = playerReducer.actions

export default playerReducer.reducer
