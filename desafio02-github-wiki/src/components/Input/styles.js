import styled from "styled-components";

export const InputContainer = styled.div`
    
    
    input{
        display: block;
        width: 100%;
        padding: 8px 12px;
        font-size: 16px;
        line-height: 1.5;
        color: #d1d5da;
        background: transparent;
        background-image: none;
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 16px 16px;
        border: 1px solid #d1d5da;
        border-radius: 6px;
        box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
        transition: border-color .2s cubic-bezier(.3,0,.5,1),box-shadow .2s cubic-bezier(.3,0,.5,1);
    }

    input:focus {
        outline: none;
        border-color: #0366d6;
        box-shadow: 0 0 0 3px rgba(3,102,214,.3);
    }
}

`