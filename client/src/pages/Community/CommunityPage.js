import React, { useState } from 'react'
import styled from "styled-components";

// 커뮤니티 게시판 리스트가 나오는 메인페이지
function CommunityPage() {
    const [ list, setList ] = useState([]);

    return (
        <CommunityPageStyle>
            <div className='title'>자유게시판</div>
        </CommunityPageStyle>
    )
}

export default CommunityPage

const CommunityPageStyle = styled.div`
  height: 94vh;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;

  .title{
    width: 70vw;
    height: 15vh;
    display: flex;
    align-items: center;
    font-size: 5vmin;
    font-weight: bold;
  }
`