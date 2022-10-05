import React, { useState } from "react";
import styled from "styled-components";

const dummy = [
  {
    title : "쓰위치는 무료인가요?",
    content : `네, 그렇습니다.

쓰위치에서 제공하는 모든 서비스는 무료입니다.

쓰레기통 조회부터 게시판, 이벤트, 포인트교환 까지 마음 편히 이용해주세요.`,
    id : 1
  },
  {
    title : "포인트는 어떻게 적립하나요?",
    content : `포인트는 쓰위치에서 진행중인 이벤트에서 적립 가능합니다.

또는 본인의 게시글의 추천수가 10개 단위로 일정 포인트가 적립되며,

쓰레기통 관련 위치 오류, 공익 제보, 비워주세요 처리가 정상적으로 이루어졌을시 지급됩니다. `,
    id : 2
  },
  {
    title : "로그인을 안하면 이용 불가능한가요?",
    content : `쓰레기통 위치 정보는 로그인 진행없이 가능합니다.

로그인이 필요한 경우는 게시글의 글작성, 댓글장성, 포인트 사용 및 적립 또는 일부 이벤트의 한해 로그인 서비스가 필요합니다`,
    id : 3
  },
  {
    title : "채팅 상담은 24시간 인가요?",
    content : `네 그렇습니다.
채팅 상담은 24시간 열려있으나 상담원의 부재에 따라 답변이 늦어질수도 있는점 양해 부탁드리겠습니다`,
    id : 4
  },
  {
    title : "등급 시스템에 대한 특혜가 있나요?",
    content : "등급에 따른 특혜는 내부 논의중이며, 빠른 시일 내에 적용하겠습니다",
    id : 5
  },
  {
    title : "포인트 양도가 가능한가요?",
    content : "포인트 양도는 쓰위치 내부 규정상 불가 하다는점 양해 부탁드리겠습니다",
    id : 6
  }
]

function FAQ() {

  const [click, setClick] = useState(false)
  const [findId, setFindId] = useState(null)

  return (
    <FAQStyle>
      <div className='header'>
        유용한 도움말
      </div>
      <div className='body'>
        {dummy.map(el => {
          return (
            <div key={el.id}>
              <div className='title_container' onClick={() => {
                setFindId(el.id)
                findId === el.id && click ?
                setClick(false) :
                setClick(true)
                }}>
                <p className='number'>{el.id}</p>
                <p className='title'>{el.title}</p>
              </div>
              {click && findId === el.id ?
              <div className="title_container">
                <p className="title content">{el.content}</p>
              </div> : undefined}
            </div>
          )
        })}
      </div>
      <div className='etc'>
        <div>다른 궁금즘이 있으신가요?</div>
        <br/>
        <a href='http://pf.kakao.com/_puDuxj/chat' target='_black'>채팅상담 바로가기</a>
      </div>
    </FAQStyle>
  )
}

export default FAQ

const FAQStyle = styled.div`

  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;

  .header{
    height: 10vh;
    width: 70%;
    font-size: 4vmin;
    display: flex;
    align-items: center;
    border-bottom: 0.3rem solid black;
    padding: 0 3vw;
  }

  .title_container{
    display: flex;
    cursor: pointer;
    border-bottom: 0.1rem solid rgba(0,0,0,0.3);
    :hover{
      background-color: lightgray;
    }
  }

  .body{
    font-size: 3vmin;
    width: 75vw;
    height: 58vh;
    border-bottom: 0.3rem solid black;
    overflow-y: scroll;

    .number{
      color: darkorange;
      padding: 0 2vw;
    }

    .title{
      width: 68vw;
      white-space: pre-wrap;
      word-break: keep-all;
    }
  }

  .content{
    border: 3px solid black;
    padding: 2vh 2vw;
    border-radius: 15px;
  }

  .etc{
    font-size: 2vmin;
    margin-top: 7vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5vh;
  }

`