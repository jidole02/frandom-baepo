import axios from 'axios'
import { useEffect, useState } from 'react/cjs/react.development'
import * as s from './styles'
import IMG from '../ASSETS/profile.PNG'
import {useHistory} from 'react-router-dom'
import Loading from '../../components/PUBLIC/loading'

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
        axios({
            method:"get",
            url:"https://sonchaegeon.shop/v1/user/profile",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
            },
            data:{}
        }).then((res)=>{
            console.log(res)
            const {data} = res;
            console.log(data.profile_img)
            setData({
                name:data.username,
                email:data.email,
                gender:data.gender,
                url:data.profile_img
            })
            setLoad(false)
        }).catch((err)=>{
            console.log(err)
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