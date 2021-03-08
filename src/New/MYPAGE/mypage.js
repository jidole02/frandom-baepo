import { useEffect, useState } from 'react'

import * as s from './styles'

import IMG from '../ASSETS/profile.PNG'

import {useHistory} from 'react-router-dom'

import Loading from '../../components/PUBLIC/loading'

import * as R from '../axios'

export default function Mypage() {

    const history = useHistory();

    const [data,setData] = useState({
        name:"",
        email:"",
        gender:"",
        url:""
    })

    const [load,setLoad] = useState(true);

    const {name,email,gender,url} = data;

    useEffect(()=>{
        if(window.localStorage.getItem("token") == undefined){ 
            alert("로그인 후 이용해주세요!")
            history.push("/")
        }
        if(window.localStorage.getItem("token") == null){ 
            if(window.localStorage.getItem("token").length < 10){    
                alert("로그인 후 이용해주세요!")
                history.push("/")
            }
        }
        R.WithTokenGetRequest("v1/user/profile",{},"프로필")
        .then((e)=>{
            console.log(e);
            if(e.profile_img == null){
                setData({
                    name: e.username,
                    email: e.email,
                    gender: e.gender,
                    url: IMG
                })
            }
            else{
                setData({
                    name: e.username,
                    email: e.email,
                    gender: e.gender,
                    url: e.profile_img
                })
            }
            setLoad(false)
        }).catch(()=>{
            alert("정보를 가져오는데 실패했습니다.")
            history.push("/")
        })
    },[])

    const upload =(e)=>{
        setLoad(true)
        const fd = new FormData();
        fd.append("file",e.target.files[0]);
        R.FileRequest("v1/file/profile",fd,"프로필사진 업로드")
        .then((e)=>{
            setData({
                ...data,
                url:e.url
            })
            setLoad(false)
            window.localStorage.setItem("img",e.url)
        })
    }
    return(
        <>
        { load && <Loading/> }
            <s.Background>
                <form onChange={upload} action="upload" id="uploadForm" method="post" encType="multipart/form-data">
                        <input type="file" name="file" id="file" style={{display:"none"}}/>
                </form>
                <s.ProfileContainer>
                    <s.Plus
                        onClick={()=>{
                            document.all.file.click();
                        }}
                    >+</s.Plus>
                    <s.Profile src={url}/>
                </s.ProfileContainer>
                <s.Name>{name} <b>{gender}</b></s.Name>
                <s.Email>{email}</s.Email>
            </s.Background>
        </>
    )
}