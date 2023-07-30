import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content:center;
    background-color: ${({ theme }) => theme.COLORS.BLACK3};
    padding-top: 10%;
`

export const TitlePage = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE_100};
`

export const ViewInputs = styled.View`
    gap: 24px;
    margin-top: 20px; 
    width: 80%;
`

export const ViewLoginBtn = styled.View` 
    width: 78%;
    margin-top: 30px;
`

export const LoginBtn = styled.TouchableOpacity`
    width: 80px;
    border-radius: 15px;
    padding: 7px 0px;
    text-align:center;
    background: ${({ theme }) => theme.COLORS.PRIMARY};
`

export const TextLoginBtn = styled.Text`
    text-align: center;
    font-weight: 800;
    color: ${({ theme }) => theme.COLORS.BLACK};
`

export const Alert = styled.View`
    margin-top: 10px;
    width: 80%;
    background-color: ${({ theme }) => theme.COLORS.ATTENTION};
    padding: 10px 8px;
    border-radius: 3px;
`

export const AlertTitle = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
`