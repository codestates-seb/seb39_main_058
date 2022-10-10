import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

function EventCreate({edit, setEdit, eventId}) {

  const [newEdit, setNewEdit] = useState({
    title : ``,
    content : '',
    img : undefined
  })

  const navigate = useNavigate();

  const userInfo = useSelector(state => state.LoginPageReducer.userinfo)

  const handleSubmit = (e) => {
    e.preventDefault();

    const editInfo = {
        "eventTitle": newEdit.title,
        "eventText": newEdit.content,
        "imagePath": newEdit.img
    }

    const postInfo = {
        "userId": userInfo.userId,
        "eventTitle": newEdit.title,
        "eventText": newEdit.content,
        "imagePath": newEdit.img
    }

    if(edit){
        fetch(`https://sswitch.ga/news/event/take/${eventId}`,{
            method : "PATCH",
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editInfo)
        })
        .then(() => {
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    if(!edit){
        fetch("https://sswitch.ga/news/event/take/create",{
            method : "POST",
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postInfo)
        })
        .then(() => {
            navigate('/news/event')
        })
        .catch(err => console.log(err))
    }
  }
  
  return (
    <Main>
        <div className="container">
            <BoardHeader>
                {edit ? <h1>이벤트 편집</h1> :
                <h1>이벤트 등록</h1>}
            </BoardHeader>
            
            <BoardWrite>
                <div className="writer-title">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="title">제목</label>
                        <textarea type="text" id="title" placeholder="제목을 입력해주세요." 
                            onChange={(e) => {
                                setNewEdit({title : e.target.value , content : newEdit.content, img : newEdit.img})
                            }}/>
                        <input placeholder="이미지 링크를 입력해주세요." id="title" type="text"
                        onChange={(e) => setNewEdit({title : newEdit.title , content : newEdit.content , img : e.target.value})}/>
                    </form>
                </div>
                <div className="writer-content">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="content"></label>
                        <textarea id="content" placeholder="내용을 입력해주세요." 
                            onChange={(e) => {
                                setNewEdit({title : newEdit.title , content : e.target.value, img : newEdit.img})
                            }}/>
                    </form>
                </div>
                <div className="writer-tags"></div>
            </BoardWrite>
            <ButtonWrapper>
                <button className="writer-submit" form="board"> 등록 </button>
                <button className="writer-cancel" onClick={() => {
                    !edit ? navigate("/news/event") :
                    setEdit(false)
                    }}> 취소 </button>
            </ButtonWrapper>
        </div>
    </Main>
  )
}

export default EventCreate

const Main = styled.main`
    width: 95%;
    height: 87vh;
    @media (max-width: 550px) {
        height: 115vh;
    }
    margin-top: 5vh;
`;

const BoardHeader = styled.div`

    width: 80vw;
    border-bottom: 3px solid black;
    margin-left: 4vw;

    @media screen and (max-width: 500px){
        margin-top: 8vh;
    }


    h1 {
        margin-top: 2rem;
        font-size: 7vmin;
        font-family: "Courier New", Courier, monospace;
        letter-spacing: 3px;
        font-family: 'Nanum Pen Script', cursive;
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .writer-title {
        width: 70vw;
        padding: 10px 20px;
        border-bottom: 2px solid lightgray;

        label, .label {
            margin: 20px;
            font-size: 2vmin;
            font-family: "Courier New", Courier, monospace;
            @media (max-width: 550px) {
                font-size: 20px;
            }
            width: 15vw;
        }

        #title {
            width: 60vw;
            height: 4vh;
            padding: 0 15px;
            font-size: 2vmin;
            margin: 1vh 2vw;
            border: 1px solid black;
            
        }
    }

    .writer-content {
        textarea{
            width: 65vw;
            height: 20vh;
            padding: 3px 5px;
            font-size: 2vmin;
            resize: none;
            margin-top: 3vh;
        }
    }
`;

const ButtonWrapper = styled.div`

    display: flex;
    justify-content: center;

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