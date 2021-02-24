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
`

export const Menu = styled(NavLink)`
    padding-bottom:20px;
    color:black;
    font-family:나눔스퀘어;
    font-size:1.8vmin;
`