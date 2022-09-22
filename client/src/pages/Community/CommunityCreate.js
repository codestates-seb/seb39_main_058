import React from 'react'
import styled from "styled-components";

// 게시글 생성
function CommunityCreate() {
  return (
    <Main>
        <div className='container'>
            <BoardHeader>
                <h1>자유게시판</h1>
                <h2>자유롭게 의견을 게시해주세요.</h2>
                <div className='warning'>
                    ※ 욕설이나 비방성 글은 경고없이 삭제될 수 있습니다.
                </div>
            </BoardHeader>
            
            <BoardWrite>
                <div className='writer-title'>
                    <span>제목</span>
                    <input type='text' placeholder='제목을 입력해주세요.'/>
                </div>
                
                <div className='writer-content'>
                    <textarea placeholder='내용을 입력해주세요.'/>
                </div>
                <div className='writer-tags'></div>
            </BoardWrite>

            {/* 등록 및 취소하는 버튼 만들기 */}
            <ButtonWrapper>
                <button className='writer-submit'> 등록 </button>
                <button className='writer-cancel'> 취소 </button>
            </ButtonWrapper>
        </div>

    </Main>
  )
}

export default CommunityCreate;

const Main = styled.main`
    /* border: 1px solid black; // 삭제 예정 */
    width: 100vw;
    height: 92vh;
    background-color: ivory;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const BoardHeader = styled.div`

    width: 90vw;
    border-bottom: 3px solid black;

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
        padding-bottom: 1vh;
    }
`;

const BoardWrite = styled.div`
    
    *{
        margin: 1rem;
    } 

    .writer-title {
        /* width: 85vw; */
        padding: 10px 20px;
        border-bottom: 2px solid lightgray;

        span {
            margin: 20px;
            font-size: 2vmin;
            font-family: 'Courier New', Courier, monospace;
        }

        input {
            width: 60vw;
            height: 4vh;
            padding: 0 15px;
            font-size: 2vmin;
            background-color: ivory;
        }
    }

    .writer-content {
        textarea{
            width: 85vw;
            height: 30vh;
            padding: 10px 15px;
            font-size: 2vmin;
            background-color: ivory;
            resize: none;
        }
    }
`;

const ButtonWrapper = styled.div`

    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;

        .writer-submit {
            width: 50vw;
            margin: 0px;
        }

        .writer-cancel {
            width: 50vw;
            margin: 0px;
        }
    }

    display: flex;

    .writer-submit {
        margin: 1rem;
        padding: 1vmin 4vmin;
        border-radius: 1rem;
        border: 1px solid gray;
        background-color: #38d9a9;
        color: white;
        font-size: 1.5vmin;
        cursor: pointer;
        &:hover {
            color: white;
            background-color: rgb(71,182,181);
            border: 1px solid rgb(71,182,181);
        }
    }

    .writer-cancel {
        margin: 1rem;
        padding: 1vmin 4vmin;
        border-radius: 1rem;
        border: 1px solid gray;
        background-color: ivory;
        font-size: 1.5vmin;
        cursor: pointer;
        &:hover {
            color: black;
            background-color: lightgray;
            border: 1px solid lightgray;
        }
    }
`;