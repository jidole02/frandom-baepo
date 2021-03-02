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
    i{
        display:none;
    }
    @media screen and (max-width:360px){
        width:90%;
        height:3%;
        display:flex;  
        box-shadow:0px 3px 10px rgb(10,10,10,0.1); 
        background-color:${mainColor};
        padding:15px 5%;
        p{
            display:none;
        }
        ul{
            display:none;
        }
        i{
            display:block;
            color:white;
        }
    }
`

export const Section = styled.section`
    display:none;
    width:100%;
    position:absolute;
    z-index:300;
    background-color:white;
    box-shadow:5px 0px 10px rgb(10,10,10,0.1);
    padding:2% 0;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    margin-top:-9vh;
    transition:1s;
    @media screen and (max-width:360px){
        display:flex;
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
`

export const MenuBar = styled.ul`
    width:20%;
    display:flex;
    justify-content:space-between;
    color:white;
`

export const Menu = styled(NavLink)`
    padding-bottom:20px;
    color:black;
    font-family:나눔스퀘어;
    font-size:1.8vmin;
    @media screen and (max-width:360px){
        color:gray;
        font-size:14px;
    }
`