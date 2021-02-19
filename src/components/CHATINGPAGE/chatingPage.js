import React, { useState, useEffect } from 'react';
import * as c from '../STYLECOMPONENT/chatingStyle'
import { io } from "socket.io-client";
import {Request} from '../axios'

const socket = io("wss://sonchaegeon.shop", {
    query: {
        token: "Bearer " + window.localStorage.getItem("token")
    }
});
function ChatingPage(Lang) {
    const a = Lang.Lang;
    const [mode, setMode] = useState();
    const DarkMode = () => {
        setMode('dark')
    }
    const LightMode = () => {
        setMode('light')
    }
    const [Chating, setChating] = useState([])

    const [data, setData] = useState("");

    const [name, setName] = useState("")

    const [msg, setMsg] = useState("");

    const [find, setFined] = useState(false);

    const [inRoom,outRoom] = useState(false);

    const [leave,setLeave] = useState(false);

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
                outRoom(false);
                setFined(true);
                setTimeout(()=>{
                    setFined(false);
                },1000)
            })
        })
        socket.on("matched", () => {
            setFined(true)
            setTimeout(()=>{
                setFined(false);
            },1000)
        })
        socket.on("leaveRoom",()=>{
            console.log('상대방이 나감')
            setLeave(true)
            setTimeout(()=>{
                setLeave(false);
            },1000)
            socket.emit("search", () => {
                console.log("search");
            });
        }) 
    
    }, [])

    useEffect(() => {
        // 메세지 받기
        socket.on("receiveMessage", (e,err) => {
            setMsg(e);
        })
    }, [])

    useEffect(() => {
        setChating([
            ...Chating,
            { you: msg }
        ])
    }, [msg])

    const report =()=>{
        Request("POST", "v1/user/report",{"Content-type":"application/json", "Authorization":"Bearer " + window.localStorage.getItem("token")}, 
        {
            title : "신고합니데이",
            description : "함 보세요"
        }).then((e)=>{
            alert("정상적으로 신고되었습니다.")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const Sub = (e) => {
        setData(e.target.value);
    }

    const SendInput = (e) => {
        e.preventDefault();
        setChating([
            ...Chating,
            { me: data }
        ])
        socket.emit("sendMessage", data)
        setData("")
    }

    return (
        <>
        <c.Modal
                style={find?{display:"flex"}
                :inRoom?{display:"flex"}
                :leave?{display:"flex"}
                :{display:"none"}}        
        >
            <c.ModalCont>
                <p>! 알람 !</p>
                {find && "상대방이 매치되었습니다!"}
                {leave && <> 상대방이 나갔습니다.</>}
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
                    <c.SettingChoose onClick={report} style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }}><i className="fas fa-exclamation"></i>{(a === 0) ? "REPORT" : "신고하기"}</c.SettingChoose>
                    <c.SettingChoose
                        onClick={() => { window.location.href = "/match" }}
                        style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }}><i className="fas fa-sign-out-alt"></i>{(a === 0) ? "EXIT" : "나가기"}
                    </c.SettingChoose>
                    <c.SettingChoose
                        onClick={() => {
                            window.localStorage.setItem("token", " ")
                            window.location.href = "/";
                        }}
                        style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '' }}>{(a === 0) ? "LOGOUT" : "로그아웃"}</c.SettingChoose>
                </c.SettingChat>
            </c.SideBar>
            <c.ChatingContainer>
                <c.Chating>
                    <c.Alram>
                        <p>랜덤채팅 상대를 찾고 있습니다....</p>
                        <p>{name !== "" && name + " 님이 들어왔습니다."}</p>
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
                    <c.InputChat value={data} onChange={Sub} style={{ backgroundColor: (mode === 'dark') ? 'rgb(100,100,100)' : '', color: (mode === 'dark') ? 'whitesmoke' : '', border: (mode === 'dark') ? 'none' : '' }} placeholder="보낼 내용을 입력하세요!"></c.InputChat>
                    {/*                     <c.SendChatBtn onClick={Send} style={{ border: (mode === 'dark') ? 'none' : '' }}><i className="fas fa-paper-plane"></i></c.SendChatBtn> */}
                </c.InputChatBox>
            </c.UnderBar>
        </c.ChatingBox>
        </>
    )
}

export default ChatingPage;