import { useState } from 'react'
import {
    Input,
    Container,
    Label
} from "./styles"

type Props = {
    label: string;
    value: string;
    setValue: (a: string) => void
}

export const AuthInput = ({ label, value, setValue }: Props) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <Container>
            <Label>{label}</Label>
            <Input
                value={value}
                onChangeText={v => setValue(v)}
                isFocused={isFocused}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoCorrect={false}
            />
        </Container>
    )
}