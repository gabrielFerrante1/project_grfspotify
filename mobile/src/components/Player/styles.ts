import styled from "styled-components/native";

export const Container = styled.View`
    position: absolute; 
    z-index: 1000000;
    top: 84.8%;
    width: 100%; 
`

export const Music = styled.View`  
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    padding: 0 10px;
    background-color: ${({ theme }) => theme.COLORS.BLACK3}; 
    border: 0.6px solid ${({ theme }) => theme.COLORS.WHITE};
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
`

export const MusicAvatar = styled.Image`
    width:45px;
    height:45px;
    border-radius: 5px;
`

export const MusicInfo = styled.View`
    flex:1;
    padding: 0 0 0 15px;
`

export const MusicTitle = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.PRIMARY};
    max-width: 98%; 
`

export const MusicAuthor = styled.Text`
    font-size: 13px;
    max-width: 90%; 
    color: ${({ theme }) => theme.COLORS.GRAY3};
`

export const MusicControls = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items:center; 
    width: 80px;
    height: 100%;
    gap: 14px;
    padding-right: 10px;
`