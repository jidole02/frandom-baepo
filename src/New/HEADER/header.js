import * as s from "./styles";

import { mainColor } from "../../style/index";

import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";

import IMG from "../ASSETS/profile.PNG";

export default function Header() {
  const LinkStyle = { borderBottom: `4px solid ${mainColor}` };

  const history = useHistory();

  const [login, setLogin] = useState(false);

  const [menu, setMenu] = useState(false);

  const [media, setMedia] = useState(false);

  const [url, setUrl] = useState(IMG);

  useEffect(() => {
    if (window.localStorage.getItem("token") != undefined) {
      if (
        window.localStorage.getItem("token").length !== 0 &&
        window.localStorage.getItem("token") != ""
      ) {
        setLogin(true);
      }
    } else {
      setLogin(false);
    }
  }, [window.localStorage.getItem("token")]);

  useEffect(() => {
    if (window.localStorage.getItem("img") != undefined) {
      if (window.localStorage.getItem("img").length > 10) {
        setUrl(window.localStorage.getItem("img"));
      }
    }
  }, [window.localStorage.getItem("img")]);

  const Logout = () => {
    setMenu(!menu);
    setLogin(false);
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("Rtoken", "");
    window.localStorage.setItem("img", "");
    window.location.reload();
  };

  useEffect(() => {
    setInterval(() => {
      if (window.innerWidth < 768) {
        setMedia(true);
      } else {
        setMedia(false);
      }
    }, 500);
  }, []);

  const closeHeader = () => {
    setMenu(!menu);
  };
  return (
    <>
      <s.HeaderContainer>
        <s.HeaderTitle
          onClick={() => {
            history.push("/");
          }}
        >
          <b>F</b>RANDOM
        </s.HeaderTitle>
        <s.MediaHeader>
          <p
            onClick={() => {
              history.push("/");
            }}
          >
            <i className="fas fa-blog"></i>
            <i>F</i>RANDOM
          </p>
          <i
            className="fas fa-bars"
            onClick={() => {
              setMenu(!menu);
            }}
          ></i>
        </s.MediaHeader>
        <s.MenuBar
          style={media && menu ? { display: "none" } : { display: "flex" }}
        >
          {login === true && (
            <>
              <s.Menu to="" onClick={Logout}>
                로그아웃
              </s.Menu>
              <s.Menu to="/chating">시작하기</s.Menu>
              <s.Profile
                src={url}
                onClick={() => {
                  history.push("/mypage");
                }}
              />
            </>
          )}
          {login === false && (
            <>
              <s.Menu to="/login" activeStyle={LinkStyle} onClick={closeHeader}>
                로그인
              </s.Menu>
              <s.Menu
                to="/signup"
                activeStyle={LinkStyle}
                onClick={closeHeader}
              >
                회원가입
              </s.Menu>
              <s.Menu to="/chating" onClick={closeHeader}>
                시작하기
              </s.Menu>
            </>
          )}
        </s.MenuBar>
      </s.HeaderContainer>
    </>
  );
}
