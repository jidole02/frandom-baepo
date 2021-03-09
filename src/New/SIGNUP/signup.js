import * as s from "./styles";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { useState } from "react";

import Loading from "../../components/PUBLIC/loading";

export default function SignupPage() {
  const [val, SetVal] = useState({
    password: "",
    email: "",
    name: "",
    age: "",
    male: "M",
    accessCode: "",
  });
  const history = useHistory();

  const [toggle, setToggle] = useState(false);

  const [checkEmail, setCheckEmail] = useState(false);

  const [sendCheck, setSendCheck] = useState(false);

  const [btn, setBtn] = useState(false);

  const { password, email, name, age, accessCode } = val;

  let i = 0;

  const InputFunc = (e) => {
    const { value, name } = e.target;
    SetVal({
      ...val,
      [name]: value,
    });
  };
  const SignUpFunc = () => {
    if (!checkEmail) {
      alert("인증번호를 입력하세요");
      return;
    }
    setToggle(true);
    axios({
      method: "post",
      url: "https://sonchaegeon.shop/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: val.name,
        email: val.email,
        password: val.password,
        age: val.age,
        gender: val.male,
      },
    })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        alert("회원가입에 실패했습니다.");
        window.alert(err.response.data.error.message);
        setToggle(false);
      });
  };

  const LimNum = (e) => {
    const { value, maxLength } = e.target;
    if (value.length > maxLength) {
      e.target.value = value.slice(0, maxLength);
    }
    if (value < 0) {
      e.target.value = 0;
    }
  };

  const timer = () => {
    if (i > 0)
      setInterval(() => {
        i++;
        if (i == 300) {
          alert("인증번호 인증 시간이 지났습니다.");
          clearInterval();
        }
      }, 1000);
  };

  const SendEmail = () => {
    axios({
      method: "post",
      url: "https://sonchaegeon.shop/v1/auth/verify",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        email: email,
      },
    })
      .then(() => {
        timer();
        setBtn(true);
        alert("인증번호를 발송했습니다.");
        setSendCheck(true);
        setTimeout(() => {
          setBtn(false);
        }, 30000);
      })
      .catch(() => {
        alert("이메일이 잘못됬습니다");
      });
  };

  const CheckCode = () => {
    axios({
      method: "post",
      url: "https://sonchaegeon.shop/v1/auth/check",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        email: email,
        verify: accessCode.toString(),
      },
    })
      .then(() => {
        alert("인증번호가 확인되었습니다.");
        setCheckEmail(true);
      })
      .catch(() => {
        alert("인증번호가 틀렸습니다");
      });
  };

  return (
    <>
      {toggle && <Loading></Loading>}
      <s.SignupContainer>
        <s.Signup>SIGNUP</s.Signup>
        <s.AccessEmail>
          <s.Input
            placeholder="사용할 이메일을 입력하세요."
            name="email"
            onChange={InputFunc}
            value={email}
          />
          <s.SendBtn
            onClick={SendEmail}
            style={btn ? { display: "none" } : { display: "block" }}
          >
            인증번호 발송
          </s.SendBtn>
        </s.AccessEmail>
        <s.AccessEmail>
          {sendCheck ? (
            <>
              {" "}
              {checkEmail ? (
                <>
                  <s.Input onChange={InputFunc} readOnly />
                  <s.SendBtn>✔ 인증됨</s.SendBtn>
                </>
              ) : (
                <>
                  <s.Input
                    name="accessCode"
                    onChange={InputFunc}
                    placeholder="받은 인증번호를 입력하세요."
                  />
                  <s.SendBtn onClick={CheckCode}>확인하기</s.SendBtn>
                </>
              )}
            </>
          ) : (
            <s.Input
              style={{ backgroundColor: "rgb(220,220,220)", border: "none" }}
              placeholder="인증번호를 발송해주세요"
              readOnly
            />
          )}
        </s.AccessEmail>
        <s.Input
          placeholder="사용할 비밀번호를 입력하세요."
          name="password"
          onChange={InputFunc}
          value={password}
          type="password"
        />
        <s.Input
          placeholder="사용할 닉네임을 입력하세요."
          name="name"
          onChange={InputFunc}
          value={name}
        />
        <s.Input
          placeholder="나이를 입력하세요."
          type="number"
          maxLength="2"
          name="age"
          onChange={InputFunc}
          value={age}
          onInput={LimNum}
        />
        <s.Select onChange={InputFunc} name="male">
          <option value="M">남자</option>
          <option value="W">여자</option>
        </s.Select>
        <s.Btn onClick={SignUpFunc}>회원가입</s.Btn>
      </s.SignupContainer>
    </>
  );
}
