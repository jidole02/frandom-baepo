import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import * as s from './styles'

export default function Mypage() {
    useEffect(()=>{
        axios({
            method:"get",
            url:"https://sonchaegeon.shop/v1/user/profile",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
            }
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <s.Background>
            <s.ProfileContainer>
                <s.Plus>+</s.Plus>
                <s.Profile src={"https://media.wired.com/photos/5e9f56f143e5800008514457/1:1/w_1277,h_1277,c_limit/Gear-Feature-Apple_new-iphone-se-white_04152020.jpg"}/>
            </s.ProfileContainer>
            <s.Name>정지원 <b>남자</b></s.Name>
            <s.Email>jidole041214@naver.com</s.Email>
        </s.Background>
    )
}