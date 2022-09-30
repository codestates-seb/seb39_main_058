import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import GoodsDetail from './GoodsDetail';

const GoodsPage = () => {
const [userInfo,setUserInfo]=useState({
  userName:'',
  point:'',
});
const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken);
const role=useSelector(state=>state.LoginPageReducer.userinfo.role)


  const getUserInfo=async()=>{
    if(accesstoken){

      await fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/users/profile`, {
        headers: {
          "Authorization": `Bearer ${accesstoken}`,
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data => {
        
        // console.log('data',data)
        setUserInfo({userName: data.data.userName,point: data.data.point}) 
      }
      
      )
      
    }

  }


  useEffect(()=>{
    getUserInfo()
  },[])


  return (
<Container>
  <UserInfoContainer>
     <BoardHeader>
       <div>포인트교환</div>
       {role==="ROLE_ADMIN" ? <Link to='/goods/create'> <button>상품등록하기</button> </Link>:''}
     </BoardHeader>
      {accesstoken ? 
      <UserInfo >
        <div>{userInfo.userName}님</div> <div>보유포인트{userInfo.point}</div>
      </UserInfo> 
      :
        <div>서비스는 로그인 후 이용 하실 수 있습니다.</div>
      }
        
        
  </UserInfoContainer>

  

  <GoodsCart>
    쇼핑카트
    <GooodsCartHeader>
      <div className='goodsName'>상품명
        
      </div>

      <div className='goodsPrice'>가격
       

      </div>

      <div>수량</div>
      <div>합계</div>
      <div>삭제</div>
    </GooodsCartHeader>
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
white-space: nowrap;
`
const UserInfoContainer=styled.div`
width: 80%;

text-align : center;


@media (max-width: 550px) {
            
           width: 90%;
          

          
      }
`
const BoardHeader = styled.div`

  display: flex;  
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
 border-bottom: 3px solid;
  

    div {
        font-size: 7vmin;
        font-family: "Courier New", Courier, monospace;
        letter-spacing: 3px;
        font-family: 'Nanum Pen Script', cursive;
       
        @media (max-width: 550px) {
            
          font-size: 30px;

        }
    }
   `
const UserInfo=styled.div`
display: flex;
justify-content: space-between;

`

const GoodsCart=styled.div`
  width: 80%;


`
const GooodsCartHeader=styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  .goodsName{
    width: 50%;
  }
  .goodsPrice{
    width: 20%;
  }


  
`


const GoodsList=styled.div`
`