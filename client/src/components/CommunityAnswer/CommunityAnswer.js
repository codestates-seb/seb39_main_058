import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import AnswerMap from './AnswerMap';
import { useLocation, useNavigate, useParams} from 'react-router-dom'

//댓글 리스트 나오는 곳
function CommunityAnswer() {
  const navigate=useNavigate();
  const location = useLocation();
 
// const year= new Date().toLocaleDateString('ko-KR');
// const time = new Date().getHours();
// const minute = new Date().getMinutes();
// const todayInfo = `${year} ${time}:${minute<10?'0':''}${minute}`;
const [commentText,setCommentText]=useState('');
let {id}=useParams();
//댓글 목록조회
//이부분은 communitydetail 부분에서props로받아와야함 




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



//댓글 포스트함수
const submitFunc=async(event)=>{
  event.preventDefault()/*통신되면 지워주자 */
  if(!sessionStorage.getItem("accessToken")){
    alert('로그인 후 이용 가능 합니다')
    navigate('/login',{state: {path:location.pathname}})
  }else if(sessionStorage.getItem("accessToken")){

    if(spaceCheck(commentText)===false){
      alert('내용을 입력해 주세요.')
    }else if(spaceCheck(commentText)===true){
      const answerInfo={
          "forumId" : id,
          "commentText" : commentText,
          "userId" : 1,

      }
        await fetch('http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/comment/create', {
        
            method: 'POST',
            headers: { 'content-Type' : 'application/json'},
            body: JSON.stringify(answerInfo)
          })
        .then((res) => res.json())
          .then((data)=>{
                  console.log('정보',answerInfo)
                  console.log(data)       
          })
          // 응답받을게머가있나?
      }

  }

  


}

  return (
    <Container>
      <Head>
        댓글(3) <span>등록순</span> | <span>최신순</span>  

      </Head>
      
      <AnswerPostForm  onSubmit={(event)=>submitFunc(event)}>
      <AnswerText id='body' cols='5' rows="3" onChange={(e) => setCommentText(e.target.value)}></AnswerText>
      <button type='submit'>등록</button>
       
      </AnswerPostForm>

      <AnswerList>
      
        <AnswerMap/>
          
      </AnswerList>
    </Container>
  )
}

export default CommunityAnswer


const Container=styled.div`
display: flex;
height: 90vh;
width: 100vw;
justify-content: center;
align-items: center;
flex-direction: column;

`

const Head=styled.div`
display: flex;
text-align: start;
width: 70%;
white-space:nowrap;
border-bottom:1px solid;
margin-bottom: 10px;

`

const AnswerList=styled.div`

`

const AnswerPostForm=styled.form`
display: flex;
width: 70%;
justify-content: space-between;
button{
  white-space:nowrap;

}

`
const AnswerText=styled.textarea`
resize: none;
width: 100%;
margin-right: 10px;
`