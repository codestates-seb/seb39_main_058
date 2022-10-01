import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { RiArrowDropDownFill } from "react-icons/ri";
import {Link} from "react-router-dom"
import { useSelector } from "react-redux"

const NewsPage = () => {

  const [item, setItem] = useState(undefined) // 몇번째 공지가 열렸는지 비교하기 위해서 만든 스테이트
  const [click, setClick] = useState(false) // 공지를 눌를때 아코디언이 열렸다 닫혔다를 관리하기 위한 스테이트
  const [del, setDel] = useState(false) // 체크박스가 보이고 안보이고를 관리해주는 스테이트
  const [check, setCheck] = useState([]) // 삭제할때 체크박스 다중체크할때 어떤것들이 체크되었나 담아주기위한 스테이트
  const [completion, setCompletion] = useState(false) // 체크박스를 선택하고 삭제버튼을 누를때 최종적으로 확인을 물어보는 창을 열고 닫기위한 스테이트 
  const [data, setData] = useState([]) // 겟 받아온 데이터들
  const [edit, setEdit] = useState({
    noticeTitle : '',
    noticeText : '',
    noticeId : null,
    click : false
  })

  
  const userInfo = useSelector(state => state.LoginPageReducer.userinfo)

  const handleCheckButton = (id) => { // 체크된 항목의 id가 이미 있는지 비교해주기 위한 함수
    if(check.includes(id) === true){ // 이미 있는 값이라면 필터링해서 그얘를 제외한 나머지를 다시 check에 할당해줌
      let filteredValue = check.filter(el => {
        return el !== id
      })
      setCheck(filteredValue)
    }else{
      setCheck([...check , id]) // 없는값이면 그대로 기존 배열에 추가시켜줌
    }
  }

  useEffect(() => {
    fetch("http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/news/notice?page=1&size=10")
    .then((res) => res.json())
    .then((res) => {
      setData(res.data)
    })
  },[])

  const handleDeletButton = () => {
    for(let i = 0 ; i < check.length ; i++){
      fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/news/notice/take/${check[i]}`,{
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${userInfo.accessToken}`,
          "Content-Type": "application/json"
      }
      }).then(() => {
        window.location.reload()
      }).catch((err) => console.log(err))
    }
  }

  console.log(typeof(edit.noticeText) , typeof(edit.noticeTitle))
  console.log(edit)

  const handleEditButton = () => {

    const editInfo = {
      "noticeTitle" : edit.noticeTitle,
      "noticeText" : edit.noticeText
    }
    
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/news/notice/take/${edit.noticeId}`,{
      method : "PATCH",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editInfo)
    })
    .then(() => {
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <NewsStyle data={data}>
      <div className='title'>공지사항</div>
      {userInfo.role === "ROLE_ADMIN" ?
        <div className='manager'>
          <Link to="/news/notice/create" className='ask'>글쓰기</Link>
          {del ?
          <>
          <div className='delete' onClick={() => {
            check.length === 0 ?
            alert("삭제할 글을 체크해주세요.") :
            setCompletion(true)
          }}>삭제</div>
          <div className='edit' onClick={() => {
            setDel(false)
          }}>완료</div>
          </>:
          <div className='edit' onClick={() => {
            setDel(true)
          }}>편집</div>}
        </div> :
      undefined}
      {completion ?
      <div className='back_drop'>
        <div className='view'>
          <div>정말 삭제하시겠습니까?</div>
          <div className='confirm'>
            <div onClick={() => {
              setCompletion(false)
              handleDeletButton()
            }}>확인</div>
            <div onClick={() => {
              setCompletion(false)
            }}>취소</div>
          </div>
        </div>
      </div> :
      undefined}
        {data.map(el => {
          return(
            <div className='container' key={el.noticeId}>
            <div className='list_container' onClick={() => {
              setItem(el.noticeId)
              item === el.noticeId ? setClick(!click) : setClick(true)
            }}>
              <div className='list'>
                <span className='notice'>[공지]</span>
                <div className='content'>{el.noticeTitle}</div>
                <div className='icon'><RiArrowDropDownFill/></div>
              </div>
                {item === el.noticeId && click === true ?
                <div className='content_detail'>{el.noticeText}</div>:
                undefined}
            </div>
                {del ? <input type='checkbox' onClick={() => {
                  handleCheckButton(el.noticeId)
                }} /> : undefined}
                {del ? <div className='rewrite' onClick={() => {
                  setEdit({noticeTitle : el.noticeTitle, noticeText : el.noticeText, noticeId : el.noticeId, click : true})
                }}>수정</div> : undefined}
            </div>
          )
        })}
        {edit.click ?
        <div className='edit_back_drop' onClick={() => setEdit({noticeTitle : '', noticeText : '', noticeId : null, click : false})}>
          <div className='edit_view' onClick={(e) => e.stopPropagation()}>
            <input className='edit_title' onChange={e => setEdit({noticeTitle : e.target.value, noticeText : edit.noticeText, noticeId : edit.noticeId, click : true})} value={edit.noticeTitle} />
            <textarea className='edit_content' onChange={e => setEdit({noticeTitle : edit.noticeTitle, noticeText : e.target.value, noticeId : edit.noticeId, click : true})} value={edit.noticeText} />
            <div className='select_btn'>
              <span onClick={handleEditButton}>완료</span>
              <span onClick={() => setEdit({noticeTitle : '', noticeText : '', noticeId : null, click : false})}>취소</span>
            </div>
          </div>
        </div> :
        undefined}
      <div className='etc'>
        <div>다른 궁금즘이 있으신가요?</div>
        <br/>
        <a href='http://pf.kakao.com/_puDuxj/chat' target='_black'>채팅상담 바로가기</a>
      </div>
    </NewsStyle>
  )
}

export default NewsPage

const NewsStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${(props) => props.data.length === 1 || 2 || 3 || 4 || 5 ? "100vh" : "100%"};
  width: 100%;
  border-radius: 30px;
  user-select: none;

  .edit_view{
    background-color: white;
    height: 50vh;
    width: 60vw;
    position: relative;
    z-index: 2;

    .edit_title{
      width: 50vw;
      height: 5vh;
      font-size: 3vmin;
      margin: 3vh 2vw;
    }

    .edit_content{
      width: 50vw;
      height: 30vh;
      font-size: 3vmin;
      margin: 0vh 2vw;
      resize: none;
    }

    .select_btn{
      display: flex;
      justify-content: center;
      span{
        border: 3px solid black;
        margin: 0 1vw;
        font-size: 4vmin;
        padding: 0.5vh 2vw;
        cursor: pointer;

        :hover{
          font-weight: bold;
          background-color: lightgray;
        }
      }
    }
  }

  .edit_back_drop{
    background-color: rgba(0,0,0,.5);
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .rewrite{
    display: flex;
    align-items: center;
    margin-left: 1vw;
    margin: 3vh 1vw;
    cursor: pointer;
    :hover{
      background-color: lightgray;
    }
  }

  .back_drop{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    width: 30vw;
    height: 20vh;
    border-radius: 1rem;
    font-size: 3vmin;

    .confirm{
      display: flex;
      justify-content: space-around;
      width: 100%;
      div{
        border: 3px solid black;
        padding: 0.5vh 1vw;
        border-radius: 10px;
        cursor: pointer;

        :hover{
          background-color: gray;
          color: white;
          font-weight: bold;
        }
      }
    }
  }

  .ask, .edit, .delete{
    font-size: 2vmin;
    margin: 1vh 1vw;
    padding: 1vh 1vw;
    border: 2px solid black;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  .delete:hover{
    color: white;
    background-color: #FF1E00;
    font-weight: bold;
  }

  .ask:hover{
    color: white;
    background-color: gray;
    font-weight: bold;
  }

  .edit:hover{
    color: white;
    background-color: #357C3C;
    font-weight: bold;
  }

  .manager{
    display: flex;
    justify-content: end;
    width: 70%;
  }

  .container{
    display: flex;
  }

  .notice{
    color: rgb(71,182,181);
    font-size: 3vmin;
    padding-right: 3vw;
  }

  .title{
    width: 70vw;
    height: 15vh;
    display: flex;
    align-items: center;
    font-size: 7vmin;
    font-weight: bold;
    font-family: 'Nanum Pen Script', cursive;
  }

  .list_container{
    width: 70vw;
    list-style: none;    

    .list{
      height: 10vh;
      font-size: 3vmin;
      display: flex;
      align-items: center;
      padding: 0 3vw;

      :hover{
        background-color: rgba(0,0,0,0.1);
      }
    }
  }

  .content{
    flex-grow: 3;
    height: 6vh;
    display: flex;
    align-items: center;
    width: min-content;
    cursor: pointer;
  }

  .icon{
    padding-left: 3vw;
  }

  .etc{
    font-size: 2vmin;
    margin-top: 10vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5vh;
  }

  .content_detail{
    width: 50vw;
    margin-left: 10.8vw;
    font-size: 2vmin;
    white-space: pre-wrap;
    word-break: keep-all;
    animation-name: drop;
    animation-duration: .5s;
  }

  @keyframes drop {

    0%{
      transform: translateY(-30%);
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

`