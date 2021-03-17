import axios from "axios";

const DOMAIN = "https://sonchaegeon.shop/";

export const AccessTokenRequest = () => {
  axios({
    method: "get",
    url: "https://sonchaegeon.shop/v1/auth/refresh",
    headers: {
      "Content-type": "application/json",
      "x-refresh-token": `${window.localStorage.getItem("Rtoken")}`,
    },
    data: {},
  })
    .then((e) => {
/*       console.log(e); */
      window.localStorage.setItem("token", e.data.accessToken);
    })
    .catch((e) => {
/*       console.log(e); */
      window.localStorage.setItem("token", "");
    });
};

export const AuthRequest = (url, data, _cons) => {
  return axios({
    method: "post",
    url: DOMAIN + url,
    headers: {
      "Content-type": "application/json",
    },
    data: data,
  })
    .then((res) => {
/*       console.log(cons + "성공");
      console.log(res.data); */
      return res.data;
    })
    .catch((err) => {
/*       console.log(err);
      console.log(cons + "실패"); */
    });
};

export const WithTokenRequest = (url, data, _cons) => {
  return axios({
    method: "post",
    url: DOMAIN + url,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
    data: data,
  })
    .then((res) => {
/*       console.log(cons + "성공");
      console.log(res.status);
      console.log(res.data); */
      return res.data;
    })
    .catch((err) => {
      if (err.response.status === 410) {
        AccessTokenRequest();
      }
/*       console.log(err);
      console.log(cons + "실패"); */
    });
};

export const WithTokenGetRequest = (url, data, _cons) => {
  console.log(url)
  return axios({
    method: "get",
    url: DOMAIN + url,
    headers: {
      "Content-type": "application/json",
      "Authorization" : "Bearer " + window.localStorage.getItem("token"),
    },
    data: data,
  })
    .then((res) => {
/*       console.log(cons + "성공");
      console.log(res.data); */
      if(res.data.username !== "undefined") localStorage.setItem("username",res.data.username);
      return res.data;
    })
    .catch((err) => {
/*       console.log(err.response.status); */
      if (err.response.status == 410) {
/*         console.log("토큰 만료"); */
        AccessTokenRequest();
      }
      if(err.response.status === 401){
        window.localStorage.setItem("token" , "");
      }
      if (window.localStorage.getItem("Rtoken") == undefined) {
        window.localStorage.setItem("token", "");
        return;
      }
      if (
        window.localStorage.getItem("Rtoken") == null ||
        window.localStorage.getItem("Rtoken") == "null"
      ) {
        window.localStorage.setItem("token", "");
        return;
      }
/*       console.log(cons + "실패"); */
    });
};

export const FileRequest = (url, data, _cons) => {
  return axios({
    method: "post",
    url: `https://sonchaegeon.shop/${url}`,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
    data: data,
  })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
/*       console.log(cons + "실패");
      console.log(e); */
      return e;
    });
};
