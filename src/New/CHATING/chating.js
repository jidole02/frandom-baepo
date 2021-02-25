import * as s from './styles'

import {ReactComponent as 일러스트} from '../../ASSETS/일러스트1.svg'

import {ReactComponent as 일러스트2} from '../../ASSETS/일러스트2.svg'

import { useHistory } from 'react-router'

import React,{useState,useRef,useEffect} from 'react'

import { io } from "socket.io-client";

const socket = io("wss://sonchaegeon.shop", {
    query: {
        token: "Bearer " + window.localStorage.getItem("token")
    }
});
export default function ChatingComponent() {
    const history = useHistory();
    const [data, setData] = useState("");
    const [Chating, setChating] = useState([])
    const ChatingDiv = useRef();

    const ChatingSave = (e) => {
        setData(e.target.value);
    }

    const Send = (e) => {
        e.preventDefault();
        setChating([
            ...Chating,
            { chating:data, id:1 }
        ])
/*         socket.emit("sendMessage", data) */
        setData("")
    }

    useEffect(()=>{
        ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
    },[Chating])

    return(
        <>
            {/* 상대방 나간 모달 */}
{/*             <s.ModalContainer>
                <s.SmallModal>
                    <s.Alert>상대방이 나갔습니다.</s.Alert>
                    <s.MBtnCont>
                        <s.MBtn>상대 찾기</s.MBtn>
                        <s.MBtn onClick={()=>{
                            history.push("/")
                        }}>나가기</s.MBtn>
                    </s.MBtnCont>
                </s.SmallModal>
            </s.ModalContainer> */}

            {/* 상대방 신고 모달 */}
{/*             <s.ModalContainer>
                <s.Report>
                    <s.Alert>신고하기</s.Alert>
                    <s.Hr/>
                    <s.ReportInput
                        placeholder="신고 제목을 입력해주세요."
                    ></s.ReportInput>
                    <s.ReportInput
                        placeholder="신고 제목을 입력해주세요."
                    ></s.ReportInput>
                    <s.MBtnCont style={{width:"60%",height:"13%"}}>
                        <s.MBtn>취소하기</s.MBtn>
                        <s.MBtn>신고하기</s.MBtn>
                    </s.MBtnCont>
                </s.Report>
            </s.ModalContainer> */}

        <s.SvgContainer>
            <일러스트/>
            <일러스트2/>
        </s.SvgContainer>
        <s.MainContainer>
            <s.ChatingContainer ref={ChatingDiv}>
                <b>상대방을 찾고 있습니다...</b>
{/*                 <s.MyChat>
                    <p>김지민 18 남</p>
                    <s.MyContainer>안녕하세요</s.MyContainer>
                </s.MyChat>
                <s.YouChat>
                    <p>김지민 18 남</p>
                    <s.YouContainer>안어린ㅇㄹ</s.YouContainer>
                </s.YouChat> */}
                {
                    Chating.map((e,index)=>{
                        return (
                            <>
                            {e.id === 1 && e.chating !== "" &&
                                <s.MyChat key={index}>
                                    <p>김지민 18 남</p>
                                    <s.MyContainer>{e.chating}</s.MyContainer>
                                </s.MyChat>
                            }
                            </>
                        )
                    })
                }
            </s.ChatingContainer>
            <s.InputContainer>
                <form onSubmit={Send}>
                    <s.Input
                        placeholder="보낼 내용을 입력하세요."
                        onChange={ChatingSave}
                        value={data}
                    />
                </form>
                <s.MenuBar>
                    <s.MenuBtn
                        onClick={()=>{
                            history.push("/")
                        }}
                    ># 채팅종료</s.MenuBtn>
                    <s.MenuBtn># 신고하기</s.MenuBtn>
                    <s.MenuBtn># 파일전송</s.MenuBtn>
                </s.MenuBar>
            </s.InputContainer>
        </s.MainContainer>
        </>
    )
}