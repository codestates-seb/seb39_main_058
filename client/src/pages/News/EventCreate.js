import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

function EventCreate() {

  const [imgLink, setImgLink] = useState('')

  const navigate = useNavigate();

  const handleSubmit = () => {

  }
  
  return (
    <Main>
        <div className="container">
            <BoardHeader>
                <h1>이벤트 등록</h1>
            </BoardHeader>
            
            <BoardWrite>
                <div className="writer-title">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="title">제목</label>
                        <input type="text" id="title" placeholder="제목을 입력해주세요." 
                            onChange={(e) => {
                                // setWrite({title : e.target.value , content : write.content})
                            }}/>
                    </form>
                </div>
                <div className="writer-content">
                    <form id="board" onSubmit={handleSubmit}>
                        <label htmlFor="content"></label>
                        <textarea id="content" placeholder="내용을 입력해주세요." 
                            onChange={(e) => {
                                // setWrite({title : write.title , content : e.target.value})
                            }}/>
                    </form>
                </div>
                <div className="writer-tags"></div>
            </BoardWrite>
            <ButtonWrapper>
                <button className="writer-submit" form="board"> 등록 </button>
                <button className="writer-cancel" onClick={() => navigate()}> 취소 </button>
            </ButtonWrapper>
        </div>
        <div className="link_container">
          <div className="star">**</div>
          <div>이미지 링크</div>
          <input className="img_url" type="text" onChange={(e) => setImgLink(e.target.value)}/>
          <div className="star">**</div>
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

    display: flex;
    flex-direction: column;
    align-items: center;

    .link_container{
      display: flex;
      margin-top: 5vh;
      font-size: 3vmin;

      div{
        margin-right: 3vw;
      }

      .star{
        color: red;
        margin-right: -0.1vw;
      }
    }

    .img_url{
      width: 50vw;
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