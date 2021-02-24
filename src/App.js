import React, { useState } from 'react';
import FirstPage from './components/FIRSTPAGE/firstPage' 
import * as s from './components/STYLECOMPONENT/publicStyle'
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import NicknamePage from './components/PUBLIC/nicknamePage'
import 미국 from './components/IMG/america.png'
import 한국 from './components/IMG/korea.png'
import 언어 from './components/IMG/language.png'
import ChatingPage from './components/CHATINGPAGE/chatingPage'
import GlobalStyled from './style/globalstyle'
import SignUp from './components/SIGNUP/signup'
import Match from './components/MATCH/match'
import Header from './New/HEADER/header'
import MainPage from './New/MAIN/main';
import LoginPage from './New/LOGIN/login';

function App() {
  return (
    <BrowserRouter>
    <GlobalStyled></GlobalStyled>
    <s.Background>
      <Route path="/" component={Header}/>
      <Route exact path="/" component={MainPage}></Route>
      <Route exact path="/login" component={LoginPage}></Route>
    </s.Background>
{/*       <s.Background>
        <s.ItemContainer>
          <s.SignUp><i 
            onClick={()=>{window.open("https://github.com/DSM-Frandom",'_blank')}}
            className="fab fa-github"></i>
          </s.SignUp>
        </s.ItemContainer>
        <Switch>
        <Route exact path="/"><FirstPage Lang={LValue}></FirstPage></Route>
        <Route exact path="/nickname"><NicknamePage Lang={LValue}></NicknamePage></Route>
        <Route path="/chating"><ChatingPage Lang={LValue}></ChatingPage></Route>
        <Route path="/signup"><SignUp></SignUp></Route>
        <Route path="/match"><Match></Match></Route>
        </Switch>
        <s.LanguageSlide style={{marginRight:margin,display:"none"}}>
          <button>
            <img src={미국} alt="" onClick={amarican}/>
            <img src={한국} alt="" onClick={korean}/>
            <img src={언어} alt="" onClick={chooseLanguage}/>
          </button>
        </s.LanguageSlide> */}
{/*         <a>{(a==0)?"Made by dsm, in highschool" : "DSM에서 제작되었습니다."}</a> */}
{/*       </s.Background> */}
    </BrowserRouter>
  );
}

export default App;
