import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #44F1FA; 

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Content = styled.div`
    background-color: #1E2024;
    padding: 6px;
    border-radius: 6px;
    width: 60%;
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