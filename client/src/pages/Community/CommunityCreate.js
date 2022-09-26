import React, { useState, useEffect } from "react";
import { GiCheckedShield } from "react-icons/gi";
// import { CKEditor } from '@ckeditor/ckeditor5-react'; // 추후 리팩토링 시, CKEditor를 사용해봐야겠다.
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

// 'tag': REPORT, QNA, ASK, FREE_BOARD 
// const tags = ["REPORT", "QNA", "ASK", "FREE_BOARD"];
const tags = ["구로구", "강남구", "관악구", "동작구", "마포구"];

// 게시글 생성
function CommunityCreate() {

    const [ title, setTitle ] = useState("");
    const [ titleState, setTitleState ] = useState(false); // 제목 입력 상태여부

    const [ content, setContent ] = useState("");
    const [ contentState, setContentState ] = useState(false); // 내용 입력 상태여부

    const [ tag, setTag ] = useState([]);
    const [ clickTag, setClickTag ] = useState(false);

    const [ secret, setSecret ] = useState("OPEN");

    const navigate = useNavigate();
    
    // 'tag': REPORT, QNA, ASK, FREE_BOARD -> 한스님 local에만 O, 아직 ec2에는 X
    const boardPost = {
        "forumTitle" : title,
        "forumText" : content,
        "tag" : tag.join(','),
        "secret" : secret, 
    }

    // 게시판 내용 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!title) {
            setTitle(title);
            setTitleState(!titleState); 
        }
        
        if(!content) {
            setContent(content);
            setContentState(!contentState);
        }
        
        if(title && content) {
            fetch("http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(boardPost)
            })
                .then( res => {
                    res.status === 500 ? alert('error') : navigate("/community/forum")
                })
                .catch(error => console.log(error))

            setTitle("");
            setContent("");
            setClickTag(!clickTag);
            setTag([]);
        }   

    }

    // 특정 태그 선택
    const selectTag = (e) => {
        if(!clickTag) setClickTag(!clickTag);
        if(tags.includes(e.target.value)) {
           setTag([...tag, e.target.value])
        }
        if(tag.includes(e.target.value)) {
            setTag(tag)
        }
    }

    // 태그 삭제
    const deleteTag = (el) => {
        const filteredTag = tag.filter(tag => tag !== el)
        setTag(filteredTag);        
    }

    const handleSecret = (e) => {
        if(secret === "OPEN") {
            setSecret("SECRET");
        } else if (secret === "SECRET") {
            setSecret("OPEN");
        }
    };

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
            {/* 추후 리팩토링 시, CKEditor 라이브러리를 사용해서 추가해볼 예정 */}
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
                            onChange={ e => {
                                setContentState(false)
                                setContent(e.target.value)}}/>
                        {contentState ? <div style={{color: "red", paddingLeft: "2rem"}}>내용은 반드시 입력되어야 합니다.</div> : undefined}
                    </form>
                </div>
                <div className="writer-tags"></div>
            </BoardWrite>

            {/* 유저가 태그를 선택한 경우, 태그 담는 상자와 선택한 태그 만들기 */}
            { clickTag && <SelectedTag>
                <div className="selected-tags">
                    {clickTag && tag.map( el =>
                        <span className="tag" key={el}>{el} 
                            <span className="tag delete-tag" onClick={() => deleteTag(el)}>X</span>
                        </span>
                        )
                    }
                </div>                
            </SelectedTag> }

           
            <BoardTag>
                <select name="tags" onChange={ e => selectTag(e)}>
                    <option name="tags">지역 태그를 선택하세요</option>
                    {tags.map(tag => 
                        <option key={tag} name="tag" value={tag} >{tag}</option>
                    )}
                </select>
            </BoardTag> 
            <Secret>
                <input type="checkbox" name="secret" onClick={handleSecret}/>
                <label htmlFor="secret">비밀글</label>
            </Secret>
            
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
            resize: none;
            
        }
    }
`;

const BoardTag = styled.div`
    select {
        padding: 0.5rem 1rem;
    }
`;

const Secret = styled.div`
    margin-top: 10px;
    font-family: 'Courier New', Courier, monospace;
`

const SelectedTag = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;    
    border: 1px solid black;
    padding: 10px 0;
    width: 80vw;
    height: 5vh;
    @media (max-width: 550px) {
        width: 55vw;
        height: 7vh;
        font-size: 2vmin;
    }

    .tag {
        margin: 10px;
        padding: 0.5rem;
        border-radius: 10%;
        color: white;
        background-color: rgb(56,217,169);
        font-family: 'Courier New', Courier, monospace;
        &:hover {
            background: rgb(71,182,181);
        }

        .delete-tag {
            margin: 0;
            padding: 0;
            cursor: pointer;
        }
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
        font-size: 15px;
        cursor: pointer;
        &:hover {
            color: black;
            background-color: lightgray;
            border: 1px solid lightgray;
        }
    }
`;
