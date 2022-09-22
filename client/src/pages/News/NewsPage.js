import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { RiArrowDropDownFill } from "react-icons/ri";

const list = [
        { id:0, title: '여행상품 예약은 어떻게 하나요 ?',
            content:
`여행상품의 예약은 온라인상에서, 전화, 또는 e-mail을 통해 문의 및 예약하실수 있으며, 
365일 24시간 언제든지 예약하실 수 있습니다.
    
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

  const [item, setItem] = useState(undefined)
  const [click, setClick] = useState(false)

  return (
    <NewsStyle>
      <div className='title'>공지사항</div>
        {list.map(el => {
          return(
            <div className='list_container' key={el.id} onClick={() => {
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
  background-color: ivory;

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
  }

  .content_detail{
    width: 50vw;
    margin-left: 10.8vw;
    font-size: 2vmin;
    white-space: pre-wrap;
    word-break: keep-all;
  }

`