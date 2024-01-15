import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%; 
    border: 0.5px solid ${({ theme }) => theme.COLORS.GRAY3};
    border-top-color: transparent;
    border-left-width: 0;
    border-right-width: 0; 
    padding: 11px 20px; 
`

export const Avatar = styled.Image`
    width: 38px;
    border-radius: 5px;
    height: 38px;
`

export const Name = styled.Text`
   font-size:15px; 
`

export const InfoMusic = styled.View``

export const InfoText = styled.Text`
    font-size: 13px;
    color: ${({ theme }) => theme.COLORS.GRAY3};
`