import styled from "styled-components";
import { mainColor } from "../../style/index";

export const SvgContainer = styled.div`
  width: 90%;
  height: 110%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 5%;
  position: absolute;
  background-color: white;
  svg {
    width: 14%;
  }
  z-index: 300;
  @media screen and (max-width: 768px) {
    svg {
      display: none;
    }
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 400;
`;

export const InputContainer = styled.div`
  width: 50%;
  height: 20%;
  bottom: 3%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width: 100%;
    height: 30%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
  border: 1px solid #9a9393;
  color: #9b9b9b;
  border-radius: 10px;
  padding: 0 3%;
  font-size: 1.7vmin;
`;

export const MenuBar = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 0%;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin-top: -5%;
  }
`;

export const MenuBtn = styled.button`
  width: 28%;
  height: 45px;
  border-radius: 24px;
  border: none;
  background-color: ${mainColor};
  color: white;
  font-size: 1.8vmin;
  font-weight: bold;
  font-family: 나눔스퀘어;
  :nth-of-type(2n) {
    background-color: #f3f3f3;
    color: gray;
  }
  :hover {
    box-shadow: 3px 3px 10px #cfccff;
  }
  @media screen and (max-width: 768px) {
    width: 30%;
    font-size: 12px;
  }
`;

export const ChatingContainer = styled.div`
  width: 53%;
  height: 72%;
  overflow-y: scroll;
  position: relative;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ::-webkit-scrollbar {
    width: 5px;
    background-color: #fbfbfb;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${mainColor};
  }
  b {
    color: gray;
    font-size: 1.3vmin;
    margin-top: 5%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Img = styled.img`
  width: 30%;
  margin-top: 6%;
  margin-left: 35%;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 60%;
    margin-left: 25%;
  }
`;

export const MyChat = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 3%;
  color: white;
  p {
    padding-bottom: 16px;
    font-size: 1.5vmin;
    color: gray;
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 80%;
  object-fit: cover;
  box-shadow: 0px 0px 10px whitesmoke;
  cursor:pointer;
`;

export const MyContainer = styled.div`
  width: 55%;
  padding: 30px 30px;
  background-color: ${mainColor};
  color: white;
  font-size: 2vmin;
  font-family: 나눔스퀘어;
  font-weight: bold;
  border-radius: 10px;
`;

export const YouChat = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  p {
    padding-bottom: 16px;
    font-size: 1.5vmin;
    color: gray;
    display: flex;
    align-items: center;
    a {
      padding: 0 10px;
      font-size: 13px;
    }
  }
`;

export const YouContainer = styled.div`
  width: 55%;
  padding: 30px 30px;
  background-color: #fbfbfb;
  color: gray;
  border: 1px solid #c4c4c4;
  font-size: 2vmin;
  font-family: 나눔스퀘어;
  font-weight: bold;
  border-radius: 10px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(10, 10, 10, 0.5);
  position: absolute;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SmallModal = styled.div`
  width: 25%;
  height: 30%;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-top: -5%;
  }
`;

export const Alert = styled.p`
  font-size: 2.8vmin;
  color: ${mainColor};
  font-weight: 800;
  @media screen and (max-width: 768px) {
    font-size: 17px;
    font-weight: bold;
    font-family: 나눔스퀘어;
  }
`;

export const MBtnCont = styled.div`
  width: 65%;
  height: 16%;
  margin-top: 6%;
  display: flex;
  justify-content: space-between;
`;

export const MBtn = styled.button`
  width: 45%;
  height: 100%;
  background-color: white;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 5px;
  color: rgb(150, 150, 150);
  font-weight: bold;
  font-size: 1.7vmin;
  font-family: 나눔스퀘어;
  :last-of-type {
    background-color: ${mainColor};
    color: white;
    border: none;
  }
`;

export const Report = styled.div`
  width: 30%;
  height: 40%;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const Hr = styled.hr`
  border-top: 1px solid #d2d2d2;
  width: 70%;
  margin-top: 5%;
`;

export const ReportInput = styled.input`
  width: 74%;
  height: 14%;
  padding: 0 3%;
  border-radius: 5px;
  margin-top: 3%;
  border: 1px solid ${mainColor};
  color: ${mainColor};
  font-size: 1.4vmin;
  ::placeholder {
    color: ${mainColor};
  }
`;