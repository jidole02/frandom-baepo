import styled from 'styled-components'
import {mainColor} from '../../style/index'
import {Link} from 'react-router-dom'

export const SvgContainer = styled.div`
    width:90%;
    height:100%;
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    padding:0 5%;
    position:absolute;
    svg{
        width:22%;
    }
    @media screen and (max-width:360px){
        opacity:0;
    }
`

export const MainContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    position:absolute;
    z-index:30;
`

export const IntroMent = styled.p`
    color:black;
    font-weight:bold;
    text-align:center;
    font-size:5vmin;
    line-height:140%;
    b{
        color:${mainColor};
    }
`

export const SubIntro = styled.p`
    color:#9B9B9B;
    font-size:1.8vmin;
    margin-top:2%;
`

export const BtnContainer = styled.div`
    width:22%;
    height:6%;
    display:flex;
    justify-content:space-between;
    margin-top:3%;
`

export const Btn = styled(Link)`
    width:45%;
    height:100%;
    border:none;
    border-radius:4px;
    cursor:pointer;
    background-color:transparent;
    font-size:2vmin;
    font-weight:bold;
    display:flex;
    justify-content:center;
    align-items:center;
    transition:0.5s;
    :nth-of-type(1){
        background-color:${mainColor};
        color:white;
    }
    :last-of-type{
        border:1px solid #BCBCBC;
        color:#BCBCBC;
    }
    :hover{
        box-shadow:3px 3px 10px #CFCCFF;
    }
`