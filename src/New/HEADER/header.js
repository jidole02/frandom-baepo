import * as s from './styles'
import {mainColor} from '../../style/index'
import {useHistory} from 'react-router-dom'

export default function Header() {
    const LinkStyle = {borderBottom:`4px solid ${mainColor}`}
    const history = useHistory();
    return(
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
    )
}