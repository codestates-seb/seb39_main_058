import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import GoodsDetail from './GoodsDetail';

const GoodsPage = () => {
const [userInfo,setUserInfo]=useState({
  userName:'',
  point:'',
});
const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken);
const dispatch=useDispatch();


  const getUserInfo=async()=>{
    if(accesstoken){

      await fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/users/profile`, {
        headers: {
          "Authorization": `Bearer ${accesstoken}`,
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data => {
        
        console.log('data',data)
        setUserInfo({userName: data.data.userName,point: data.data.point}) 
      }
      
      )
      
    }

  }

const logout=()=>{
  dispatch({type:'LOGOUT'})
}
  useEffect(()=>{
    getUserInfo()
  },[])


  return (
<Container>
  <UserInfoContainer>
    {accesstoken ? 
    <UserInfo >
      <div>{userInfo.userName}님</div> <div>보유포인트{userInfo.point}</div>
    </UserInfo> 
    :
      <div>서비스는 로그인 후 이용 하실 수 있습니다.</div>
     }
        
        {sessionStorage.getItem('role')==="ROLE_ADMIN" ? <Link to='/goods/create'> <button>상품등록하기</button> </Link>:''}
        <button onClick={logout}>로그아웃</button>
  </UserInfoContainer>

   {console.log('엑세스토큰굳즈',accesstoken)}

  <GoodsCart>

  </GoodsCart>  

  <GoodsList>
    <GoodsDetail/>
  </GoodsList>
</Container>


    )
}

export default GoodsPage
const Container=styled.div`
display: flex;
height: 90vh;
/* justify-content: center; */
width: 100vw;

align-items: center;
flex-direction: column;
`
const UserInfoContainer=styled.div`
width: 70%;
margin-top: 30px;

`
const UserInfo=styled.div`
display: flex;
justify-content: space-between;

`

const GoodsList=styled.div`
`
const GoodsCart=styled.div`
`