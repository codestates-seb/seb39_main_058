import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import AnswerModal from '../../components/CommunityAnswer/AnswerModal';


const CouponBag = () => {
  const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken)
  const userId=useSelector(state=>state.LoginPageReducer.userinfo.userId)
  const location = useLocation();
const navigate=useNavigate();
  const [coupon,setCoupon]=useState([])
  const [modalOn, setModalOn] = useState(false);
  const [deleteCoupon,setDeleteCoupon]=useState('')


///쿠폰정보불러오기
  const getCouponData=async()=>{
    await fetch(`https://sswitch.ga/orders/orderGoods/list/${userId}`,{
      headers: { 'Authorization': `Bearer ${accesstoken}`}
    })
    .then(res => res.json())
    .then((data)=>{
    
    //  console.log('쿠폰리스트',data.data)
  
     setCoupon(data.data)
    

  })
}

  useEffect(()=>{
    getCouponData()
  },[])


  /////쿠폰삭제
const couponDelete=()=>{
// console.log('삭제되냐')
if (!accesstoken){
  alert('로그인 후 이용 가능 합니다')
  navigate('/login',{state: {path:location.pathname}})
}else if(accesstoken){

couponDeleteFetch()

}

}

const couponDeleteFetch=async()=>{
  if(deleteCoupon!==''){

    await fetch(`https://sswitch.ga/orders/orderGoods/${deleteCoupon}`, {
      method: "DELETE",
      headers: { 'content-Type' : 'application/json','Authorization': `Bearer ${accesstoken}`}

    })
    .then((res) => res.json())
    .then((data)=>{
      // console.log('삭제데이타',data)
            if(data.error==='Unauthorized'){
              alert('세션이 만료되었습니다.')
              navigate('/login',{state: {path:location.pathname}})
            }
            
            
    })
    .catch((err)=>{
      console.log(err)
    })
                  // window.location.reload()
  }







}

  return (
    <Container>
      
     {coupon?.map((el)=>{
      return <CouponContainer key={el.orderGoodsId}>
        <GoodsImg>
          <img src={el.goodsImage} alt={el.goodsName}/>
        </GoodsImg>
        <CouponHeadContainer>

          <CouponHead > 
            <div className='couponName'>{el.goodsName} </div><div className='couponDate'>{el.createdAt.slice(0, 10)}<button onClick={(e)=>{setDeleteCoupon(e.target.name)
            setModalOn(!modalOn)}} name={el.orderGoodsId}>삭제</button></div>
          </CouponHead>
          <CouponBody > 
            <div className='couponCode'>코드:  {el.giftCode}</div>
          </CouponBody>
        </CouponHeadContainer>
        
      
      </CouponContainer>
     })}
     
     {/* 삭제 모달창 */}
{/* {console.log('딜리트쿠폰 타입은',deleteCoupon)} */}
     {modalOn && (
        <AnswerModal closeModal={() => setModalOn(!modalOn)}>
          <ModalItem>
             
              
              <div>쿠폰을 삭제하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={()=>{couponDelete()}}>확인</div>
                <div className="cancel" onClick={() => setModalOn(!modalOn)}>취소</div>
              </div>

          </ModalItem>
        </AnswerModal>
        )}
    </Container>
  )
}

export default CouponBag

const Container=styled.div`
display: flex;
border: 1px solid;
width: 100%;
height: 400px;
/* margin-bottom: 10px; */
align-items: center;
/* flex-direction: column; */
flex-wrap: wrap;
overflow-y: auto;
justify-content: space-around;

`
const CouponContainer=styled.div`
display: flex;
border: 1px solid;
width: 100%;
justify-content: space-around;

margin-top: 10px;
flex-basis: 600px;

`
const GoodsImg=styled.div`
width: 20%;

@media (max-width: 550px) {
            
            display: none    
}

  img{
  /* width: 90px; */
  width: 100%;
  height: 90px;
 }
 `
const CouponHeadContainer=styled.div`
width: 80%;
display: flex;
flex-direction: column;
justify-content: center;
@media (max-width: 550px) {
            
  width: 100%;
}
`

const CouponHead=styled.div`
  display: flex;
  
 justify-content: space-between;
  

 
 .couponDate{
  button{

    margin-left: 10px;
    }
  
  @media (max-width: 550px) {
            
            width: 40%;
           
          }
 }

`
const CouponBody=styled.div`
  display: flex;

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