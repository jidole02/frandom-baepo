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
        </s.Background>
    )
}

export default Match;