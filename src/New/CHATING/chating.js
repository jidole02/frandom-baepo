import * as s from "./styles";

import { ReactComponent as Ill } from "../ASSETS/illust.svg";

import { ReactComponent as Ill2 } from "../ASSETS/illust2.svg";

import { useHistory } from "react-router";

import React, { useState, useRef, useEffect } from "react";

import { io } from "socket.io-client";

import ReportModal from "./reportModal";

import * as R from "../axios";

import IMG from "../ASSETS/profile.PNG";

const socket = io("wss://sonchaegeon.shop", {
  query: {
    token: "Bearer " + window.localStorage.getItem("token"),
  },
});

const ChatingComponent = React.memo(() => {
  const history = useHistory();

  const [data, setData] = useState("");

  const [Chating, setChating] = useState([]);

  const [RModalState, setRModalState] = useState(false);

  const [OutModal, setOutModal] = useState(false);

  const [msg, setMsg] = useState("");

  const [you, setYou] = useState("");

  const [match, setMatch] = useState(false);

  const [file, setFile] = useState("");

  const [url, setUrl] = useState("");

  const [youData, setYouData] = useState({
    name: "",
    age: "",
    url: "",
    gender: "",
  });

  const ChatingDiv = useRef();

  const ChatingSave = (e) => {
    if (e.target.value === " ") {
      setData("");
    } else {
      setData(e.target.value);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") == undefined) {
      alert("로그인 후 이용해주세요!");
      history.push("/");
    }
    if (window.localStorage.getItem("token") != undefined) {
      if (window.localStorage.getItem("token").length < 10) {
        alert("로그인 후 이용해주세요!");
        history.push("/");
      }
    }
  }, []);

  const Send = (e) => {
    e.preventDefault();
    setChating([...Chating, { chating: data, id: 1 }]);
    socket.emit("sendMessage", data);
    setData("");
  };

  useEffect(() => {
    ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
  }, [Chating]);

  const ReportModalOn = () => {
    if (!match) {
      alert("상대방이 없습니다");
      return;
    }
    setRModalState(!RModalState);
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("search");
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
    socket.on("joinRoom", (e) => {
      console.log("조인")
      console.log(e)  
      if (e.profile_img == null) {
        setYouData({
          name: e.name,
          url: IMG,
          age: e.age,
          gender: e.gender,
        });
      } else {
        setYouData({
          name: e.name,
          url: e.profile_img,
          age: e.age,
          gender: e.gender,
        });
      }
      socket.on("matched", () => {
        setMatch(true);
      });
    });
    socket.on("matched", () => {
      setMatch(true);
    });
    socket.on("leaveRoom", () => {
      setMatch(false);
      setOutModal(true);
      setRModalState(false);
      socket.emit("leaveRoom", () => {
        console.log("leaveRoom");
      });
    });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (e, name) => {
      console.log(e);
      setYou(name);
      setMsg(e);
    });
    socket.on("fileUpload", (res) => {
      setUrl(res.url);
    });
  }, []);

  useEffect(() => {
    if (url == null || url == "") return;
    setChating([
      ...Chating,
      {
        chating: url,
        id: 3,
      },
    ]);
    if (window.localStorage.getItem("token") != undefined) {
      setTimeout(() => {
        ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
      }, 100);
    }
  }, [url]);

  useEffect(() => {
    setChating([...Chating, { chating: msg, id: 2 }]);
  }, [msg]);

  const Search = () => {
    socket.emit("search", () => {
      console.log("search");
    });
    setOutModal(false);
    setChating([]);
  };

  const [num, setNum] = useState();

  useEffect(() => {
    for (let i = 0; i < Chating.length; i++) {
      if (Chating[i].id === 2) {
        setNum(i);
      }
    }
  }, [Chating]);

  useEffect(() => {
    if (file == null || file == "") return;
    setChating([
      ...Chating,
      {
        chating: file,
        id: 3,
      },
    ]);
  }, [file]);

  const upload = (e) => {
    if (!match) {
      alert("상대방이 없습니다");
      return;
    }
    const fd = new FormData();
    setFile(URL.createObjectURL(e.target.files[0]));
    fd.append("file", e.target.files[0]);
    R.FileRequest("v1/file", fd, "사진 업로드").then((e) => {
      socket.emit("fileUpload", { url: e.url }, "사진 업로드");
    });
    setTimeout(() => {
      ChatingDiv.current.scrollTop = ChatingDiv.current.scrollHeight;
    }, 100);
    setTimeout(() => {
      setFile("");
    }, 1000);
  };

  useEffect(()=>{
      R.WithTokenGetRequest(`v1/user/like/${localStorage.getItem("username")}` , {} , "좋아요 갯수")
  },[])

  return (
    <>
      {OutModal && (
        <s.ModalContainer>
          <s.SmallModal>
            <s.Alert>상대방이 나갔습니다.</s.Alert>
            <s.MBtnCont>
              <s.MBtn onClick={Search}>상대 찾기</s.MBtn>
              <s.MBtn
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                나가기
              </s.MBtn>
            </s.MBtnCont>
          </s.SmallModal>
        </s.ModalContainer>
      )}
      {RModalState && <ReportModal event={ReportModalOn}></ReportModal>}

      <s.SvgContainer>
        <Ill />
        <Ill2 />
      </s.SvgContainer>
      <s.MainContainer>
        <s.ChatingContainer ref={ChatingDiv}>
          <b>상대방을 찾고 있습니다...</b>
          {match && <b>상대방이 매치되었습니다.</b>}
          {Chating.map((e, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                {e.id === 1 && e.chating !== "" && (
                  <s.MyChat>
                    <s.MyContainer>{e.chating}</s.MyContainer>
                  </s.MyChat>
                )}
                {e.id === 2 && e.chating !== "" && (
                  <s.YouChat id="chat">
                    {index === num && (
                      <p>
                        <s.Profile src={youData.url} alt="" /> <a>{you}</a>
                      </p>
                    )}
                    <s.YouContainer>{e.chating}</s.YouContainer>
                  </s.YouChat>
                )}
                {e.id === 3 && e.chating !== "" && (
                  <s.Img
                    src={e.chating}
                    alt=""
                    onClick={() => {
                      window.open(e.chating);
                    }}
                  />
                )}
              </div>
            );
          })}
        </s.ChatingContainer>
        <s.InputContainer>
          {match === false ? (
            <form onSubmit={Send}>
              <s.Input
                placeholder="매칭 후 입력 가능합니다."
                onChange={ChatingSave}
                value={data}
                readOnly
              />
            </form>
          ) : (
            <form onSubmit={Send}>
              <s.Input
                placeholder="보낼 내용을 입력하세요."
                onChange={ChatingSave}
                value={data}
              />
            </form>
          )}
          <form
            onChange={upload}
            action="upload"
            id="uploadForm"
            method="post"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
            />
          </form>
          <s.MenuBar>
            <s.MenuBtn
              onClick={() => {
                window.location.href = "/";
              }}
            >
              # 채팅종료
            </s.MenuBtn>
            <s.MenuBtn onClick={ReportModalOn}># 신고하기</s.MenuBtn>
            <s.MenuBtn
              onClick={() => {
                document.all.file.click();
              }}
            >
              # 파일전송
            </s.MenuBtn>
          </s.MenuBar>
        </s.InputContainer>
      </s.MainContainer>
    </>
  );
});

export default ChatingComponent;
