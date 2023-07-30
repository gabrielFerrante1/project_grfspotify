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
    width:100%;
`

export const InputSearch = styled.View`
    width: 90%;
    flex-direction: row;
    align-items:center;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 20px;
    height: 40px;
    padding: 0 10px 0 15px;
    margin: 15px 0 30px 0;
`

export const Input = styled.TextInput`
    flex:1;
    margin-left: 5px;
`

export const GenreCard = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 86%;
    background-color: red;
    border-radius: 7px;
    margin-bottom: 25px;
`
export const GenreCardTitle = styled.Text`
    font-size: 19px;
    font-weight: 800;
    color: ${({ theme }) => theme.COLORS.WHITE}
`