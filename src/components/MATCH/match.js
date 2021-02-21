import React from 'react'
import * as s from './styles'
import { useHistory} from 'react-router-dom'

const Match=()=>{
    const history = useHistory();
    return(
        <s.Background>
            <s.Title>FRANDOM!</s.Title>
            <s.MatchButton
                onClick={()=>{
                    history.push('/chating')
                }}
            >랜덤채팅 시작!</s.MatchButton>
            <div id='mobonDivBanner_511410'><iframe name='ifrad' id='mobonIframe_511410' src='//www.mediacategory.com/servlet/adBanner?from="+escape(document.referrer)+"&s=511410&igb=75&iwh=640_107&cntad=1&cntsr=3' frameBorder='0' scrolling='no' style={{height:"107px", width:"640px",marginTop:"5%"}}></iframe></div>
        </s.Background>
    )
}

export default Match;