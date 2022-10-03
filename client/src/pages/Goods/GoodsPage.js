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
const [goodsList,setGoodsList]=useState([])
const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken);
const role=useSelector(state=>state.LoginPageReducer.userinfo.role)

//유저정보 불러오기
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
        setUserInfo({userName: data.data.userName,point: data.data.currentPoints}) 
      }
      
      )
      
    }
  
    //     await fetch('http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/goods?page=1&size=10')
    // .then(res => res.json())
    // .then((data)=>{
    // console.log('상품리스트',data)
    // setGoodsList(data.data)
    // })
    

  }


//상품정보 불러오기 
const getGoodsList=async()=>{
await fetch('http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/goods?page=1&size=10')
.then(res => res.json())
.then((data)=>{
 console.log('상품리스트',data)
 setGoodsList(data.data)

})

}






useEffect(()=>{
    getGoodsList();
    getUserInfo();
   
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
    장바구니
    <GooodsCartHeader>
      <div className='goodsName'>상품명
        
      </div>
      <div className='goodsPrice'>가격
       

      </div>
      <div className='goodsQuantity'>수량

      </div>
      <div className='goodsTotalPrice'>합계

      </div>
      <div className='goodsDelete'>삭제

      </div>
    </GooodsCartHeader>
  </GoodsCart>  
<GoodsList>
상품리스트

    {console.log('렌더상품리스트',goodsList)}
    {goodsList.map((item)=>{
      return <GoodsDetail key={item.goodsId} item={item}/>
    })}
</GoodsList>
  
</Container>


    )
}

export default GoodsPage
const Container=styled.div`
display: flex;
height: 100%;
/* justify-content: center; */
width: 100%;
align-items: center;
flex-direction: column;
white-space: nowrap;
`
const UserInfoContainer=styled.div`
width: 80%;

text-align : center;


@media (max-width: 550px) {
          margin-top: 50px;
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
  margin-top: 30px;
  margin-bottom: 20px;
  border: 1px solid;
  @media (max-width: 550px) {          
           width: 90%;
          

          
      }

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
    width: 15%;
  }
  .goodsQuantity{
    width: 10%;
  }
  .goodsTotalPrice{
    width: 15%;
  }
  .goodsDelete{
    width: 10%;
  }
  
`


const GoodsList=styled.div`
width: 80%;
/* padding-bottom: 30px; */
margin-bottom: 30px;
@media (max-width: 550px) {
            
            width: 90%;
           
 
           
       }
`