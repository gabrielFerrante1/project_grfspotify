import { HomeScreen } from "../screens/Home"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faSearch, faBars, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "styled-components/native";
import { useAuth } from "../hooks/auth";
import { LoginScreen } from "../screens/Login";
import { SearchScreen } from '../screens/Search'

const { Navigator, Screen } = createBottomTabNavigator();

export const Routes = () => {
    const theme = useTheme()

    const { isLogged } = useAuth()

    const middlewareAuth = (component: JSX.Element) => isLogged ? component : <LoginScreen />

    return (
        <Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 54,
                    backgroundColor: theme.COLORS.BLACK3,
                    paddingTop: 2,
                    paddingBottom: 4
                },
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case 'Home':
                            return <FontAwesomeIcon icon={faHouse} size={18} color={focused ? theme.COLORS.PRIMARY : theme.COLORS.GRAY2} />
                        case 'Search':
                            return <FontAwesomeIcon icon={faSearch} size={18} color={focused ? theme.COLORS.PRIMARY : theme.COLORS.GRAY2} />
                        case 'Playlists':
                            return <FontAwesomeIcon icon={faBars} size={18} color={focused ? theme.COLORS.PRIMARY : theme.COLORS.GRAY2} />
                        case 'Login':
                            return <FontAwesomeIcon icon={faUserAlt} size={18} color={focused ? theme.COLORS.PRIMARY : theme.COLORS.GRAY2} />
                    }
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                tabBarActiveTintColor: theme.COLORS.GRAY5,
                tabBarInactiveTintColor: theme.COLORS.GRAY3,
            })}
        >
            <Screen name="Home" options={{ title: "Página Inicial" }} component={HomeScreen} />
            <Screen name="Search" options={{ title: "Buscar" }} component={SearchScreen} />
            <Screen name="Playlists" options={{ title: "Sua Biblioteca" }} children={() => middlewareAuth(<HomeScreen />)} />

            {/* Routes of authentication*/}
            {!isLogged && <Screen name="Login" component={LoginScreen} />}
        </Navigator>

    )
}
