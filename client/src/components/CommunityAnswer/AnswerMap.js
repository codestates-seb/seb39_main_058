import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useLocation, useNavigate} from 'react-router-dom'

// 매핑돌린 댓글의 css 및 버튼이라든지 설정해주는곳
const AnswerMap = ({item}) => {
  const navigate=useNavigate();
  const location = useLocation();
  const [clickCommentId,setClickCommentId]=useState('');




// 댓글삭제 요청 fetch
const answerDeleteFetch=async()=>{
  if(clickCommentId!==''){

    await fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/comment/take/${clickCommentId}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}

    })
    
    .catch((err)=>{
      // console.log(err)
    })
                  window.location.reload()
  }

}

//댓글삭제 함수
const answerDelete=(e)=>{
  console.log('eeeffe',e.target.name)
  
  if(window.confirm('댓글을 삭제하시겠습니까?')){
    if (!sessionStorage.getItem("accessToken")){
      alert('로그인 후 이용 가능 합니다')
      navigate('/login',{state: {path:location.pathname}})
    }else if(sessionStorage.getItem("accessToken")){
    setClickCommentId(e.target.name)
    answerDeleteFetch()
    
    
  }
  
}

}





useEffect(()=>{
  answerDeleteFetch()
},[clickCommentId])


  return (
    <>
    <Container>
      <Head >
 
      <div>{item.userName}</div><div className='time'>{item.dateCreated}</div>
      {item.userName===sessionStorage.getItem('userName') ?<button onClick={(e)=>answerDelete(e)} name={item.commnetId}>x</button> :''}
      </Head>
      <div>{item.commentText}</div>
    </Container>
    
  
    </>
  )
}

export default AnswerMap
const Container=styled.div`
border-bottom: 1px solid;
width: 100%;
`


const Head=styled.div`
display: flex;
margin-bottom: 10px;
.time{
  font-size: x-small;
  padding-top: 5px;
}
`

