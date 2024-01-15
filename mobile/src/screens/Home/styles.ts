import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center; 
    background-color: ${({ theme }) => theme.COLORS.BLACK3}; 
`

export const PageTitle = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.WHITE};
    padding: 20px 0 15px 0px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    margin-bottom: 10px;
`

export const PageTitleImportant = styled.Text`
    color: ${({ theme }) => theme.COLORS.PRIMARY};
    font-weight: 900;
`

export const Musics = styled.ScrollView`

`