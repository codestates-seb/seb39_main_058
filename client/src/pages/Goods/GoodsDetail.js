import React from 'react'
import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import AnswerModal from '../../components/CommunityAnswer/AnswerModal';




const GoodsDetail = ({item}) => {
const [deleteGoods,setDeleteGoods]=useState('')
const [buyGoods,SetBuyGoods]=useState('')

const [modalOn, setModalOn] = useState(false);
const [modalOn2, setModalOn2] = useState(false);
const [modalOn3, setModalOn3] = useState(false);

const [alertMsg,setAlertMsg]=useState('');
const location = useLocation();
const navigate=useNavigate();

  const role=useSelector(state=>state.LoginPageReducer.userinfo.role)
  const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken)
 const usersName=useSelector(state=>state.LoginPageReducer.userinfo.userName)




  //상품삭제 함수


const goodsDelete=()=>{
  
  if (!accesstoken){
    alert('로그인 후 이용 가능 합니다')
    navigate('/login',{state: {path:location.pathname}})
  }else if(accesstoken){
 
  goodsDeleteFetch()

}
}

const goodsDeleteFetch=async()=>{
  if(deleteGoods!==''){

    await fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/goods/admin/${deleteGoods}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${accesstoken}`}

    })
    .then((res) => res.json())
    .then((data)=>{
            if(data.error==='Unauthorized'){
              alert('세션이 만료되었습니다.')
              navigate('/login',{state: {path:location.pathname}})
            }
            
            
    })
    .catch((err)=>{
      console.log(err)
    })
                  window.location.reload()
  }

}

//상품구매 함수
const goodsBuy=()=>{
  if (!accesstoken){
    alert('로그인 후 이용 가능 합니다')
    navigate('/login',{state: {path:location.pathname}})
  }else if(accesstoken){
 
    goodsBuyFetch()

  }
}

const goodsBuyFetch=async()=>{
  if(buyGoods!==''){
    const buyInfo={
      
        'userName' : usersName,
        'orderGoodsList':
        [
            {
                "goodsName":buyGoods,
                "quantity":1
            }
        ]
    
    }
    
    await fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/orders`, {
      method: "POST",
      headers: { 'content-Type' : 'application/json','Authorization': `Bearer ${accesstoken}`},
      body: JSON.stringify(buyInfo)

    })
    .then((res) => res.json())
    .then((data)=>{
   
      // console.log('상품구매 콘솔',data)
            if(data.data?.userName){
                window.location.reload()
            }
            if(data.error==='Unauthorized'){
              alert('세션이 만료되었습니다.')
              navigate('/login',{state: {path:location.pathname}})
            }else if(data.error==='Internal Server Error'){
              setAlertMsg('포인트가 부족합니다')
              setModalOn2(!modalOn2)
              setModalOn3(!modalOn3)
            }

            
            
    })
    .catch((err)=>{
      console.log(err)
    })
                 
  }
}



  return (
    <Container>
    {/* {console.log('디테일',userName)} */}
    <GoodsImg>

        <img src={item.goodsImage} alt={item.goodsName}/>
    </GoodsImg>
    <GoodsInfo>
      <div className='GoodsName'>
        <div>상품명:{item.goodsName}</div><div>가격:{item.price}</div> 
      </div>
      <div className='goodsDetail'>상품설명:{item.goodsText}</div>
      <div className='smallButton'>
        <div>상태:{item.goodsStatus}</div>
        {role==="ROLE_ADMIN" ?<button onClick={(e) => {
        setDeleteGoods(e.target.name)
        setModalOn(!modalOn)

        }}  name={item.goodsId}
        >삭제</button> :''}
         {accesstoken&&item.goodsStatus==='판매중' ?<button onClick={(e)=>{SetBuyGoods(e.target.name)
        setModalOn2(!modalOn2)}} name ={item.goodsName}>교환하기</button>:''} 
      </div>
    </GoodsInfo>
    <GoodsSelect>

      <div>상태:{item.goodsStatus}</div>
      {accesstoken&&item.goodsStatus==='판매중' ?<button onClick={(e)=>{SetBuyGoods(e.target.name)
         setModalOn2(!modalOn2) }}   name ={item.goodsName} >교환하기</button>:''} 
      {role==="ROLE_ADMIN" ?<button onClick={(e) => {
        setDeleteGoods(e.target.name)
        setModalOn(!modalOn)

        }}  name={item.goodsId}
        >삭제</button> :''}
    </GoodsSelect>

      {/* 삭제 모달창 */}

      {modalOn && (
        <AnswerModal closeModal={() => setModalOn(!modalOn)}>
          <ModalItem>
             
              
              <div>상품을 삭제하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={()=>{goodsDelete()}}>확인</div>
                <div className="cancel" onClick={() => setModalOn(!modalOn)}>취소</div>
              </div>

          </ModalItem>
        </AnswerModal>
        )}
        {/* 구매 모달창 */}
        {modalOn2 && (
        <AnswerModal closeModal={() => setModalOn2(!modalOn2)}>
          <ModalItem>
             
              <div>{buyGoods}</div>
              <div>상품을 구매하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={()=>{goodsBuy()}}>확인</div>
                <div className="cancel" onClick={() => setModalOn2(!modalOn2)}>취소</div>
              </div>

          </ModalItem>
        </AnswerModal>
        )}

  {/* 정보알림 모달창 */}
  {modalOn3 && (
        <AnswerModal closeModal={() => setModalOn3(!modalOn3)}>
          <ModalItem>
             
              <div>{alertMsg}</div>
              <div className="confirm-wrapper">
                
                <div className="cancel" onClick={() => setModalOn3(!modalOn3)}>확인</div>
              </div>

          </ModalItem>
        </AnswerModal>
        )}


    </Container>
    
  )
}

export default GoodsDetail
const Container=styled.div`
display: flex;
border: 1px solid;
width: 100%;
height: 100px;
margin-top: 10px;
/* margin-bottom: 10px; */
align-items: center;

white-space: nowrap;
`
const GoodsImg=styled.div`
width: 20%;

 img{
  /* width: 90px; */
  width: 100%;
  height: 90px;
 }
`
const GoodsInfo=styled.div`
display: flex;
flex-direction: column;
width: 65%;
  .GoodsName{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
  }
  .goodsDetail{
    overflow: auto;
  }
  .smallButton{
    display: flex;
    justify-content: space-between;

    @media (min-width: 550px) {
            
            display: none;
         }
  }
@media (max-width: 550px) {
  width :80% ;
  
           
 
           
       }

`
const GoodsSelect=styled.div`
display: flex;
width: 15%;
align-items: center;
flex-direction: column;
 
@media (max-width: 550px) {
            
            display: none;
           
 
           
       }
 

`
const ModalItem=styled.div`
font-family: Jua, serif;
font-size: x-large;
 


.confirm-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .confirm, .cancel {
      margin: 0.2rem;
      padding: 0.3rem;
      border: 3px solid black;
      border-radius: 5px;
      :hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }

  `