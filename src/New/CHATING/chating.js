import * as s from './styles'

import {ReactComponent as 일러스트} from '../ASSETS/일러스트1.svg'

import {ReactComponent as 일러스트2} from '../ASSETS/일러스트2.svg'

import { useHistory } from 'react-router'

import React,{useState,useRef,useEffect} from 'react'

import { io } from "socket.io-client";

import ReportModal from './reportModal'

const socket = io("wss://sonchaegeon.shop", {
    query: {
        token: "Bearer " + window.localStorage.getItem("token")
    }
});

const ChatingComponent = React.memo(()=> {
    const history = useHistory();

    const [data, setData] = useState("");

    const [Chating, setChating] = useState([]);

    const [RModalState,setRModalState] = useState(false);

    const [OutModal,setOutModal] = useState(false);

    const [msg,setMsg] = useState("");

    const [you,setYou] = useState("");

    const [match,setMatch] = useState(false)

    const [out,setOut] = useState(true);
 
    const ChatingDiv = useRef();

    const ChatingSave = (e) => {
        setData(e.target.value);
    }

    useEffect(()=>{
        if(window.localStorage.getItem("token").length < 1){
            alert("로그인 후 이용해주세요!")
            history.push("/")
        }
    },[])

    const Send = (e) => {
        e.preventDefault();
        setChating([
            ...Chating,
            { chating:data, id:1 }
        ])
        socket.emit("sendMessage", data) 
        setData("")
    }

    useEffect(()=>{
        ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
    },[Chating])

    const ReportModalOn=()=>{
        setRModalState(!RModalState)
    }
    useEffect(()=>{
            // 소켓 연결
            socket.on("connect", () => {
                console.log("connect");
            });

            socket.on("disconnect", () => {
                console.log("disconnect")
            });
            // 조인 룸
            socket.on("joinRoom", () => {
                socket.on("matched", () => {
                    setMatch(true)
                })
            })
            socket.on("matched", () => {
                setMatch(true)
            })
            socket.on("leaveRoom",()=>{
                setMatch(false)
                setOutModal(true)
                socket.emit("leaveRoom",()=>{
                    console.log("leaveRoom");
                })
            }) 
    },[])

    useEffect(() => {
        // 메세지 받기
        socket.on("receiveMessage", (e,name) => {
            setYou(name)
            setMsg(e)
        })
    }, [])

    useEffect(()=>{
        setChating([
            ...Chating,
            { chating:msg, id:2 }
        ])
    },[msg])

    const Search =()=>{
        // 방 찾기  
        socket.emit("search", () => {
            console.log("search");
        });
        setOutModal(false)
        setOut(false)
        setChating([])
    }

    return(
        <>
        { OutModal &&  
            <s.ModalContainer>
                <s.SmallModal>
                    <s.Alert>상대방이 나갔습니다.</s.Alert>
                    <s.MBtnCont>
                        <s.MBtn
                            onClick={Search}
                        >상대 찾기</s.MBtn>
                        <s.MBtn onClick={()=>{
                            window.location.href = "/"
                        }}>나가기</s.MBtn>
                    </s.MBtnCont>
                </s.SmallModal>
            </s.ModalContainer> 
        }
        { RModalState && <ReportModal event={ReportModalOn}></ReportModal> }

        <s.SvgContainer>
            <일러스트/>
            <일러스트2/>
        </s.SvgContainer>
        <s.MainContainer>
            <s.ChatingContainer ref={ChatingDiv}>
                <b>상대방을 찾고 있습니다...</b>
                {match && <b>상대방이 매치되었습니다.</b>}
                {
                    Chating.map((e,index)=>{
                        return (
                            <>
                            <div key={index}></div>
                            {e.id === 1 && e.chating !== "" &&
                                <s.MyChat>
                                    <s.MyContainer>{e.chating}</s.MyContainer>
                                </s.MyChat>
                            }
                            {e.id === 2 && e.chating !== "" &&
                                <s.YouChat>
                                    <p>{you}</p>
                                    <s.YouContainer>{e.chating}</s.YouContainer>
                                </s.YouChat>
                            }
                            </>
                        )
                    })
                }
            </s.ChatingContainer>
            <s.InputContainer>
                {
                    match === false ? 
                    <form onSubmit={Send}>
                        <s.Input
                            placeholder="매칭 후 입력 가능합니다."
                            onChange={ChatingSave}
                            value={data}
                            readOnly
                        />
                    </form>
                    :
                    <form onSubmit={Send}>
                        <s.Input
                            placeholder="보낼 내용을 입력하세요."
                            onChange={ChatingSave}
                            value={data}
                        />
                    </form>
                }
                <s.MenuBar>
                    <s.MenuBtn
                        onClick={()=>{
                            window.location.href = "/"
                        }}
                    ># 채팅종료</s.MenuBtn>
                    <s.MenuBtn onClick={ReportModalOn}># 신고하기</s.MenuBtn>
                    <s.MenuBtn># 파일전송</s.MenuBtn>
                    {
                        out &&                     
                        <s.MenuBtn
                            onClick={Search}
                        ># 상대찾기</s.MenuBtn>
                    }
                </s.MenuBar>
            </s.InputContainer>
        </s.MainContainer>
        </>
    )
})

export default ChatingComponent