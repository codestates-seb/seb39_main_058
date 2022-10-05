import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const GoodsCreate = () => {
 
  const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken)
  const role=useSelector(state=>state.LoginPageReducer.userinfo.role)
  const navigate=useNavigate();
  const location = useLocation();

 
  const goodsPost=(e)=>{
    e.preventDefault();
    
    if(role==="ROLE_ADMIN"&&spaceCheck(e.target.goodsName.value)&&spaceCheck(e.target.goodsText.value)&&spaceCheck(e.target.price.value)&&spaceCheck(e.target.goodsImage.value)&&spaceCheck(e.target.goodsStatus.value)===true){
      const goodsInfo={
        "goodsName" : e.target.goodsName.value,
        "goodsText" : e.target.goodsText.value,
        "price" : e.target.price.value,
        "goodsImage" : e.target.goodsImage.value,
        "goodsStatus" :e.target.goodsStatus.value
    }
    fetch('https://sswitch.ga/goods/admin/create', {
        
      method: 'POST',
      headers: { 'content-Type' : 'application/json','Authorization': `Bearer ${accesstoken}`,},
      body: JSON.stringify(goodsInfo)
    })
  .then((res) => res.json())
    .then((data)=>{
      // console.log('전송완료데이타',data)
            if(data.error==='Unauthorized'){
              alert('세션이 만료되었습니다.')
              navigate('/login',{state: {path:location.pathname}})
            }else if(data.data){
              navigate('/goods')
            }
            
            
    })



  }
}
//공백 체크 정규식
//공백이없으면 트루가나올태고 내용이없거나 띄어쓰기만 있는거라면 false  
function spaceCheck(txt){
  let abc=txt.replace(/(\s*)/g,'')
  if(txt.length===0){
    return false
  }else if(txt.length!==0){
    if (abc.length===0){
      return false
    }else if(abc.length!==0){
     return true
    }
  }
}
 
 
 
 
 
  return (
    <Container>
      {/* <img src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201508/26/htm_2015082672545c010c011.jpg'/> */}
      <GoodsPostForm onSubmit={(e)=>goodsPost(e)}>
        <div>상품등록페이지입니다 빠진칸 없이 모두 작성해야 등록됩니다.</div>
        <div>상품이 정상등록되면 상품페이지로 넘어가집니다</div>

        <div>상품명 <input id='goodsName' placeholder='이미 등록된상품명이랑동일하면안됨'/></div>
        <div>상품설명 <input id='goodsText'/></div>
        <div>가격 <input id='price'  placeholder='숫자만입력하세요'/></div>
        <div>이미지 <input id='goodsImage'  /></div>
        <div>상품상태 <input id='goodsStatus'  placeholder='파실거면 판매중 이라고 입력하세요'/></div>
        
        <button type='submit'>등록하기</button>
      </GoodsPostForm>
    </Container>
  )
}

export default GoodsCreate

const Container=styled.div`
display: flex;
height: 90vh;
width: 80%;
justify-content: center;
align-items: center;
`

const GoodsPostForm=styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  height: 100%;
  width: 100%;

  input{
    width: 70%;

  }
  
`