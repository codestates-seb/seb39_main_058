import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

// 게시글 생성
function CommunityCreate() {

    const [ title, setTitle ] = useState("");
    const [ titleState, setTitleState ] = useState(false); // 제목 입력 상태여부

    const [ content, setContent ] = useState("");
    const [ contentState, setContentState ] = useState(false); // 내용 입력 상태여부

    const [ tags, setTags ] = useState([]);
    const [ clickTag, setClickTag ] = useState(false);

    const navigate = useNavigate();
    

    const boardPost = {
        "forumTitle" : title,
        "forumText" : content,
        "tag" : [ "강남구", "구로구", "동작구", "관악구", "마포구" ],
        "secret" : "SECRET"
    }
    
    const handleTags = () => {
        fetch("http://localhost:3002/data")
        // fetch("http://ec2-3-38-246-82.ap-northeast-2.compute.amazonaws.com:8080/")
            .then(res => res.json())
            .then(data => setTags(data[0].tag))
            .catch(err => console.log(err))
    }

    // 게시판 내용 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!title) {
            setTitle(title);
            setTitleState(!titleState); // 제목 입력 여부 상태
        }
        
        if(!content) {
            setContent(content);
            setContentState(!contentState); // 내용 입력 여부 상태
        }
        
        if(title && content) {
            setTitle("");
            setContent("");
            
            fetch("http://localhost:3002/data", {
            // fetch("http://ec2-3-38-246-82.ap-northeast-2.compute.amazonaws.com:8080/")
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(boardPost)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    navigate("/community/forum")
                })
                .catch(error => error)
        }        
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
                        <input type="text" id="title" placeholder="제목을 입력해주세요." value={title} 
                            onChange={(e) => {
                                setTitleState(false)
                                setTitle(e.target.value)}}/>
                        {titleState ? <div style={{color: "red", paddingLeft: "4rem"}}>제목은 반드시 입력되어야 합니다.</div> : undefined}
                    </form>
                </div>
                
                <div className="writer-content">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="content"></label>
                        <textarea id="content" placeholder="내용을 입력해주세요." value={content} 
                            onChange={(e) => {
                                setContentState(false)
                                setContent(e.target.value)}}/>
                        {contentState ? <div style={{color: "red", paddingLeft: "2rem"}}>내용은 반드시 입력되어야 합니다.</div> : undefined}
                    </form>
                </div>
                <div className="writer-tags"></div>
            </BoardWrite>
            {/* 유저가 태그를 선택한 경우, 나타나는 태그 만들기 */}
            { !clickTag && <SelectedTag>
                <div>
                    <span style={{padding: "10px"}}>예시</span>
                    <span style={{padding: "10px"}}>또 다른 예시</span>
                </div>
            </SelectedTag>}

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

const SelectedTag = styled.div`
    margin-bottom: 20px;    
    border: 1px solid black;
    /* padding: 15px; */
    width: 85vw;
    height: 5vh;
    @media (max-width: 550px) {
            width: 55vw;
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