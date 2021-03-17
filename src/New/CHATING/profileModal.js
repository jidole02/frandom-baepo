import { useState } from "react";

import * as s from "./styles";

import * as R from "../axios";

const ProfileModal = (data) => {
  const { gender, url } = data.data;

  const [goodState, setGoodState] = useState(false);

  console.log(data);

  const good = () => {
    R.WithTokenRequest(
      `v1/user/like/${data.name}`,
      { username: data.name },
      "좋아요"
    ).then((e) => {
      if(e == undefined){
        alert("이미 좋아요를 눌렀습니다.")
        return;
      }
      data.GReflaction(); 
      setGoodState(true);
/*       console.log(e) */
    });
  };

  return (
    <>
      <s.ModalContainer>
        <s.ProfileContainer>
          <s.ProfileImg src={url} alt="" />
          <s.ProfileIntro>
            {" "}
            {data.name} <b>{gender === "M" ? "남자" : "여자"}</b>
          </s.ProfileIntro>
          <s.GoodBtn
            onClick={good}
            style={
              goodState ? { backgroundColor: `#6C63FF`, color: "white" } : {}
            }
          >
            추천 ♥
          </s.GoodBtn>
          <s.Close onClick={data.onModal}>닫기</s.Close>
        </s.ProfileContainer>
      </s.ModalContainer>
    </>
  );
};

export default ProfileModal;
