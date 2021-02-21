import React, { useEffect } from 'react';
import * as f from '../STYLECOMPONENT/publicStyle'
import {Link} from 'react-router-dom'

function FirstPage(Lang){
    const a = Lang.Lang;
    const LinkStyle = {position:"relative", width:"100%", height:"100%"}
    useEffect(()=>{
        window.localStorage.setItem("token"," ")
    })
    return(
        <f.FirstPageContainer>
            <h1> FRANDOM!</h1>
            <h3>{(a===0)?"Enjoy random chat" : "랜덤채팅을 즐겨보세요!"}</h3>
            <f.ButtonContainer>
                <Link style={LinkStyle} to="/nickname"><f.StartButton>{(a===0)?"GET START" : "로그인"}</f.StartButton></Link> 
            </f.ButtonContainer>
            <f.ButtonContainer style={{marginTop:"1%"}}>
                <Link style={LinkStyle} to="/signup"><f.StartButton>{(a===0)?"GET START" : "회원가입"}</f.StartButton></Link> 
            </f.ButtonContainer>
            <div id='mobonDivBanner_511410'><iframe name='ifrad' id='mobonIframe_511410' src='//www.mediacategory.com/servlet/adBanner?from="+escape(document.referrer)+"&s=511410&igb=75&iwh=640_107&cntad=1&cntsr=3' frameBorder='0' scrolling='no' style={{height:"107px", width:"640px",marginTop:"5%"}}></iframe></div>
        </f.FirstPageContainer>
    )
}

export default FirstPage;