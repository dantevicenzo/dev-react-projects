import styled from "styled-components";

export const InputContainer = styled.div`
    width: 100%;
    height: 90px;
    background-color: #202020;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;

    input {
        width: 96%;
        height: 75px;
        background-color: #202020;
        border: 0;
        font-size: 45px;
        text-align: right;
        padding: 0 12px;
        color: #FFFFFF;        
        font-weight: 600;
        margin-bottom: 6px;
    }

    .valueCurrentOperation {
        font-size: 15px;
        width: 93.5%;
        font-weight: 450;
        color: #C3C3C3;  
        margin-bottom: -9px;
    }
`