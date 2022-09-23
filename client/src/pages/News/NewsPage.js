import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { RiArrowDropDownFill } from "react-icons/ri";

const list = [
        { id:0, title: '여행상품 예약은 어떻게 하나요 ?',
            content:
`여행상품의 예약은 온라인상에서, 전화, 또는 e-mail을 통해 문의 및 예약하실수 있으며, 365일 24시간 언제든지 예약하실 수 있습니다.
    
(단, 전화상담 가능시간 평일 09:00~18:00 / 토,일요일 및 공휴일 휴무)
    
예약후 영업일기준 24시간내에 고객께 전화나 메일로 
여행 출발일로부터 종료일까지 예약의 전반적인 사항을 체크하여 처리해 드립니다.`},
        { id:1, title: '예약을 취소하고 싶습니다.',
            content: `인터넷상에서 예약취소나 수정은 불가능합니다.
예약취소나 여행자정보 변경을 원하시면 반드시 담당자에게 연락을 주셔야 합니다.
    
모든 취소는 근무일(공휴일 및 토, 일요일 제외) 및
근무시간(18시 30분까지) 내에 취소요청을 해주시기 바랍니다.
    
또한 여행자의 여행계약 해제 요청이 있는 경우
여행약관에 의거 소정의 최소료비용이 발생할 수 있습니다.`},
        { id:2, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`},
            { id:3, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`},
            { id:4, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`},
            { id:5, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`},
            { id:6, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`},
            { id:7, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`},
            { id:8, title: '해외 패키지 예약이 가능한가요?',
            content: `현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전고지 없이 변경될 수 있습니다.`}
    ]

const NewsPage = () => {

  const [item, setItem] = useState(undefined) // 몇번째 공지가 열렸는지 비교하기 위해서 만든 스테이트
  const [click, setClick] = useState(false) // 공지를 눌를때 아코디언이 열렸다 닫혔다를 관리하기 위한 스테이트
  const [del, setDel] = useState(false) // 체크박스가 보이고 안보이고를 관리해주는 스테이트
  const [check, setCheck] = useState([]) // 삭제할때 체크박스 다중체크할때 어떤것들이 체크되었나 담아주기위한 스테이트
  const [completion, setCompletion] = useState(false) // 체크박스를 선택하고 삭제버튼을 누를때 최종적으로 확인을 물어보는 창을 열고 닫기위한 스테이트 

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

  return (
    <NewsStyle>
      <div className='title'>공지사항</div>
      <div className='manager'>
        <div className='ask'>글쓰기</div>
        {del ?
        <div className='completion' onClick={() => {
          check.length === 0 ?
          setDel(false) :
          setCompletion(true)
        }}>완료</div>:
        <div className='delete' onClick={() => {
          setDel(true)
        }}>삭제</div>}
      </div>
      {completion ?
      <div className='back_drop'>
        <div className='view'>
          <div>정말 삭제하시겠습니까?</div>
          <div className='confirm'>
            <div onClick={() => {
              setCompletion(false)
              window.location.reload()
              // handleDeletButton()
            }}>확인</div>
            <div onClick={() => {
              setCompletion(false)
            }}>취소</div>
          </div>
        </div>
      </div> :
      undefined}
        {list.map(el => {
          return(
            <div className='container' key={el.id}>
            <div className='list_container' onClick={() => {
              setItem(el.id)
              item === el.id ? setClick(!click) : setClick(true)
            }}>
              <div className='list'>
                <span className='notice'>[공지]</span>
                <div className='content'>{el.title}</div>
                <div className='icon'><RiArrowDropDownFill/></div>
              </div>
                {item === el.id && click === true ?
                <div className='content_detail'>{el.content}</div>:
                undefined}
            </div>
                {del ? <input type='checkbox' onClick={() => {
                  handleCheckButton(el.id)
                }} /> : undefined}
            </div>
          )
        })}
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
  height: ${list.length >= 5 ? "100%" : "94vh"};
  width: 100%;
  border-radius: 30px;

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

  .ask, .delete, .completion{
    font-size: 2vmin;
    margin: 1vh 1vw;
    padding: 1vh 1vw;
    border: 2px solid black;
    border-radius: 10px;
    cursor: pointer;
  }

  .completion:hover{
    color: white;
    background-color: #357C3C;
    font-weight: bold;
  }

  .ask:hover{
    color: white;
    background-color: gray;
    font-weight: bold;
  }

  .delete:hover{
    color: white;
    background-color: #FF1E00;
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
    font-size: 5vmin;
    font-weight: bold;
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