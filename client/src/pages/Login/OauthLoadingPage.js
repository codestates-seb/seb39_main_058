import React from 'react'
import styled from "styled-components";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'


const OauthLoadingPage = () => {
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
    <Container>
      <LoadingStyle>
        <div className="container">
            <span data-back="Sswitch">Sswitch</span>
        </div>
    </LoadingStyle>
    </Container>
  )
}

export default OauthLoadingPage

const Container=styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 100%;
height: 90vh;
`


const LoadingStyle = styled.div`
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  user-select: none;
  z-index: 10;
  position: absolute;

 * {
  box-sizing:border-box;
}
  div {
    width:300px;
    
    span {
      font-size:5em;
      color :#A7D2CB;
      font-weight: bold;
      position:relative;
      margin:0px;
      &:after {
        content:attr(data-back);
        width:0%;
        height:100%;
        background:rgb(71,182,181);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        position:absolute;
        left:0px;
        top:0px;
       animation: backMasking 4s infinite;
      }
    }
  }

@keyframes backMasking {
  0% {
    width:0%;
  }
  100% {
    width:100%;
  }
  
}

@-webkit-keyframes backMasking {
  0% {
    width:0%;
  }
  100% {
    width:100%;
  }
  
}


`