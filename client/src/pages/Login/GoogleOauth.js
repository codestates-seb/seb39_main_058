import React, { useEffect } from 'react'
import styled from "styled-components";
import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';

const ClIENT_ID='719936769714-34a3ukvnh8suuphr41e8105ls08hmtei.apps.googleusercontent.com'


const GoogleOauth = () => {
  
  useEffect(()=>{
    function start(){
      gapi.client.init({
        ClIENT_ID,
        scope:'email'
      })
    }
   gapi.load('client:auth2', start)
  },[])
  
  
  
  
  
  const responseGoogle = (response) => {
    console.log(response);
  }
  
  
  
  
  return (
    <GoogleLogin
    clientId={ClIENT_ID}
    render={renderProps => (
      <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <Logo src='https://cdn-icons-png.flaticon.com/512/2702/2702602.png' alt='구글로고'></Logo><div>구글로 로그인하기</div>
      </GoogleLoginButton>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  )
}

export default GoogleOauth

const LoginButton=styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 300px;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 10px;
  background-color: rgb(71,182,181);
`

const GoogleLoginButton =styled(LoginButton)`
background-color: white;
color: black;
box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
display: flex;
align-items: center;
 div{
  width: 100%;
 }

`

const Logo=styled.img`
    width: 30px;
    height: 30px;
    
`
