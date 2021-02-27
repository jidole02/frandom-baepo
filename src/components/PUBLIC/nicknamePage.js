import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import * as f from '../STYLECOMPONENT/publicStyle'
import Loading from '../PUBLIC/loading'
import axios from 'axios'

function NicknamePage(Lang){
    const a = Lang.Lang;
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
/*         Request("POST", "v1/auth/login",{"Content-type":"application/json"}, 
        {
            "email" : data.id,
            "password" : data.password
        }).then((e)=>{
            window.localStorage.setItem("token", e.data.accessToken)
            window.location.href = "/match" 
        }).catch((err)=>{
            console.log(err)    
            setToggle(false)
            window.alert("아이디 혹은 비밀번호를 확인해주세요.")
        })
 */
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
            history.push('/match')
        }).catch((err)=>{
            window.alert(err.response.data.error.message)
            setToggle(false)
        }) 
    }
    return(
        <>
            { toggle && <Loading></Loading> }
            <f.FirstPageContainer>
                <h1> FRANDOM!</h1>
                <f.NicknameInput onChange={Input} name="id" value={data.id} placeholder={(a===0)?"NICKNAME" : "이메일을 입력하세요."}></f.NicknameInput>
                <f.NicknameInput onChange={Input} name="password" type="password" value={data.password} placeholder={(a===0)?"NICKNAME" : "비밀번호를 입력하세요."}></f.NicknameInput>
                <f.ButtonContainer2>
                <f.NickSubButton onClick={SubInputValue}>{(a===0)?"SUBMIT" : "제출하기"}</f.NickSubButton>
                </f.ButtonContainer2>
                <Link to="/signup"><h3>계정이 없으신가요?</h3></Link>
            </f.FirstPageContainer>
        </>
    )
}

export default NicknamePage;