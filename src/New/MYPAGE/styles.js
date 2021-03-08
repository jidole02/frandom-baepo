import styled from 'styled-components'
import {mainColor} from '../../style/index'

export const Background = styled.div`
    width:100%;
    height:100%;
    align-items:center;
    justify-content:center;
    display:flex;
    flex-direction:column;
`

export const Profile = styled.img`
    width:350px;
    height:350px;
    border-radius:80%;
    box-shadow:0px 0px 10px whitesmoke;
    object-fit:cover;
`

export const ProfileContainer = styled.div`
    width:350px;
    height:350px;
`

export const Plus = styled.button`
    width:50px;
    height:50px;
    background-color:white;
    border-radius:80%;
    position:absolute;
    box-shadow:0px 0px 10px rgb(100,100,100,0.3);
    transform:translate(270px,270px);
    border:none;
    font-size:40px;
    color:${mainColor};
    font-family:나눔스퀘어;
    :hover{
        box-shadow:0px 0px 10px skyblue;
    }
`

export const Name = styled.p`
    color:black;
    font-weight:bold;
    font-size:3.5vmin;
    margin-top:2%;
    b{
        color:blue;
        font-size:1.7vmin;
    }
`

export const Email = styled.div`
    background-color:rgb(240,240,240);
    width:300px;
    height:40px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:1.3%;
    border-radius:5px;
    color:gray;
    border:1px solid rgb(180,180,180);
    font-size:15px;
`