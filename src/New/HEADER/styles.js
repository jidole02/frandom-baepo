import styled from 'styled-components'
import {mainColor} from '../../style/index'
import {NavLink} from 'react-router-dom'

export const HeaderContainer = styled.header`
    width:90%;
    padding:3vh 5%;  
    display:flex;
    align-items:center;
    justify-content:space-between;
    z-index:300;
    position:absolute;
    @media screen and (max-width:768px){
        width:90%;
        background-color:${mainColor};
        display:flex;
        flex-direction:column;
        ul{
            flex-direction:column;
        }
    }
`   

export const HeaderTitle = styled.p`
    color:black;
    font-size:3vmin;
    font-weight:bold;
    letter-spacing:-2px;
    padding-bottom:20px;
    cursor:pointer;
    b{
        color:${mainColor};
    }
    @media screen and (max-width:768px){
        display:none;
    }
`

export const MediaHeader = styled.div`
    width:100%;
    display:none;
    @media screen and (max-width:768px){
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    i{
        color:#C2E2F8;
        :first-of-type{
            padding: 0 6px;
        }
    }
    p{
        color:white;
        font-weight:bold;
    }
`

export const MenuBar = styled.ul`
    width:20%;
    display:flex;
    justify-content:space-between;
    @media screen and (max-width:768px){
        width:100%;
        margin-top:20px;
    }
`

export const Menu = styled(NavLink)`
    padding-bottom:20px;
    color:black;
    font-family:나눔스퀘어;
    font-size:1.8vmin;
    @media screen and (max-width:768px){
        margin-top:10px;
        color:white;
        width:100%;
        font-size:12px;
        font-weight:bold;
        display:flex;
        justify-content:center;
        padding: 8px 0;
        :first-of-type{
            margin-top:0;
        }
    }
`