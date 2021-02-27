import React from 'react';
import * as s from './components/STYLECOMPONENT/publicStyle'
import {BrowserRouter,Route} from 'react-router-dom'
import GlobalStyled from './style/globalstyle'
import Header from './New/HEADER/header'
import MainPage from './New/MAIN/main';
import LoginPage from './New/LOGIN/login';
import SignupPage from './New/SIGNUP/signup';
import ChatingComponent from './New/CHATING/chating';

function App() {
  return (
    <BrowserRouter>
    <GlobalStyled></GlobalStyled>
    <s.Background>
      <Route path="/" component={Header}/>
      <Route exact path="/" component={MainPage}></Route>
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/signup" component={SignupPage}></Route>
      <Route exact path="/chating" component={ChatingComponent}></Route>
    </s.Background>
    </BrowserRouter>
  );
}

export default App;
