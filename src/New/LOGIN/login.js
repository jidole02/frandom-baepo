import * as s from './styles'
import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Loading from '../../components/PUBLIC/loading';

export default function LoginPage() {
    const history = useHistory();
    const [data, setData] = useState({
        id : "",
        password: ""
    });
    const [toggle,setToggle] = useState(false);
    const Input=(e)=>{
        const {value, name} = e.target;
        setData({
            ...data,
            [name] : value
        })
    }
    const SubInputValue =()=>{
        setToggle(true)
        axios({
            method:"post",
            url:"https://sonchaegeon.shop/v1/auth/login",
            headers:{
                "Content-Type": "application/json" 
            },
            data:{
                "email" : data.id,
                "password" : data.password
            }
        }).then((e)=>{
            window.localStorage.setItem("token", e.data.accessToken)
            history.push('/')
            setTimeout(()=>{
                axios({
                  method:"get",
                  url:"https://sonchaegeon.shop/v1/auth/refresh",
                  headers:{
                    "Content-type":"application/json", 
                    "x-refresh-token":"Bearer " + e.data.refreshToken
                  },
                  data:{}
                }).then((e)=>{
                    window.localStorage.setItem("RToken",e.data.accessToken)
                    window.localStorage.setItem("token", e.data.accessToken)
                })
            },7200000)
        }).catch((err)=>{
            window.alert(err.response.data.error.message)
            setToggle(false)
        }) 
    }
    return(
        <>
        {toggle && <Loading/>}
        <s.LoginContainer>
            <s.Login>LOGIN</s.Login>
            <s.Description>FRANDOM 로그인을 환영합니다.</s.Description>
            <s.Input
                placeholder="이메일을 입력하세요."
                name="id"
                onChange={Input}
            />
            <s.Input
                placeholder="비밀번호를 입력하세요."
                name="password"
                onChange={Input}
                type="password"
            />
            <s.Btn
                onClick={SubInputValue}
            >로그인</s.Btn>
            <s.NotAccount to="/signup">계정이 없으신가요?</s.NotAccount>
        </s.LoginContainer>
        </>
    )
}