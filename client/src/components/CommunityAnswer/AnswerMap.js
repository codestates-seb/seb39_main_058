import React from 'react'
import styled from "styled-components";

// 매핑돌린 댓글의 css 및 버튼이라든지 설정해주는곳
const AnswerMap = () => {


//댓글삭제 함수
const answerDelete=()=>{

}



  return (
    <>
    <Container>
      <Head>

      <div>닉내임</div><div className='time'>2022.09.26</div><button onClick={answerDelete}>x</button>
      </Head>
      <div>내용fsdfsadfasdfascadcadfdadfdasff</div>
    </Container>
    
    <Container>
      <Head>

      <div>닉내임2</div><div className='time'>2022.09.26</div><button>x</button>
      </Head>
      <div>내용fsdfsadfasdfascadcadfdadfdasff</div>
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

