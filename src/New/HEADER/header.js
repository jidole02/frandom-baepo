import * as s from './styles'
import {mainColor} from '../../style/index'
import {useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'

export default function Header() {
    const LinkStyle = {borderBottom:`4px solid ${mainColor}`}
    const history = useHistory();
    const [login, setLogin] = useState(false);
    const [menu,setMenu] = useState(false);
    const [media,setMedia] = useState(false);
    useEffect(()=>{
        console.log(localStorage.getItem("token"))
        if((window.localStorage.getItem("token") != undefined 
        && window.localStorage.getItem("token")!=="") 
        && window.localStorage.getItem("token") !== "null"){
            if(window.localStorage.getItem("token").length > 1){
                setLogin(true)
            }
        }
    },[window.localStorage.getItem("token")])
    
    const Logout =()=>{
        setMenu(!menu)
        setLogin(false)
        window.localStorage.setItem("token","");
        window.location.reload()
    }

    useEffect(()=>{
        if(localStorage.getItem("token") != undefined){
            if(localStorage.getItem("token").length < 10){
                localStorage.setItem("token", localStorage.getItem("RToken"));
            }
        }
    },[])

    useEffect(()=>{
        setInterval(()=>{
            if(window.innerWidth < 768){
                setMedia(true);
            }
            else{
                setMedia(false)
            }
        },500)
    },[])
    
    const closeHeader =()=>{
        setMenu(!menu)
    }
    return(
        <>
            <s.HeaderContainer>
                <s.HeaderTitle
                    onClick={()=>{history.push('/')}}
                ><b>F</b>RANDOM</s.HeaderTitle>
                <s.MediaHeader>
                    <p onClick={()=>{
                        history.push("/")
                    }}><i className="fas fa-blog"></i><i>F</i>RANDOM</p>
                    <i  className="fas fa-bars"
                        onClick={()=>{
                            setMenu(!menu)    
                        }}></i>
                </s.MediaHeader>
                <s.MenuBar style={media && menu ? {display:"none"} : {display:"flex"}}>
                    {login && 
                    <>
                        <s.Menu 
                            to="/login"
                            onClick={closeHeader}
                            activeStyle={LinkStyle}
                        ></s.Menu>
                        <s.Menu 
                            to=""
                            onClick={Logout}
                        >로그아웃</s.Menu>
                        <s.Menu 
                            to="/chating"
                        >시작하기</s.Menu>
                    </>
                    }
                    {!login && 
                        <>
                        <s.Menu 
                            to="/login"
                            activeStyle={LinkStyle}
                            onClick={closeHeader}
                        >로그인</s.Menu>
                        <s.Menu 
                            to="/signup"
                            activeStyle={LinkStyle}
                            onClick={closeHeader}
                        >회원가입</s.Menu>
                        <s.Menu 
                            to="/chating"
                            onClick={closeHeader}
                        >시작하기</s.Menu>
                        </>
                    }
                </s.MenuBar>
            </s.HeaderContainer>
        </>
    )
}