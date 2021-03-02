import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {mainColor} from '../../style/index'

export const LoginContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;  
`

export const Login = styled.p`
    color:${mainColor};
    font-weight:bold;
    font-size:4vmin;
    @media screen and (max-width:768px){
        font-size:30px;
    }
`

export const Description = styled.p`
    color:#ABABAB;
    font-size:1.5vmin;
    margin-top:1.5%;
    margin-bottom:0.5%;
    @media screen and (max-width:768px){
        opacity:0;
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
        margin-top:10px;
        height:50px;
    }
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
        margin-top:20px;
        font-size:18px;
        font-family:나눔스퀘어;
        font-weight:bold;
    }
`

export const NotAccount = styled(Link)`
    color:#C2C0C0;
    font-size:1.3vmin;
    margin-top:4%;
    cursor: pointer;
    @media screen and (max-width:768px){
        margin-top:40px;
        font-size:13px;
    }
`