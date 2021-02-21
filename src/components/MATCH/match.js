import React from 'react'
import * as s from './styles'
import {Link} from 'react-router-dom'

const Match=()=>{
    const LinkStyle = { height:"6%",position:"absolute",marginBottom:"40%" }
    return(
        <s.Background>
            <s.Title>FRANDOM!</s.Title>
            <Link style={LinkStyle} to="/chating"><s.MatchButton>랜덤채팅 시작!</s.MatchButton></Link>
            <div id='mobonDivBanner_511407'><iframe name='ifrad' id='mobonIframe_511407' src='//www.mediacategory.com/servlet/adBanner?from="+escape(document.referrer)+"&s=511407&igb=75&iwh=468_60&cntad=1&cntsr=3' frameBorder='0' scrolling='no' style={{height:"60px", width:"468px",marginTop:"3%"}}></iframe></div>
        </s.Background>
    )
}

export default Match;