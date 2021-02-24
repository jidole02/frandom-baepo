import axios from 'axios';

export const Request=(method, url, head, data)=>{
    return axios({
        method: method,
        url: "https://sonchaegeon.shop/" + url,
        headers: head,
        data: data
    }).then((e)=>{
        console.log(e);
        return e.data
    }).catch((err)=>{
        console.log(err)
    })
} 

//window.localStorage.getItem("token")