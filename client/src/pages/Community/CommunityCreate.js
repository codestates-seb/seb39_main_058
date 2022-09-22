import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 게시글 생성
function CommunityCreate() {

    

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ tags, setTags ] = useState([]);
    const [ state, setState ] = useState(false);
    const navigate = useNavigate();

    // const handleSubmit = () => {
    //     fetch(`/data`)
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err));
    // };

    const handleTags = () => {
        fetch('http://localhost:3002/data')
        // fetch('http://ec2-3-38-246-82.ap-northeast-2.compute.amazonaws.com:8080/')
            .then(res => res.json())
            .then(data => setTags(data[0].tag))
            .catch(err => console.log(err))
    }


    // 게시판 내용 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch('http://ec2-3-38-246-82.ap-northeast-2.compute.amazonaws.com:8080/')
        //     .then()
        //     .then()
    }

    // 특정 태그 선택
    const selectTag = () => {

    }
    return (
    <Main>
        <div className="container">
            <BoardHeader>
                <h1>자유게시판</h1>
                <h2>자유롭게 의견을 게시해주세요.</h2>
                <div className="warning">
                    ※ 욕설이나 비방성 글은 경고없이 삭제될 수 있습니다.
                </div>
            </BoardHeader>
            
            <BoardWrite>
                <div className="writer-title">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="title">제목</label>
                        <input type="text" id="title" placeholder="제목을 입력해주세요." onChange={(e) => setTitle(e.target.value)}/>
                    </form>
                </div>
                
                <div className="writer-content">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="content"></label>
                        <textarea id="content" placeholder="내용을 입력해주세요." onChange={(e) => {
                            
                            setContent(e.target.value)
                            console.log(content)
                            }}/>
                    </form>
                </div>
                <div className="writer-tags"></div>
            </BoardWrite>

            <BoardTag>
                {/* <label>지역 태그를 선택하세요</label> */}
                <select name="tags" onClick={handleTags}>
                    <option name="tags">지역 태그를 선택하세요</option>
                    {tags.map(tag => 
                        <option key={tag} name="tags" value="guro" onClick={selectTag}>{tag}</option>
                    )}
                </select>
            </BoardTag>

            {/* 등록 및 취소하는 버튼 만들기 */}
            <ButtonWrapper>
                <button className="writer-submit" form="board"> 등록 </button>
                <button className="writer-cancel" onClick={() => navigate("/community/forum")}> 취소 </button>
            </ButtonWrapper>
        </div>

    </Main>
    )
}

export default CommunityCreate;

const Main = styled.main`
    /* border: 1px solid black; // 삭제 예정 */
    width: 100%;
    height: 92vh;
    background-color: ivory;

    @media (max-width: 550px) {
        height: 115vh;
    }

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
        margin-top: 2rem;
        font-size: 4vmin;
        font-family: "Courier New", Courier, monospace;
        letter-spacing: 3px;
        @media (max-width: 550px) {
            font-size: 30px;
        }
    }
    
    h2{
        font-size: 2vmin;
        font-family: "Courier New", Courier, monospace;
        @media (max-width: 550px) {
            font-size: 20px;
        }
    }
    .warning {
        color: red;
        font-size: 1.5vmin;
        padding-bottom: 1vh;
        @media (max-width: 550px) {
            font-size: 14px;
        }
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

        label {
            margin: 20px;
            font-size: 2vmin;
            font-family: "Courier New", Courier, monospace;
            @media (max-width: 550px) {
                font-size: 20px;
            }
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
            @media (max-width: 550px) {
                width: 55vw;
            }
            width: 85vw;
            height: 30vh;
            padding: 10px 15px;
            font-size: 2vmin;
            background-color: ivory;
            resize: none;
            
        }
    }
`;

const BoardTag = styled.div`
    select {
        padding: 0.5rem 1rem;
        background-color: ivory;
        /* border-radius: 10%; */
    }
`;

const ButtonWrapper = styled.div`

    display: flex;

    @media (max-width: 550px) {
        display: flex;
        flex-direction: column;
        

        .writer-submit {
            width: 50vw;
            height: 5vh;
            
        }

        .writer-cancel {
            width: 50vw;
            height: 5vh;
            
        }
    }

    .writer-submit {
        margin: 1rem;
        padding: 1vmin 4vmin;
        border-radius: 1rem;
        border: 1px solid gray;
        background-color: #38d9a9;
        color: white;
        font-size: 15px;
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
        font-size: 15px;
        cursor: pointer;
        &:hover {
            color: black;
            background-color: lightgray;
            border: 1px solid lightgray;
        }
    }
`;