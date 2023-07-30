import { useState } from 'react'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useTheme } from "styled-components"
import { AuthInput } from '../../components/AuthInput'
import {
    Container,
    TitlePage,
    ViewInputs,
    ViewLoginBtn,
    LoginBtn,
    TextLoginBtn,
    Alert,
    AlertTitle
} from "./styles"
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth'

export const LoginScreen = () => {
    const { navigate }: NavigationProp<ParamListBase> = useNavigation()

    const theme = useTheme()
    const { signIn } = useAuth()

    const [error, setError] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const login = async () => {
        if (!inputEmail || !inputPassword) {
            setError('Preencha todos os campos')
        } else {
            setError('')
        }

        const login = await signIn(inputEmail, inputPassword)
        if (!login) {
            setError('Email e/ou senha inválido(s)')
        }
    }

    return (
        <Container>
            <FontAwesomeIcon icon={faShieldAlt} style={{ color: theme.COLORS.PRIMARY, marginBottom: 10 }} size={25} />
            <TitlePage>Faça login ou cadastre-se</TitlePage>

            {error &&
                <Alert>
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            }

            <ViewInputs>
                <AuthInput
                    label='Email:'
                    value={inputEmail}
                    setValue={setInputEmail}
                />
                <AuthInput
                    label='Senha:'
                    value={inputPassword}
                    setValue={setInputPassword}
                />
            </ViewInputs>

            <ViewLoginBtn>
                <LoginBtn onPress={login}>
                    <TextLoginBtn>Entrar</TextLoginBtn>
                </LoginBtn>
            </ViewLoginBtn>
        </Container>
    )
}