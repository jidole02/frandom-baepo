import axios from 'axios'

const DOMAIN = "https://sonchaegeon.shop/"

export const AccessTokenRequest =()=>{
    axios({
        method:"get",
        url:"https://sonchaegeon.shop/v1/auth/refresh",
        headers:{
          "Content-type":"application/json", 
          "x-refresh-token":`Bearer ${window.localStorage.getItem("Rtoken")}`
        },
        data:{}
      }).then((e)=>{
          console.log(e)
          window.localStorage.setItem("token", e.data.accessToken)
    }).catch((e)=>{
        console.log(e)
        window.localStorage.setItem("token","")
    })
}

export const AuthRequest=(url,data,cons)=>{
    return axios({
        method: "post",
        url: DOMAIN + url,
        headers:{
            "Content-type" : "application/json"
        },
        data:data
    }).then((res)=>{
        console.log(cons + "성공")
        console.log(res.data);
        return res.data;
    }).catch((err)=>{
        console.log(err);
        console.log(cons + "실패");
    })
}

export const WithTokenRequest=(url,data,cons)=>{
    return axios({
        method:"post",
        url: DOMAIN + url,
        headers:{
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem("token")
        },
        data:data
    }).then((res)=>{
        console.log(cons + "성공")
        console.log(res.status)
        console.log(res.data);
        return res.data;
    }).catch((err)=>{
        if(err.response.status === 410){
            console.log("sdf")
            AccessTokenRequest();
        } 
        console.log(err);
        console.log(cons + "실패");
    })
}

export const WithTokenGetRequest=(url,data,cons)=>{
    return axios({
        method:"get",
        url: DOMAIN + url,
        headers:{
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem("token")
        },
        data:data
    }).then((res)=>{
        console.log(cons + "성공")
        console.log(res.data);
        return res.data;
    }).catch((err)=>{
        console.log(err)
        if(err.response.status === 410){
            AccessTokenRequest();
        } 
        console.log(cons + "실패");
    })
}