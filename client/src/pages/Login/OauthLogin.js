import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import styled from "styled-components";

const googleback='http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google'
const REDIRECT_URI='http://localhost:3000/login/'
///////////카카오
  const KAKAO_REST_API_KEY='57b175e9a7e058d7b81488512a16d03f'
  const kakaoLogin=`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoOauthUrl='https://kauth.kakao.com/oauth/token'
////////////////////

///////구글

const ClIENT_ID='719936769714-34a3ukvnh8suuphr41e8105ls08hmtei.apps.googleusercontent.com'
const ClIENT_PWD_KEY= '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'
const GoogleLogin=`https://accounts.google.com/o/oauth2/v2/auth?
client_id=${ClIENT_ID}
&redirect_uri=${REDIRECT_URI}
&response_type=code
&scope=email%20profile%20openid
&access_type=offline`
const googleOauthUrl ='https://oauth2.googleapis.com/token'




const OauthLogin = () => {
  const [searchQ,setSearchQ] = useSearchParams()
  const kakaoCode=searchQ.get('code')
const dispatch=useDispatch()





  //카카오
  function kakaoOauth(){
  if(kakaoCode){
       fetch(`${kakaoOauthUrl}?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${kakaoCode} `,{
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
       })
       .then((res) => res.json())
       .then((data)=>{
        console.log('데이타',data)
        if(data.access_token){
          fetch( "https://kapi.kakao.com/v2/user/me",{
            headers: { 'Authorization': `Bearer ${data.access_token}`,}
          })
          .then((res) => res.json())
          .then((data2)=>{
            console.log('토큰정보불러오기',data2)
            if(data2){
              dispatch({type:'USERINFO',payload:{userInfo:data2}})
            }
          })
        }
       })
        
      }

  console.log('카카오오우뜨',kakaoCode)
}



//////////구글
const getGoogleAccess=()=>{
  console.log('구글오우뜨',kakaoCode)
  if(kakaoCode){
    fetch(`${googleOauthUrl}?code=${kakaoCode}&client_id=${ClIENT_ID}&client_secret=${ClIENT_PWD_KEY}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'},
     
    })
    .then((res) => res.json())
    .then((data)=>{
      console.log('구글엑세스',data)
      if(data.access_token){
        fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${data.access_token}`,{
          headers: { 'Authorization': `Bearer ${data.access_token}`,}
        })
        .then((res) => res.json())
        .then((data2)=>{
          console.log('구글토큰정보불러오기',data2)

        })
      }

    })

  }
  
  }






useEffect(()=>{
  kakaoOauth();
  // getGoogleAccess()
},[kakaoCode])








  return (
    <>
    <LinkStyle href ={kakaoLogin} >
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