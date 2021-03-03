import * as s from './styles'
import {ReactComponent as Ill} from '../ASSETS/일러스트1.svg'
import {ReactComponent as Ill2} from '../ASSETS/일러스트2.svg'
import {useState,useEffect} from 'react'

export default function MainPage() {
    
    const [media,setMedia] = useState(false);

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
    return(
        <>
            <s.SvgContainer>
                <Ill/>
                <Ill2/>
            </s.SvgContainer>
            <s.MainContainer>
                <s.IntroMent>
                    깔끔한 랜덤채팅, 청결한 랜덤채팅. <br/>
                    <b>FRANDOM</b>에서 만듭니다!
                </s.IntroMent>
                <s.MIntroMent>FRANDOM</s.MIntroMent>
                <s.SubIntro>랜덤채팅을 통해 다른 사람과 대화를 나누어 보세요!</s.SubIntro>
                <s.BtnContainer>
                    <s.Btn
                        to=""
                        onClick={()=>{
                            window.location.href = "/chating"
                        }}
                    >시작하기 {">"}</s.Btn>
                    <s.Btn
                        to="/signup"
                    >회원가입 {">"}</s.Btn>
                </s.BtnContainer>
                <div id='mobonDivBanner_514776'><iframe name='ifrad' id='mobonIframe_514776' src='//www.mediacategory.com/servlet/adBanner?from="+escape(document.referrer)+"&s=514776&igb=75&iwh=640_107&cntad=1&cntsr=3' frameBorder='0' scrolling='no' style={{height:"107px", width:"640px", marginTop:"4%"}}></iframe></div> 
            </s.MainContainer>
        </>
    )
}