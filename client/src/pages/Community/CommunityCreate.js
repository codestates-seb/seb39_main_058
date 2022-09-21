import React from 'react'
import styled from "styled-components";

// 게시글 생성
function CommunityCreate() {
  return (
    <Main>
        <div className='container'>
            <div className='board-header'>
                <h1>자유게시판</h1>
                <h2>자유롭게 의견을 게시해주세요.</h2>
                <div className='warning'>
                    ※ 욕설이나 비방성 글은 경고없이 삭제될 수 있습니다.
                </div>
            </div>
            
            <BoardWrite>
                <div className='writer-title'>
                    <span>제목</span>
                    <input type='text' placeholder='제목을 입력해주세요.'/>
                </div>
                {/* <div className='writer-info'>
                    <div className='writer-id'>
                        <span>작성자ID</span>
                        <input type='text' placeholder='아이디를 입력해주세요.'/>
                    </div>
                    <div className='writer-pw'>
                        <span>비밀번호</span>
                        <input type='password' placeholder='비밀번호를 입력해주세요.'/>
                    </div>
                </div> */}
                <div className='writer-content'>
                    <textarea placeholder='내용을 입력해주세요.'></textarea>
                </div>
            </BoardWrite>
            {/* 등록 및 취소하는 버튼 만들기 */}
        </div>

    </Main>
  )
}

export default CommunityCreate;

const Main = styled.main`
    
    border: 1px solid black; // 삭제 예정
    width: 100vw;
    height: 90vh;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 100px;

        .board-header {
            width: 90vw;
            border-bottom: 3px solid black;
        }

        h1 {
            font-size: 4vmin;
            font-family: 'Courier New', Courier, monospace;
            letter-spacing: 3px;
        }
        
        h2{
            font-size: 2vmin;
            margin-bottom: 0;
            font-family: 'Courier New', Courier, monospace;
        }
        .warning {
            color: red;
            font-size: 1.5vmin;
            padding-bottom: 10px;
        }
    }

`;

const BoardWrite = styled.div`

    display: flex;
    flex-direction: column;
    * {
        padding: 10px 20px;
    }

    .writer-title {

    }

    .writer-info {
        display: flex;
    }

    .writer-content {

    }
`;