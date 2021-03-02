import * as s from './styles'

import {ReactComponent as Ill} from '../ASSETS/일러스트1.svg'

import {ReactComponent as Ill2} from '../ASSETS/일러스트2.svg'

import { useHistory } from 'react-router'

import React,{useState,useRef,useEffect} from 'react'

import { io } from "socket.io-client";

import ReportModal from './reportModal'

import axios from 'axios'

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

    const [file,setFile] = useState("");

    const [url,setUrl] = useState("");
 
    const ChatingDiv = useRef();

    const ChatingSave = (e) => {
        if(e.target.value === " "){
            setData("")
        }
        else{
            setData(e.target.value);
        }
    }

    useEffect(()=>{
        if(window.localStorage.getItem("token").length < 10 ){    
            alert("로그인 후 이용해주세요!")
            history.push("/")
        }
    },[history])

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
        if(!match){
            alert("상대방이 없습니다")
            return;
        }
        setRModalState(!RModalState)
    }

    useEffect(()=>{
            // 소켓 연결
            socket.on("connect", () => {
                console.log("connect");
                socket.emit("search")
            });

            socket.on("disconnect", () => {
                console.log("disconnect")
            });
            // 조인 룸
            socket.on("joinRoom", () => {
                socket.on("matched", () => {
                    console.log("상대방 매치")
                    setMatch(true)
                })
            })
            socket.on("matched", () => {
                console.log("상대방 매치")
                setMatch(true)
            })
            socket.on("leaveRoom",()=>{
                console.log("상대방 떠남")
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

        socket.on("fileUpload",(res)=>{
            setUrl(res.url)
        })
    }, [])

    useEffect(()=>{
        setChating([
            ...Chating,
            {
                chating:url,
                id:3
            }
        ])
        if(window.localStorage.getItem("token") != undefined){
            setTimeout(()=>{
                ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
            },100)
        }
    },[url])

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
        setChating([])
    }

    useEffect(()=>{
        setChating([
            ...Chating,
            {
                chating:file,
                id:3
            }
        ])
    },[file])

    const upload =(e)=>{
        if(!match){
            alert("상대방이 없습니다")
            return;
        }
        const fd = new FormData();
        setFile(URL.createObjectURL(e.target.files[0]))
        console.log(URL.createObjectURL(e.target.files[0]))
        fd.append("file",e.target.files[0]);

        axios({
            method:"post",
            url:"https://sonchaegeon.shop/v1/file",
            headers:{
                "Content-type":"multipart/form-data", 
                "Authorization":"Bearer " + window.localStorage.getItem("token")
            },
            data:fd
        }).then((e)=>{
            socket.emit("fileUpload",{url:e.data.url})
        }).catch((e)=>{
            console.log(e)
        })

        setTimeout(()=>{
            ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
        },100)
        setTimeout(()=>{
            setFile("")
        },1000)
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
            <Ill/>
            <Ill2/>
        </s.SvgContainer>
        <s.MainContainer>
            <s.ChatingContainer ref={ChatingDiv}>
                <b>상대방을 찾고 있습니다...</b>
                {match && <b>상대방이 매치되었습니다.</b>}
                {
                    Chating.map((e,index) => {
                        return (
                            <div key={index} style={{width:"100%"}}>
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
                            {e.id === 3 && e.chating !=="" &&
                                <s.Img 
                                    src={e.chating} 
                                    alt=""
                                    onClick={()=>{
                                        window.open(e.chating)
                                    }}
                                />
                            }
                            </div>
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
                <form onChange={upload} action="upload" id="uploadForm" method="post" encType="multipart/form-data">
                        <input type="file" name="file" id="file" style={{display:"none"}}/>
                </form>
                <s.MenuBar>
                    <s.MenuBtn
                        onClick={()=>{
                            window.location.href = "/"
                        }}
                    ># 채팅종료</s.MenuBtn>
                    <s.MenuBtn onClick={ReportModalOn}># 신고하기</s.MenuBtn>
                    <s.MenuBtn
                        onClick={()=>{
                            document.all.file.click();
                        }}
                    ># 파일전송</s.MenuBtn>
{/*                     {
                        out &&                     
                        <s.MenuBtn
                            onClick={Search}
                            style={{backgroundColor:"tomato", color:"white"}}
                        ># 상대찾기</s.MenuBtn>
                    } */}
                </s.MenuBar>
            </s.InputContainer>
        </s.MainContainer>
        </>
    )
})

export default ChatingComponent