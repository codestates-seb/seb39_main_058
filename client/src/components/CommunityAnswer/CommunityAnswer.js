import React from 'react'
import styled from "styled-components";
import AnswerMap from './AnswerMap';
//댓글 리스트 나오는 곳
function CommunityAnswer() {

  //댓글들 리스트들이 나와야함 무한스크롤 쓸예정
  // 등록순을 기본으로하고 최신순버튼을 누르면 최신순으로 나와야함
  // 댓글 textarea이 움직여야함
  // 등록순이면 textarea이 맨아래
  // 최신순이면 textarea이 맨위
  // 댓글에 댓글달기(댓댓글=답글)을할시 그 댓글 아래에 input 이 생겨야함
  // 댓댓글(답글)은 css가 달라야함
  // 댓댓글(답글)에 답글을 달지못함 작성된 댓글에 답글을 눌러야함
  // 대댓글을 구현하려면 어케해야하지
  //

  return (
    <Container>
      <Head>
        댓글(3) <span>등록순</span> | <span>최신순</span>
      </Head>
      
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


`

const AnswerList=styled.div`

`