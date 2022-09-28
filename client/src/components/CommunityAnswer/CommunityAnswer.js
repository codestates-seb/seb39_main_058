import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import AnswerMap from './AnswerMap';
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react';


//댓글 리스트 나오는 곳
function CommunityAnswer({data}) {
  const navigate=useNavigate();
  const location = useLocation();
  
  // const year= new Date().toLocaleDateString('ko-KR');
  // const time = new Date().getHours();
  // const minute = new Date().getMinutes();
  // const todayInfo = `${year} ${time}:${minute<10?'0':''}${minute}`;
  
  const [newest,setNewest]=useState(false)
  
  let {id}=useParams();





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
  event.preventDefault()
 
  if(!sessionStorage.getItem("accessToken")){
    alert('로그인 후 이용 가능 합니다')
    navigate('/login',{state: {path:location.pathname}})
  }else if(sessionStorage.getItem("accessToken")){

    if(spaceCheck(event.target.body.value)===false){
      alert('내용을 입력해 주세요.')
    }else if(spaceCheck(event.target.body.value)===true){
      const answerInfo={
          "forumId" : id,
          "commentText" : event.target.body.value,
          "userId": 1,

      }
        await fetch('http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/comment/take/create', {
        
            method: 'POST',
            headers: { 'content-Type' : 'application/json','Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,},
            body: JSON.stringify(answerInfo)
          })
        // .then((res) => res.json())
        //   .then((data)=>{
        //           console.log('정보',answerInfo)
        //           console.log(data)       
                  
        //   })
        .catch(()=>{
          alert('세션이 만료되었습니다.')
          navigate('/login',{state: {path:location.pathname}})
        })
          // 응답받을게머가있나?
         window.location.reload()
      }

  }


}

//등록순최신순함수
const changeRow=(e)=>{
  
   if(e?.target.name==='oldest'){
  
      window.location.reload()
      

    
  
     }
     if(e?.target.name==='newest'){
      
      
        setTimeout(() => {
          
          setNewest(true)
       
        }, 4000);
      
     

     }
}


useEffect(()=>{
  return
  
},[newest])

  return (
    <Container>
      <Head>
        댓글({data.data?.commentResponses.length}) <button name='oldest' onClick={(e)=>changeRow(e)}>등록순</button> | <button name='newest' onClick={(e)=>changeRow(e)}>최신순</button>
      </Head>
      
      <AnswerPostForm  onSubmit={(event)=>submitFunc(event)}>
      <AnswerText id='body' cols='5' rows="3" ></AnswerText>
      <button type='submit' >등록</button>
     
      </AnswerPostForm>

{newest ? 
     <AnswerList>
     {data.data?.commentResponses.reverse().map((item)=>(
     <AnswerMap key={item.commnetId} item={item}/>
     ))}
     </AnswerList>
     :
    <AnswerList>
    {data.data?.commentResponses.map((item)=>(
    <AnswerMap key={item.commnetId} item={item}/>
    ))}
    </AnswerList>
     }


    

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
@media screen and (max-width: 500px){
        width:90%;
    }
`

const AnswerList=styled.div`
width: 70%;
@media screen and (max-width: 500px){
        width:90%;
    }
`

const AnswerPostForm=styled.form`
display: flex;
width: 70%;
justify-content: space-between;
button{
  white-space:nowrap;

}
@media screen and (max-width: 500px){
        width:90%;
    }
`
const AnswerText=styled.textarea`
resize: none;
width: 100%;
margin-right: 10px;
`