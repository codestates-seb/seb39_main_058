import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import styled from "styled-components";

const REDIRECT_URI='https://seb39-main-058-tawny.vercel.app/login'
const googleback=`https://sswitch.ga/oauth2/authorization/google?redirect_uri=${REDIRECT_URI}`
///////////카카오
const kakaoback=`https://sswitch.ga/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`








const OauthLogin = () => {
  const [searchQ,setSearchQ] = useSearchParams()
  const accessToken=searchQ.get('access_token')
const dispatch=useDispatch()
const navigate=useNavigate();
const location=useLocation();





const loginAccess=()=>{
  if(accessToken){
    fetch('https://sswitch.ga/users/profile',{
          headers: { 'Authorization': `Bearer ${accessToken}`,}
        })
        .then((res) => res.json())
        .then((data)=>{
                    // console.log('백엔드소셜정보받기',data)
                    let abc=data.data
                    abc.accessToken=accessToken;
                    if(data.data){
                      if(location.state?.path){
                        dispatch({type:'USERINFO',payload:{userInfo:abc}})
                        navigate(`${location.state.path}`)
                      }else{
                        dispatch({type:'USERINFO',payload:{userInfo:abc}})
                          navigate(`/`)
                         
                      
                          // window.location.reload()
                        }
                    }
                  })
                }
              }
              
           




useEffect(()=>{
  loginAccess()
},[accessToken])



  return (
    <>
    <LinkStyle href ={kakaoback} >
      <KakaoLoginButton >
        <Logo src='https://cdn-icons-png.flaticon.com/512/3991/3991999.png' alt='카카오로고'></Logo><div>카카오로 로그인하기</div>
      </KakaoLoginButton>
    </LinkStyle>


   <LinkStyle href={googleback}>

    <KakaoLoginButton >
        <Logo src='https://cdn-icons-png.flaticon.com/512/2702/2702602.png' alt='구글로고'></Logo><div>구글로 로그인하기</div>
      </KakaoLoginButton>
    </LinkStyle> 
    </>
  )
}

export default OauthLogin
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

const KakaoLoginButton =styled(LoginButton)`
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
const LinkStyle=styled.a`
text-decoration: none;
`