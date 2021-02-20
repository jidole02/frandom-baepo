import * as s from "../STYLECOMPONENT/publicStyle"
import { useState } from "react"
import { Request } from '../axios'
import Loading from '../PUBLIC/loading'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
    const [val, SetVal] = useState({
        password: '',
        email: '',
        name: '',
        age: '',
        male:'M'
    });
    const history = useHistory();

    const [toggle, setToggle] = useState(false)

    const { password, email, name, age } = val;

    const InputFunc = (e) => {
        const { value, name } = e.target;
        SetVal({
            ...val,
            [name]: value
        })
    }
    const SignUpFunc = () => {
        setToggle(true)
        Request("POST", "v1/auth/register", { "Content-Type": "application/json" },
            { "username": val.name, "email": val.email, "password": val.password, "age" : val.age, "gender" : val.male}
        ).then(() => {
            history.push('/nickname')
        })
        .catch(() => {
            setToggle(false)
            window.alert("회원가입에 실패했습니다.")
        })
    }
    return (
        <>
            {toggle && <Loading></Loading>}
            <s.FirstPageContainer>
                <h1>FRANDOM!</h1>
                <s.NicknameInput name="name" placeholder="닉네임을 입력하세요." onChange={InputFunc} value={name}></s.NicknameInput>
                <s.NicknameInput name="email" placeholder="이메일을 입력하세요." onChange={InputFunc} value={email}></s.NicknameInput>
                <s.NicknameInput name="password" type="password" placeholder="비밀번호를 입력하세요.(숫자 포함)" onChange={InputFunc} value={password}></s.NicknameInput>
                <s.NicknameInput name="age" type="number" onChange={InputFunc} value={age} placeholder="나이를 입력하세요."></s.NicknameInput>
                <s.Select onChange={InputFunc} name="male">
                    <option value="M">남자</option>
                    <option value="W">여자</option>
                </s.Select>
                <s.ButtonContainer2>
                    <s.NickSubButton onClick={SignUpFunc}>제출하기</s.NickSubButton>
                </s.ButtonContainer2>
            </s.FirstPageContainer>
        </>
    )
}

export default SignUp;