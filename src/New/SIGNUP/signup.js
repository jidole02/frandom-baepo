import * as s from './styles'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import Loading from '../../components/PUBLIC/loading';

export default function SignupPage() {
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
       axios({
            method:"post",
            url:"https://sonchaegeon.shop/v1/auth/register",
            headers:{
                "Content-Type": "application/json" 
            },
            data:{
                "username": val.name, "email": val.email, "password": val.password, "age" : val.age, "gender" : val.male
            }
        }).then(()=>{
            history.push('/login')
        }).catch((err)=>{
            window.alert(err.response.data.error.message)
            setToggle(false)
        }) 
    }

    const LimNum = (e)=>{
        const {value, maxLength} = e.target
        if(value.length > maxLength){
            e.target.value = value.slice(0,maxLength)
        }   
        if(value < 0){
            e.target.value = 0;
        }
    }

    return(
        <>
            {toggle && <Loading></Loading>}
            <s.SignupContainer>
                <s.Signup>SIGNUP</s.Signup>
                <s.Description>FRANDOM 회원가입을 환영합니다.</s.Description>
                <s.Input
                    placeholder="사용할 이메일을 입력하세요."
                    name="email"
                    onChange={InputFunc}
                    value={email}
                />
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
                <s.Select
                    onChange={InputFunc}
                    name="male"
                >
                    <option value="M">남자</option>
                    <option value="W">여자</option>
                </s.Select>
                <s.Btn
                    onClick={SignUpFunc}
                >SIGNUP</s.Btn>
            </s.SignupContainer>
        </>
    )
}