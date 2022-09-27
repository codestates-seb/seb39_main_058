import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { BiRightArrow } from 'react-icons/bi';
import { FcLikePlaceholder, FcLike, FcLock } from 'react-icons/fc';
import CommunityAnswer from '../../components/CommunityAnswer/CommunityAnswer';

// 특정 질문을 눌렀을 때 나오는 세부 페이지
function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [ data, setData ] = useState([]);

  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ name, setName ] = useState("");
  const [ like, setLike ] = useState(0);
  const [ secret, setSecret ] = useState("");
  const [ tag, setTag ] = useState("");
  const [ dateCreated, setDateCreated ] = useState("");
    // 서버 날짜 기반 customizing
    const createdDate = new Date(dateCreated);
    const year = createdDate.getFullYear();
    const month = createdDate.getMonth() + 1;
    const date = createdDate.getDate();
    const hours = createdDate.getHours();
    const minutes = createdDate.getMinutes();
    const today = () => {
      if(createdDate.getDay() === 0) return '일요일'
      if(createdDate.getDay() === 1) return '월요일'
      if(createdDate.getDay() === 2) return '화요일'
      if(createdDate.getDay() === 3) return '수요일'
      if(createdDate.getDay() === 4) return '목요일'
      if(createdDate.getDay() === 5) return '금요일'
      if(createdDate.getDay() === 6) return '토요일'
    }

  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data) // CommunityAnswer 컴포넌트에 props로 전달해준 데이터!
        setTitle(data.data.forumTitle);
        setContent(data.data.forumText);
        setName(data.data.userName);
        setLike(data.data.forumLike);
        setSecret(data.data.secret);
        setTag(data.data.tag);
        setDateCreated(data.data.dateCreated);
      })
      .catch(err => console.log(err))
  },[]);
  
  const backToBoard = () => navigate("/community/forum");
  const addLike = () => (!like) ? setLike(like + 1) : setLike(0);

  return (
      <>
        <Main>
          <div className="header-wrapper">
            <div className="back-to-board" onClick={backToBoard}>자유게시판<BiRightArrow/></div>
            <Title>
              <div>{title}</div>
            </Title>
            <UserInfo>
              <img className='user-profile' src="/profile.png" alt='profile'/>
              <ul>
                <li>{!name ? "Anonymous" : name}</li>
                <li>{year}년 {month}월 {date}일 {today()}</li>
                <li>{hours}시 {minutes}분</li>
              </ul>
              <div className="secret">
                {/* secret === "SECRET"을 secret === "OPEN"으로 바꾸기 */}
                {secret === "SECRET" ? undefined : <span><FcLock className="lock-icon"/>해당 글은 비밀글입니다.</span>}
              </div>
              <div className="tag-container"> 
                {tag.split(',').map(item => <span key={item} className="tag">{item}</span>)}
              </div>
            </UserInfo>
          </div>

          <Content>
            <div className="content">
              {content.replace(/(?:\r\n|\r|\n)/g, '<br/>').split('<br/>').map(item => <p key={item}>{item}</p>)}
            </div>  
          </Content>

          <button className="like-btn" onClick={addLike}>
            {!like ? <FcLikePlaceholder className="like-btn"/> : <FcLike className="like-btn"/>}
          </button>
        </Main>
        
        <CommunityAnswer data={data}/>
      </>
  )
}

export default CommunityDetail;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95vw;
  height: 65vh;
  margin: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
  @media (max-width: 1150px) {
    width: 93vw;
  }
  @media (min-width: 550px) and (max-width: 900px) {
    width: 90vw;
  }

  @media (max-width: 550px) {
    width: 85vw;
    margin: 7px;
    padding-left: 2rem;
  }

  .header-wrapper {
    display: flex;
    flex-direction: column;

    .back-to-board {
      display: flex;
      
      color: rgb(70,183,182);
      :hover {
        color: rgb(56,217,169);
        cursor: pointer;
      }
    }

  }

  button {
    width: 65px;
    height: 5vh;
    
    .like-btn {
      width: 40px;
      height: 3vh;
    }
  }
`;

const Title = styled.h1`
  width: 70vw;
  margin: 30px;
  text-align: center;
  border-bottom: 1px solid lightgray;
  font-size: 3.5vmin;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin: 5px 1rem;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    @media (max-width: 550px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    height: 5vh;
    padding: 0;
    padding-right: 20px;
    border-right: 1px solid black;
    > li {
      font-size: 1.5vmin;
    }
  }

  .secret {
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 2vmin;
    font-weight: bold;
    border-right: 1px solid black;
    height: 5vh;
    @media (max-width: 450px) {
      padding: 0 0.5rem;
    }

    span > .lock-icon{
      padding: 0 10px;
    }
  }
  .tag-container{
    @media (max-width: 740px) {
      display: flex;
      flex-direction: column;
    }
    .tag {
      margin: 0.5rem;
      padding: 0.5rem;
      border-radius: 10px;
      color: white;
      background-color: rgb(56,217,169);
      font-family: 'Courier New', Courier, monospace;
      font-size: 1.5vmin;
      &:hover {
        background: rgb(71,182,181);
      }
      @media (max-width: 550px) {
        margin: 1px 0.5rem;
      }
    }
  }

`;

const Content = styled.div`
  margin: 30px;
  font-size: 2vmin;
`;