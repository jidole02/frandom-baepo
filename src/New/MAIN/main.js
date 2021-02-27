import * as s from './styles'
import {ReactComponent as 일러스트} from '../ASSETS/일러스트1.svg'
import {ReactComponent as 일러스트2} from '../ASSETS/일러스트2.svg'

export default function MainPage() {
    return(
        <>
            <s.SvgContainer>
                <일러스트/>
                <일러스트2/>
            </s.SvgContainer>
            <s.MainContainer>
                <s.IntroMent>
                    깔끔한 랜덤채팅, 청결한 랜덤채팅. <br/>
                    <b>FRANDOM</b>에서 만듭니다!
                </s.IntroMent>
                <s.SubIntro>랜덤채팅을 통해 다른 사람과 대화를 나누어 보세요!</s.SubIntro>
                <s.BtnContainer>
                    <s.Btn
                        to="/chating"
                    >시작하기 {">"}</s.Btn>
                    <s.Btn
                        to="/signup"
                    >회원가입 {">"}</s.Btn>
                </s.BtnContainer>
            </s.MainContainer>
        </>
    )
}