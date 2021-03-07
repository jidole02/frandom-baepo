import * as s from './styles'

import { useState } from 'react'

import {Request} from '../../components/axios'

import * as R from '../axios'

export default function ReportModal(e) {
    const [reportData,setReportData] = useState({
        title:"",
        cause:""
    })
    const Report =(e)=>{
        const {name,value} = e.target;
        setReportData({
            ...reportData,
            [name] : value
        })
    }
    const ReportYou =()=>{

        R.WithTokenRequest("v1/user/report",
        {title : reportData.title,description : reportData.cause},
        "신고")
        .then((e)=>{
            console.log(e)
        })

        Request("POST", "v1/user/report",{"Content-type":"application/json", "Authorization":"Bearer " + window.localStorage.getItem("token")}, 
        {
            title : reportData.title,
            description : reportData.cause
        }).then(()=>{
            alert("정상적으로 신고되었습니다.")
            setReportData({
                title:"",
                cause:""
            })
            e.event()
        }).catch(()=>{
            alert("신고 에러가 났습니다")
            setReportData({
                title:"",
                cause:""
            })
        })
    }

    return(
        <>
           <s.ModalContainer>
                <s.Report>
                    <s.Alert>신고하기</s.Alert>
                    <s.Hr/>
                    <s.ReportInput
                        placeholder="신고 제목을 입력해주세요."
                        name="title"
                        onChange={Report}
                        value={reportData.title}
                    ></s.ReportInput>
                    <s.ReportInput
                        placeholder="신고 내용을 입력해주세요."
                        name="cause"
                        onChange={Report}
                        value={reportData.cause}
                    ></s.ReportInput>
                    <s.MBtnCont style={{width:"60%",height:"13%"}}>
                        <s.MBtn onClick={e.event}>취소하기</s.MBtn>
                        <s.MBtn onClick={ReportYou}>신고하기</s.MBtn>
                    </s.MBtnCont>
                </s.Report>
            </s.ModalContainer> 
        </>
    )    
}