import styled, { css } from "styled-components/native";
import { TextInputProps } from 'react-native'

interface TypeInput extends TextInputProps {
    isFocused: boolean
}

export const Container = styled.View``

export const Label = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE}; 
    margin-bottom:5px;
`

export const Input = styled.TextInput<TypeInput>`
    border-radius: 5px;
    padding: 8px 10px; 
    border: 1px solid  ${({ theme }) => theme.COLORS.PRIMARY};
    color: ${({ theme }) => theme.COLORS.GRAY4}; 

    ${({ isFocused }) => isFocused && css`
         color: ${({ theme }) => theme.COLORS.GRAY6}
    `}
`