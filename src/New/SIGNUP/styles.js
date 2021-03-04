import styled from 'styled-components'
import {mainColor} from '../../style/index'

export const SignupContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;  
`

export const Signup = styled.p`
    color:${mainColor};
    font-weight:bold;
    font-size:4vmin;
    @media screen and (max-width:768px){
        font-size:25px;
        margin-bottom:10px;
    }
`

export const Description = styled.p`
    color:#ABABAB;
    font-size:1.5vmin;
    margin-top:1.5%;
    margin-bottom:0.5%;
    @media screen and (max-width:768px){
        display:none;
    }
`

export const Input = styled.input`
    color:#9B9B9B;
    background-color:#FBFBFB;
    border:1px solid #BFBFBF;
    width:18%;
    height:55px;
    margin-top:1%;
    border-radius:5px;
    padding:0 1%;
    font-size:1.4vmin;
    @media screen and (max-width:768px){
        width:250px;
        font-size:14px;
        padding: 0 10px;
        margin-top:3%;
        height:50px;
    }
`

export const AccessEmail = styled.div`
    display:flex;
    width:32%;
    margin-left:12%;
    align-items:center;
    margin-top:0.7%;
    input{
        width:55%;
        padding:0 4%;
    }
    :first-of-type{
        margin-top:2%;
    }
    @media screen and (max-width:768px){
        width:300px;
        margin-right:20px;
        }
`

export const SendBtn = styled.button`
    height:43px;
    background-color:${mainColor};
    border:none;
    border-radius:3px;
    color:white;
    font-size:1.5vmin;
    margin-left:2%;
    font-family:나눔스퀘어;
    padding:0 3%;
`

export const Btn = styled.button`
    width:20%;
    height:55px;
    margin-top:1.7%;
    background-color:${mainColor};
    border:none;
    border-radius:5px;
    color:white;
    font-size:2vmin;
    font-weight:bold;
    @media screen and (max-width:768px){
        width:270px;
        font-size:14px;
        padding: 0 10px;
        margin-top:3%;
        height:50px;
    }
`

export const Select = styled.select`
    color:#9B9B9B;
    background-color:#FBFBFB;
    border:1px solid #BFBFBF;
    width:20%;
    height:55px;
    margin-top:1%;
    border-radius:5px;
    padding:0 1%;
    font-size:1.4vmin;
    outline:none;
    @media screen and (max-width:768px){
        width:270px;
        font-size:14px;
        padding: 0 10px;
        margin-top:3%;
        height:50px;
    }
`