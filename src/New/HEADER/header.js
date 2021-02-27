import * as s from './styles'
import {mainColor} from '../../style/index'
import {useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'

export default function Header() {
    const LinkStyle = {borderBottom:`4px solid ${mainColor}`}
    const history = useHistory();
    const [login, setLogin] = useState(false);
    useEffect(()=>{
        if(window.localStorage.getItem("token") !== null){
            if(window.localStorage.getItem("token").length > 1){
                setLogin(true)
            }
        }
    },[])

    const Logout =()=>{
        window.localStorage.setItem("token","");
        window.location.href = "/"
    }
    return(
        <>
        {login ? 
            // 로그인 됬을 때는
            <s.HeaderContainer>
                <s.HeaderTitle
                    onClick={()=>{history.push('/')}}
                ><b>F</b>RANDOM</s.HeaderTitle>
                <s.MenuBar>
                    <s.Menu 
                        to="/login"
                        activeStyle={LinkStyle}
                    ></s.Menu>
                    <s.Menu 
                        to="/"
                        onClick={Logout}
                    >로그아웃</s.Menu>
                    <s.Menu 
                        to="/chating"
                        activeStyle={LinkStyle}
                    >시작하기</s.Menu>
                </s.MenuBar>
            </s.HeaderContainer>
            :
            // 로그인 안됬을 때는
            <s.HeaderContainer>
            <s.HeaderTitle
                onClick={()=>{history.push('/')}}
            ><b>F</b>RANDOM</s.HeaderTitle>
            <s.MenuBar>
                <s.Menu 
                    to="/login"
                    activeStyle={LinkStyle}
                >로그인</s.Menu>
                <s.Menu 
                    to="/signup"
                    activeStyle={LinkStyle}
                >회원가입</s.Menu>
                <s.Menu 
                    to="/chating"
                    activeStyle={LinkStyle}
                >시작하기</s.Menu>
            </s.MenuBar>
        </s.HeaderContainer>
        }
        </>
    )
}