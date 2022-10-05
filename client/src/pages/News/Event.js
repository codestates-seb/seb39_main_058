import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";
import EventCreate from "./EventCreate";

const random = [
    "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1538099130811-745e64318258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGN1dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1482066490729-6f26115b60dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGN1dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1555281614-8d58d2611325?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGN1dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1595000973199-41a00b0c4dc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGN1dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1529906920574-628dc1e49f5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTExfHxjdXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1609167839803-2563add6329e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGJlYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
]

const Event = () => {

    const [click, setClick] = useState(1)
    const [data, setData] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState(false)
    const [del, setDel] = useState(false)
    const [edit, setEdit] = useState(false)
    const [eventId, setEventId] = useState(null)
    const [modalInfo, setModalInfo] = useState(undefined)

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.LoginPageReducer.userinfo)
    
    const randomIndex = Math.floor(Math.random() * random.length)

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    useEffect(() => {
        fetch("https://sswitch.ga/news/event?page=1&size=10")
        .then(res => res.json())
        .then(res => {
            setData(res.data)
            setTotalElements(res.pageInfo.totalElements)
        })
    },[])

    const scrollChange = () => { // 관리자가 목록조회 할떄 무한스크롤
        setTimeout(() => {
          fetch(`https://sswitch.ga/news/event?page=${page+1}&size=10`)
          .then(res => res.json())
          .then(res => {
            setData(data.concat(res.data))
          })
          .catch(err => console.log(err))
        }, 1000)
    
        setPage(page+1)
      }

    const handleConfirmButton = () => {
        console.log('hi')
        //쿠폰
    }
    
    const handleDeletClick = () => {
        fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/news/event/take/${eventId}`,{
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }

return (
    <EventStyle modal={modal}>
    <div className="flex">
        <h2 className={click === 1 ? "gray" : undefined} onClick={() => setClick(1)}>진행중인 이벤트</h2>
        <h2 className={click === 2 ? "gray" : undefined} onClick={() => setClick(2)}>쿠폰 입력</h2>
        {userInfo.role === "ROLE_ADMIN" ? <h2 className={click === 3 ? "gray" : undefined} onClick={() => setClick(3)}>편집</h2> : undefined}
    </div>
    {modal ?
    <div className="back" onClick={() => setModal(false)}>
        <div className="view" onClick={e => e.stopPropagation()}>
            <div className="title">{modalInfo.title}</div>
            <div className="content">
                <div className="content_detail">{modalInfo.content}</div>
                <div className="close" onClick={() => setModal(false)}>닫기</div>
            </div>
        </div>
    </div> :
    undefined}
    {click === 1 ?
    <Slider {...settings}>
        {data.map(el => {
            return (
                <div key={el.eventId} onClick={() => {
                    setModal(true)
                    setModalInfo({title : el.eventTitle , content : el.eventText})
                    }}>
                    {el.imagePath ? <img src={el.imagePath} /> : undefined}
                    <span>{el.eventTitle}</span>
                </div>
            )
        })}
    </Slider> : click === 2 ? 
    <div className="coupon_container">
        <div className="logo">쓰위치</div>
        <div className="border">
            <div>
                <img src={random[randomIndex]} />
            </div>
            <div className="title">쿠폰 입력</div>
            <input type='text' placeholder="쿠폰번호 입력" />
            <div className="confirm" onClick={() => {
                userInfo.accessToken ? handleConfirmButton() : alert("로그인 후 이용 가능합니다.")
            }}>확인</div>
            <p>* 쿠폰 입력은 로그인 이후 사용 가능합니다.</p>
        </div>
    </div> : click === 3 ?
    <div className="edit_container">
        <div className="header">
            <div className="title">이벤트 목록 편집</div>
            <div className="submit" onClick={() => navigate('/news/event/create')}>등록</div>
        </div>
        <div className="body">
            {del ?
            <div className="back" onClick={() => setDel(false)}>
                <div className="modal_view" onClick={e => e.stopPropagation()}>
                    <div>삭제 하시겠습니까?</div>
                    <div className="final">
                        <div onClick={handleDeletClick}>확인</div>
                        <div onClick={() => setDel(false)}>취소</div>
                    </div>
                </div>
            </div> : undefined}
            {edit ?
            <div className="back" onClick={() => setEdit(false)}>
                <div className="view" onClick={e => e.stopPropagation()}>
                    <EventCreate edit={edit} setEdit={setEdit} eventId={eventId} />
                </div>
            </div> : undefined}
        <InfiniteScroll
        dataLength={totalElements}
        next = {scrollChange}
        hasMore = {true}
        loader={data.length < totalElements ? <h2>Loading...</h2> : undefined}>
            {data.map(el => {
                return (
                    <div className="flex" key={el.eventId}>
                        <li className="title">{el.eventTitle}</li>
                        <div className="edit" onClick={() => {
                            setEdit(true)
                            setEventId(el.eventId)
                        }}>수정</div>
                        <div className="delete" onClick={() => {
                            setDel(true)
                            setEventId(el.eventId)
                            }}>삭제</div>
                    </div>
                )
            })}
        </InfiniteScroll>
        </div>
    </div> : undefined}
    </EventStyle>
    );
}

export default Event

const EventStyle = styled.div`

    @media screen and (max-width: 500px){
        margin-top: 6vh;
    }

    .final{
        display: flex;
        div{
            margin: 0 2vw;
            background-color: lightgray;
            padding: 1vh 2vw;
            cursor: pointer;
            :hover{
                color: white;
                background-color: darkgray;
                font-weight: bold;
            }
        }
    }

    .modal_view{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        width: 70vw;
        height: 30vh;
        border-radius: 1rem;
        font-size: 6vmin;
    }

    .view{
        background-color: white;
        width: 80%;
        height: 85%;
        border-radius: 5%;

        .title{
            height: 25vh;
            display: flex;
            align-items: center;
            font-size: 7vmin;
            margin-left: 3vw;
            margin-right: 3vw;
            margin-bottom: 3vh;
            border-bottom: 0.3rem solid black;
            overflow-y: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
            word-break: keep-all;

            ::-webkit-scrollbar {
                display: none;
            }
        }

        .content{
            height: 56vh;
            white-space: pre-wrap;
            word-break: keep-all;
            font-size: 5vmin;
            margin-left: 3vw;
            margin-right: 3vw;

            .content_detail{
                height: 48vh;
                margin-bottom: 1vh;
                overflow-y: scroll;
                -ms-overflow-style: none;
                scrollbar-width: none;

                ::-webkit-scrollbar {
                    display: none;
                }
            }

            .close{
                height: 6vh;
                border: 5px solid orange;
                text-align: center;
                margin: 0 15vw;

                :hover{
                    background-color: lightgrey;
                    cursor: pointer;
                }
            }
        }
    }

    .back{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        backdrop-filter: blur(5px);
    }

.edit_container{
    height: 86vh;

    .body{
        height: 73vh;

        .flex{
            display: flex;
            align-items: center;
            border-bottom: 0.1rem solid black;
        }

        .title{
            width: 70%;
            font-size: 4vmin;
            margin: 3vh 2vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .edit, .delete{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2vmin;
            width: 10%;
            padding: 1vh 0;
            margin: 0 1vw;
            border: 0.2rem solid #395B64;
            background-color: lightgray;
        }

        .edit:hover{
            font-weight: bold;
            color: white;
            background-color: darkgray;
        }

        .delete:hover{
            font-weight: bold;
            color: white;
            background-color: #FF1E00;
        }

    }

    .header{
        display: flex;
        justify-content: end;
        align-items: center;
        height: 10vh;
        border-bottom: 0.2rem solid black;

        .title{
            font-size: 8vmin;
            width: 80%;
            font-family: 'Nanum Pen Script', cursive;
        }

        .submit{
            font-size: 3vmin;
            background-color: #002B5B;
            color: white;
            padding: .5vh 1vw;
            border: 0.2rem solid #395B64;
            cursor: pointer;
            margin-right: 6vw;
            width: 8vw;
            height: 4vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    
}


.coupon_container{
    display: flex;
    align-items: center;
    height: 86vh;
    flex-direction: column;

    .border{
        border: 5px solid rgb(71,182,181);
        padding: 13vh 5vw;
        position: absolute;
        top: 22vh;

        img{
            width: 330px;
            height: 170px;
            opacity: 1;
        }

        .title{
            font-size: 40px;
            text-align: center;
            margin-bottom: -5vh;
            margin-top: 3vh;
        }

        p{
            color: red;
            margin-top: 10vh;
            margin-bottom: -10vh;
            text-align: center;
        }
    }

    input{
        width: 300px;
        height: 50px;
        font-size: 20px;
        background-color: #EEEEEE;
        padding: 0 15px;
        margin-top: 10vh;
    }

    .confirm{
        background-color: #179FFB;
        color: white;
        width: 300px;
        height: 50px;
        padding: 0 17px;
        margin-top: 1vh;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .logo{
        font-family: 'Gugi', cursive;
        font-weight: bold;
        color: rgb(71,182,181);
        background-color: white;
        font-size: 80px;
        text-align: center;
        margin-top: 10vh;
        z-index: 2;
        padding: 0 20px;
        position: absolute;
        top: 8vh;
    }
}

.flex{
    display: flex;

    h2{
        flex-grow: 1;
        text-align: center;
        margin: 0;
        padding: 2vh 0;
        cursor: pointer;
        border-bottom: .2rem solid black;
    }

    .gray{
        background-color: lightgray;
    }
}

img{
    width: 100%;
    height: 80vh;
    z-index: 1;
    opacity: 0.6;
}

span{
    position: absolute;
    font-size: 6vmin;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 30vh;
    width: 98.5vw;
    white-space: pre-wrap;
    word-break: keep-all;
    text-align: center;
}

.slick-list {  //슬라이드 스크린
    width: 100%;
    height: 85vh;
  }

  .slick-slide{ //슬라이더  컨텐츠
    cursor: pointer;
    height: 80vh;
  }

  .slick-dots {  //슬라이드의 위치
    bottom: 20px;
    margin-top: 200px;
  }

  .slick-track {
    width: 100%;
  }

  .slick-prev{
    left: 3vw;
    z-index: 2;
    ::before{
        font-size: 5vmin;
        display: ${(props) => props.modal === true ? "none" : "block"};
    }

  }
  .slick-next {
    right: 5.5vw;
    z-index: 2;

    ::before{
        font-size: 5vmin;
        display: ${(props) => props.modal === true ? "none" : "block"};
    }
  }

  @media screen and (max-width: 500px){
    h2{
        margin-top: 10vh;
    }
    span{
        font-size: 12vmin;
    }
}

`