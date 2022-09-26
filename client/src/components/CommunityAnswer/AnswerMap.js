import React from 'react'
import styled from "styled-components";
import { useLocation, useNavigate, useParams} from 'react-router-dom'

// 매핑돌린 댓글의 css 및 버튼이라든지 설정해주는곳
const AnswerMap = ({item}) => {
  const navigate=useNavigate();
  const location = useLocation();


//댓글삭제 요청 fetch
const answerDeleteFetch=async()=>{
 await fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/comment/${item.userId}`,
 {method: "DELETE"})
//  .then(()=>{  window.location.reload()})
 .catch((err)=>{console.log(err)})

}

//댓글삭제 함수
const answerDelete=()=>{
if(window.confirm('댓글을 삭제하시겠습니까?')){
  if (!sessionStorage.getItem("accessToken")){
    alert('로그인 후 이용 가능 합니다')
    navigate('/login',{state: {path:location.pathname}})
  }else if(sessionStorage.getItem("accessToken")){
          answerDeleteFetch()

  }

  }

}



  return (
    <>
    <Container>
      <Head>
 
      <div>{item.userId}</div><div className='time'>{item.datedateCreated}</div><button onClick={answerDelete}>x</button>
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

