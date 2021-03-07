import * as s from './styles'

import React,{useState} from 'react'

import {useHistory} from 'react-router-dom'

import Loading from '../../components/PUBLIC/loading';

import * as R from '../axios'

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
        R.AuthRequest("v1/auth/login",{"email" : data.id,"password" : data.password},"로그인")
        .then((e)=>{
            console.log(e)
            window.localStorage.setItem("Rtoken",e.refreshToken)
            window.localStorage.setItem("token", e.accessToken)
            history.push('/')
        }).catch(()=>{
            alert("다시 확인해주세요.")
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
                value={data.id}
            />
            <s.Input
                placeholder="비밀번호를 입력하세요."
                name="password"
                onChange={Input}
                type="password"
                value={data.password}
            />
            <s.Btn
                onClick={SubInputValue}
            >로그인</s.Btn>
            <s.NotAccount to="/signup">계정이 없으신가요?</s.NotAccount>
        </s.LoginContainer>
        </>
    )
}