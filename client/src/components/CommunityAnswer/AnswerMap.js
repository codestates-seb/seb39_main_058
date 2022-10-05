import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import AnswerModal from './AnswerModal';
import { ImWarning } from 'react-icons/im';





// 매핑돌린 댓글의 css 및 버튼이라든지 설정해주는곳
const AnswerMap = ({item}) => {
  const navigate=useNavigate();
  const location = useLocation();
  const [clickCommentId,setClickCommentId]=useState('');
  const accesstoken=useSelector(state=>state.LoginPageReducer.userinfo.accessToken)
  const userName=useSelector(state=>state.LoginPageReducer.userinfo.userName)
  const role=useSelector(state=>state.LoginPageReducer.userinfo.role)
  const [modalOn, setModalOn] = useState(false);

// 댓글삭제 요청 fetch
const answerDeleteFetch=async()=>{
  if(clickCommentId!==''){

    await fetch(`https://sswitch.ga/community/comment/take/${clickCommentId}`, {
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

//댓글삭제 함수
const answerDelete=(e)=>{
  
  
  
    if (!accesstoken){
      alert('로그인 후 이용 가능 합니다')
      navigate('/login',{state: {path:location.pathname}})
    }else if(accesstoken){
   
    answerDeleteFetch()
    
    
  }
  


}


// onClick={() => setSignup(!signup)
  // onClick={(e)=>answerDelete(e)} name={item.commnetId}

// useEffect(()=>{
//   answerDeleteFetch()
// },[clickCommentId])


  return (
    <>
    <Container>
      <Head >
 
      <div>{item.userName}</div><div className='time'>{item.dateCreated}</div>
      {item.userName===userName||role==="ROLE_ADMIN" ?<button onClick={(e) => {
        setModalOn(!modalOn)
        // console.log('e가머여',e.target.name)
        setClickCommentId(e.target.name)
        }}  name={item.commnetId}
        >x</button> :''}
      </Head>
      <div>{item.commentText}</div>
    </Container>
    
      {/* 삭제 모달창 */}
      {modalOn && (
        <AnswerModal closeModal={() => setModalOn(!modalOn)}>
          <ModalItem>
             <ImWarning className="delete-warning-icon"/>
              <div>삭제 이후 복구할 수 없습니다.</div>
              <div>정말 댓글을 삭제하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={(e)=>{answerDelete(e)}}>확인</div>
                <div className="cancel" onClick={() => setModalOn(!modalOn)}>취소</div>
              </div>

          </ModalItem>
        </AnswerModal>
      )}
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
const ModalItem=styled.div`
font-family: Jua, serif;
font-size: x-large;
 .delete-warning-icon {
      color: rgb(254,104,0);
      font-size:x-large;
    }


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