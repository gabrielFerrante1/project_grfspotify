import { StatusBar, View } from 'react-native'
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { ThemeProvider } from 'styled-components/native'
import { theme } from "./styles/theme"
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from "./routes"
import { useEffect } from 'react'
import { useAuth } from './hooks/auth'
import { Player } from './components/Player/player'

const UserInitialization = () => {
    const { userInit } = useAuth()
    useEffect(() => { userInit() }, [])

    return <View />
}

const App = () => {
    return (
        <Provider store={store} >
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <UserInitialization />
                    <Player />
                    <StatusBar
                        animated={true}
                        backgroundColor={theme.COLORS.BLACK}
                        barStyle='light-content'
                    />
                    <Routes />
                </NavigationContainer>
            </ThemeProvider>
        </Provider>
    )
}

export default App