import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.LoginPageReducer.userinfo)

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const randomIndex = Math.floor(Math.random() * random.length)

    useEffect(() => {
        fetch("http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/news/event?page=1&size=10")
        .then(res => res.json())
        .then(res => {
            setData(res.data)
            setTotalElements(res.pageInfo.totalElements)
        })
    },[])

    const scrollChange = () => {

        setTimeout(() => {
          fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/news/event?page=${page+1}&size=10`)
          .then(res => res.json())
          .then(res => {
            setData(data.concat(res.data))
          })
          .catch(err => console.log(err))
        }, 1000)
    
        setPage(page+1)
      }

    // console.log(data)

return (
    <EventStyle>
    <div className="flex">
        <h2 className={click === 1 ? "gray" : undefined} onClick={() => setClick(1)}>진행중인 이벤트</h2>
        <h2 className={click === 2 ? "gray" : undefined} onClick={() => setClick(2)}>쿠폰 입력</h2>
        {userInfo.role === "ROLE_ADMIN" ? <h2 className={click === 3 ? "gray" : undefined} onClick={() => setClick(3)}>편집</h2> : undefined}
    </div>
    {click === 1 ?
    <Slider {...settings}>
        <div>
        <img src="https://images.unsplash.com/photo-1556647034-7aa9a4ea7437?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" />
        <span>갓댕리트리버</span>
        </div>
        <div>
        <img src="https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" />
        <span>댕댕이는 최고야</span>
        </div>
        <div>
        <img src="https://images.unsplash.com/photo-1548439739-0cf616cef1cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdvbGRlbiUyMHJldHJpZXZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60" />
        <span>골댕이 헿</span>
        </div>
        <div>
        <img src="https://images.unsplash.com/photo-1612464321028-0e86f94b2c52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGdvbGRlbiUyMHJldHJpZXZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60" />
        <span>갓댕리트리버</span>
        </div>
        <div>
        <img src="https://images.unsplash.com/photo-1592769606534-fe78d27bf450?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvbGRlbiUyMHJldHJpZXZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60" />
        <span>댕댕이는 최고야</span>
        </div>
        <div>
        <img src="https://media.istockphoto.com/photos/cute-happy-dog-playing-with-a-stick-picture-id1184184060?b=1&k=20&m=1184184060&s=170667a&w=0&h=ajupbh27Z0yoSz1W2LmO9JJsZSgNfGgSj17aaNvo8Hc=" />
        <span>골댕이 헿</span>
        </div>
    </Slider> : click === 2 ? 
    <div className="coupon_container">
        <div className="logo">쓰위치</div>
        <div className="border">
            <div>
                <img src={random[randomIndex]} />
            </div>
            <div className="title">쿠폰 입력</div>
            <input type='text' placeholder="쿠폰번호 입력" />
            <div className="confirm">확인</div>
        </div>
    </div> : click === 3 ?
    <div className="edit_container">
        <div className="header">
            <div className="submit" onClick={() => navigate('/news/event/create')}>등록</div>
        </div>
        <div className="body">
        <InfiniteScroll
        dataLength={totalElements}
        next = {scrollChange}
        hasMore = {true}
        loader={data.length < totalElements ? <h2>Loading...</h2> : undefined}>
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

.edit_container{
    height: 86vh;

    .body{
        border: 1px solid red;
        height: 76vh;
    }

    .header{
        border: 1px solid red;
        display: flex;
        justify-content: end;
        align-items: center;
        height: 10vh;

        .submit{
            font-size: 3vmin;
            background-color: #002B5B;
            color: white;
            padding: .5vh 1vw;
            border: 0.2rem solid #395B64;
            cursor: pointer;
            margin-right: 6vw;
            width: 6vw;
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
        padding: 15vh 5vw;
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
}

.slick-list {  //슬라이드 스크린
    width: 100%;
    height: 85vh;
  }

  .slick-slide{ //슬라이더  컨텐츠
    cursor: pointer;
    height: 85vh;
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
    }

  }
  .slick-next {
    right: 5.5vw;
    z-index: 2;

    ::before{
        font-size: 5vmin;
    }
  }

  button{
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