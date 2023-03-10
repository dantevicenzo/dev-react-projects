import styled from "styled-components";

export const Container = styled.div`
    * {
        font-family: Segoe UI; 
    }

    width: 100%;
    height: 100vh;
    background-color: #F3F3F3; 
    background-image: url('https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2400-5630.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Content = styled.div`
    background-color: #1E2024;
    padding: 6px;
    border-radius: 9px;
    width: 390px;
    min-width: 390px;
    max-width: 900px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
`

export const Row = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Column = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`