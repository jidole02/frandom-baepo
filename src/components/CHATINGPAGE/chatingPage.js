import React, { useState, useEffect,useRef } from 'react';
import * as c from '../STYLECOMPONENT/chatingStyle'
import { io } from "socket.io-client";
import {Request} from '../axios'

const socket = io("wss://sonchaegeon.shop", {
    query: {
        token: "Bearer " + window.localStorage.getItem("token")
    }
});
const ChatingPage = React.memo((Lang) => {
    const a = Lang.Lang;
    const ChatingDiv = useRef();
    // 밤 낮 모드
    const [mode, setMode] = useState();
    const DarkMode = () => {
        setMode('dark')
    }
    const LightMode = () => {
        setMode('light')
    }
    // 채팅 내용
    const [Chating, setChating] = useState([])
    // 내가 쓰는 거 임시 저장용
    const [data, setData] = useState("");
    // 상대방 이름
    const [name, setName] = useState("")
    // 상대방 메세지 받아오는 거
    const [msg, setMsg] = useState("");
    // 찾았나 못찾았나 모달 띄울 용도
    const [find, setFined] = useState(false);
    // 떠났나 안떠났나
    // 떠나면 인풋 값도 초기화 해줘야됨,,,
    const [leave,setLeave] = useState(false);
    // 매치 됬나 안됬나
    const [match,setMatch] = useState(false);
    // 떠나면 알람 띄우는 용도
    const [leaveAlr,setLeaveAlr] = useState(false)
    // 신고 사유
    const [reportData,setReportData] = useState({
        title:"",
        cause:""
    })
    // 모달 띄우는 용도
    const [modalOn,setModalOn] = useState(false);
    // 신고 입력 인풋 관리용
    const Report =(e)=>{
        const {name,value} = e.target;
        setReportData({
            ...reportData,
            [name] : value
        })
    }

    useEffect(() => {
            // 소켓 연결
            socket.on("connect", () => {
                console.log("connect");
                socket.emit("search");
            });

            socket.on("disconnect", () => {
                console.log("disconnect");
            });
            // 방 찾기  
            socket.emit("search", () => {
                console.log("search");
            });

            // 조인 룸
            socket.on("joinRoom", (nickname) => {
                setName(nickname)
                socket.on("matched", () => {
                    setLeaveAlr(false)
                    setMatch(true)
                    setFined(true);
                    setTimeout(()=>{
                        setFined(false);
                    },1500)
                })
            })
            socket.on("matched", () => {
                setLeaveAlr(false)
                setMatch(true)
                setFined(true)
                setTimeout(()=>{
                    setFined(false);
                },1500)
            })
            socket.on("leaveRoom",()=>{
                setLeaveAlr(true)
                setFined(false)
                setMatch(false)
                setLeave(true)
            }) 
    }, [])

    useEffect(() => {
        // 메세지 받기
        socket.on("receiveMessage", (e,err) => {
            setMsg(e);
        })
    }, [])
    // 상대방 메세지 받아오기 
    // 이렇게 안하면 루프 존나 걸림
    useEffect(() => {
        setChating([
            ...Chating,
            { you: msg }
        ])
    }, [msg])
    // 채팅 스크롤 아래로 유지하게
    useEffect(()=>{
        ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
    },[Chating])
    // 신고 버튼
    const report =()=>{
        Request("POST", "v1/user/report",{"Content-type":"application/json", "Authorization":"Bearer " + window.localStorage.getItem("token")}, 
        {
            title : reportData.title,
            description : reportData.cause
        }).then(()=>{
            setModalOn(false)
            alert("정상적으로 신고되었습니다.")
        }).catch(()=>{
            setModalOn(false)
            alert("신고 에러가 났습니다")
        })
    }
    // 여기서 내가 보내는 메세지 받고 엔터 치면 넘기는 방식
    const Sub = (e) => {
        setData(e.target.value);
    }
    // 내가 보내는 거
    const SendInput = (e) => {
        e.preventDefault();
        setChating([
            ...Chating,
            { me: data }
        ])
        socket.emit("sendMessage", data)
        // 다시 내 메세지 받아야 되니까 초기화
        setData("")
    }

    return (
        <>
        {modalOn && 
                <c.ModalWrapper>
                <p>신고하기</p>
                <c.ReportInput
                    placeholder="신고 제목을 입력하세요."
                    onChange={Report}
                    name="title"
                    value={reportData.title}
                />
                <c.ReportText
                    placeholder="신고 사유를 입력하세요."
                    onChange={Report}
                    name="cause"
                    value={reportData.cause}
                />
                <c.ReportBtnCont>
                        <button
                            onClick={()=>setModalOn(false)}
                        >취소</button>
                        <button
                            onClick={report}
                        >신고</button>
                </c.ReportBtnCont>
            </c.ModalWrapper>
        }

        <c.Modal
                style={find?{display:"flex"}
                :leave?{display:"flex"}
                :{display:"none"}}        
        >
            <c.ModalCont>
                {find && "상대방이 매치되었습니다!"}
                {leave && <><p> 상대방이 나갔습니다.</p>
                <div style={{display:"flex"}}>
                    <button
                        onClick={()=>{
                            setChating([])
                            // 셋 리브 해야 모달 사라짐
                            setLeave(false);
                            // 다시 검색 기기
                            socket.emit("search", () => {
                                console.log("search");
                            });
                        }}
                    >상대 찾기

                    </button> 
                    <button
                        onClick={() => { window.location.href = "/match" }}
                    >나가기</button>
                </div>
                </>}
            </c.ModalCont>
        </c.Modal>
        <c.ChatingBox style={{ backgroundColor: (mode === 'dark') ? 'rgb(70,70,70)' : '' }}>
            <c.SideBar style={{ backgroundColor: (mode === 'dark') ? 'rgb(50,50,50)' : '' }}>
                <c.SettingChat>
                    <c.SettingMenu>
                        <i className="fas fa-cloud-moon"></i> {(a === 0) ? "COLOR THEME" : "색상 테마"}
                    </c.SettingMenu>
                    <c.SettingChoose style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }} onClick={DarkMode}><i className="fas fa-moon"></i>{(a === 0) ? "DARK MODE" : "어두운 테마"}</c.SettingChoose>
                    <c.SettingChoose style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }} onClick={LightMode}><i className="fas fa-sun"></i>{(a === 0) ? "LIGHT MODE" : "밝은 테마"}</c.SettingChoose>
                    <c.SettingMenu>
                        <i className="fas fa-cog"></i>{(a === 0) ? "SETTING" : "설정"}
                    </c.SettingMenu>
                    <c.SettingChoose onClick={()=>setModalOn(true)} style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }}><i className="fas fa-exclamation"></i>{(a === 0) ? "REPORT" : "신고하기"}</c.SettingChoose>
                    <c.SettingChoose
                        onClick={() => { window.location.href = "/match" }}
                        style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }}><i className="fas fa-sign-out-alt"></i>{(a === 0) ? "EXIT" : "나가기"}
                    </c.SettingChoose>
{/*                     <c.SettingChoose
                        onClick={() => {
                            window.localStorage.setItem("token", " ")
                            window.location.href = "/";
                        }}
                        style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }}>{(a === 0) ? "LOGOUT" : "로그아웃"}</c.SettingChoose> */}
                </c.SettingChat>
            </c.SideBar>
            <c.ChatingContainer ref={ChatingDiv}>
                <c.Chating>
                    <c.Alram>
                        <p>랜덤채팅 상대를 찾고 있습니다....</p>
                        <p>{match && "상대방을 찾았습니다."}</p>
                        <p>{leaveAlr && "상대방이 나갔습니다."}</p> 
                        <p>{(match) && name !== "" && name + " 님이 들어왔습니다."}</p>
                    </c.Alram>
                    {Chating.map((res, index) => {
                        return (
                            <div key={index}>
                                {res.me !== "" && res.me !== undefined && <c.MyChating>{res.me}</c.MyChating>}
                                {res.you !== "" && res.you !== undefined && <c.YouChating>{res.you}</c.YouChating>}
                            </div>
                        )
                    })}
                </c.Chating>
            </c.ChatingContainer>
            <c.UnderBar style={{ backgroundColor: (mode === 'dark') ? 'rgb(50,50,50)' : '' }}>
                <c.InputChatBox onSubmit={SendInput}>
                    

                    {
                        (match) ? (
                            <c.InputChat 
                                value={data} 
                                onChange={Sub} 
                                style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '', color: (mode === 'dark') ? 'whitesmoke' : '', border: (mode === 'dark') ? 'none' : '' }} 
                                placeholder="보낼 내용을 입력하세요!"
                            />
                        )
                        :
                        (
                            <c.InputChat 
                                value={data} 
                                style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '', color: (mode === 'dark') ? 'whitesmoke' : '', border: (mode === 'dark') ? 'none' : '' }} 
                                placeholder="매칭되면 입력 가능합니다."
                                readOnly
                            />
                        )
                    }
                    {/*                     <c.SendChatBtn onClick={Send} style={{ border: (mode === 'dark') ? 'none' : '' }}><i className="fas fa-paper-plane"></i></c.SendChatBtn> */}
                </c.InputChatBox>
            </c.UnderBar>
        </c.ChatingBox>
        </>
    )
});

export default ChatingPage;