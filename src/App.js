import React from 'react';
import * as s from './components/STYLECOMPONENT/publicStyle'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import GlobalStyled from './style/globalstyle'
import Header from './New/HEADER/header'
import MainPage from './New/MAIN/main';
import LoginPage from './New/LOGIN/login';
import SignupPage from './New/SIGNUP/signup';
import ChatingComponent from './New/CHATING/chating';
import Mypage from './New/MYPAGE/mypage';
import { useEffect } from 'react';

function App() {
  return (
    <Router>
    <GlobalStyled></GlobalStyled>
    <s.Background>
      <Route path="/" component={Header}/>
      <Route exact path="/" component={MainPage}></Route>
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/signup" component={SignupPage}></Route>
      <Route exact path="/chating" component={ChatingComponent}></Route>
      <Route exact path="/mypage" component={Mypage}></Route>
    </s.Background>
    </Router>
  );
}

export default App;
