import axios from 'axios'

import { useEffect, useState } from 'react'

import * as s from './styles'

import IMG from '../ASSETS/profile.PNG'

import {useHistory} from 'react-router-dom'

import Loading from '../../components/PUBLIC/loading'

import * as R from '../axios'

export default function Mypage() {

    const history = useHistory();

    const [data,setData] = useState({
        name:"",
        email:"",
        gender:"",
        url:""
    })

    const [load,setLoad] = useState(true);

    const {name,email,gender,url} = data;

    useEffect(()=>{
        if(window.localStorage.getItem("token") == undefined){ 
            alert("로그인 후 이용해주세요!")
            history.push("/")
        }
        if(window.localStorage.getItem("token") != undefined){ 
            if(window.localStorage.getItem("token").length < 10){    
                alert("로그인 후 이용해주세요!")
                history.push("/")
            }
        }
        R.WithTokenGetRequest("v1/user/profile",{},"프로필")
        .then((e)=>{
            console.log(e);
            setData({
                name: e.username,
                email: e.email,
                gender: e.gender
            })
            setLoad(false)
        }).catch(()=>{
            alert("정보를 가져오는데 실패했습니다.")
            history.push("/")
        })
    },[])
    return(
        <>
        { load && <Loading/> }
            <s.Background>
                <s.ProfileContainer>
                    <s.Plus>+</s.Plus>
                    <s.Profile src={IMG}/>
                </s.ProfileContainer>
                <s.Name>{name} <b>{gender}</b></s.Name>
                <s.Email>{email}</s.Email>
            </s.Background>
        </>
    )
}