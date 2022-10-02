import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiCancel } from "react-icons/gi";
import { AiOutlineSearch, AiFillLock } from "react-icons/ai";
import PageNation from '../../components/PageNation';
import { useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";

const tag = ["구로구","강남구","관악구","동작구","마포구"]

// 커뮤니티 게시판 리스트가 나오는 메인페이지
function CommunityPage() {

  const [tags, setTags] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState({
    select : "제목",
    content : ''
  })
  const [total, setTotal] = useState(null)

  const navigate = useNavigate();
  const location = useLocation();

  const page = useSelector(state => {
    return state.CurrentPageReducer.page
  })

  const userInfo = useSelector(state => state.LoginPageReducer.userinfo)

  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum?page=${page}&size=20`)
    .then(res => res.json())
    .then(res => {
      setData(res.data)
      setTotal(res.pageInfo.totalElements)
    })  
  },[page])

  const filteredTag = (value) => {
    if(tags.includes(value) === true || value === '태그를 선택해주세요'){
      setTags(tags)
    }else{
      setTags([...tags, value])
    }
  }

  const deleteTag = (value) => {
    let result = tags.filter(el => {
      return el !== value
    })

    setTags(result)
  }

  const handleSearchButton = () => {
    if(search.content !== undefined){
      fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/search?page=1&size=20&keyword=${search.content}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data)
        setTotal(res.pageInfo.totalElements)
      })
    }
    window.scrollTo(0, 0);
    setSearch({select : "제목" , content : ""})
  }

  return (
    <CommunityPageStyle>
      <div className='title_container'>
        <p>자유게시판</p>
      </div>
      <div className='btn'>
        <span className='list'>목록</span>
        <span className='write' onClick={() => {
          userInfo.accessToken ?
          navigate('/community/create') :
          navigate('/login', {state: {path:location.pathname}})
        }}>글쓰기</span>
      </div>
      <div className='select_container'>
        <select onChange={(e) => {
          filteredTag(e.target.value)
        }}>
          <option>태그를 선택해주세요</option>
          {tag.map(el => <option key={el} value={el}>{el} </option>)}
        </select>
        {tags.length === 0 ? <div className='notice'> 태그 기능을 이용해 검색을 할 수 있습니다.</div> : undefined}
        {tags.map(el => {
          return (
            <div className='tags_container' key={el}>
              <div className={el === "구로구" ? "red" :
                   el === "강남구" ? "orange" :
                   el === "관악구" ? "blue" :
                   el === "마포구" ? "green" :
                   el === "동작구" ? "violet" :
                   undefined}> {el}
              </div>
              <GiCancel className='cancle_icon' onClick={() => {
                deleteTag(el)
              }} />
            </div>)})}
      </div>
        <div className='tag_search'> <AiOutlineSearch/> 태그 검색</div>
        <div className='bords_container'>
          <div className='bords_list'>
            <span className='id'>번호</span>
            <span className='title'>제목</span>
            <span className='user'>글쓴이</span>
            <span className='updateAT'>등록일</span>
            <span className='tags'>태그</span>
            <span className='suggestion'>추천</span>
          </div>
          {data.map(el => {
            return(
              <div key={el.forumId} className="bords_list">
                <span className='id'>{el.forumId}</span>
                {el.secret === "OPEN" ?
                <span className='title pointer' onClick={() => {
                  navigate(`/community/${el.forumId}`)
                }}>{el.forumTitle}</span> :
                <span className='title pointer' onClick={() => {
                  userInfo.role === "ROLE_ADMIN" || (el.userName === userInfo.userName) ?
                  navigate(`/community/${el.forumId}`) :
                  alert("비밀글은 본인과 관리자 이외엔 확인할 수 없습니다.")
                }}><AiFillLock/> 비밀글입니다.</span>}
                <span className='user'>{el.userName}</span>
                <span className='updateAT'>{el.dateModified.slice(5,10)}</span>
                <span className='tags'>{el.tag.split(",")[0]} { el.tag.split(",").length > 1 ? `외${el.tag.split(",").length-1}` : undefined}</span>
                <span className='suggestion'>{el.forumLike}</span>
              </div>
            )
          })}
        </div>
        <div className='pagenation_container'>
          <PageNation data={data} total={total}/>
        </div>
        <div className='search_container'>
          <select onChange={e => setSearch({select : e.target.value, content : search.select})}>
            <option>제목</option>
            <option>내용</option>
            <option>작성자</option>
          </select>
          <input type='search' value={search.content} onChange={e => setSearch({select : search.select, content : e.target.value})} />
          <span onClick={() => {
            handleSearchButton()
            }}><FaSearch /></span>
        </div>
    </CommunityPageStyle>
  )
}

export default CommunityPage

const CommunityPageStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10vh;
  height: 140vh;
  user-select: none;

  .search_container{
    display: flex;
    margin-top: 3vh;

    select{
      width: 7vw;
      height: 4vh;
      font-size: 1.5vmin;
      text-align: center;
      border-right: 0px;
    }
  
    input{
      height: 4vh;
      width: 25vw;
      font-size: 2vmin;
    }

    span{
      width: 6vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      border-left: 0;
      font-size: 2.5vmin;
      cursor: pointer;
    }
  }


  .pagenation_container{
    margin-top: 2vh;
  }

  .title_container{
    width: 80vw;
    height: 7vh;
    display: flex;
    align-items: center;
    font-size: 7vmin;
    font-weight: bold;
    background: linear-gradient(-45deg, #037E99 65%, #065068 35%);
    color: white;
    border-radius: 20px;

    p{
      margin-left: 2vw;
      font-family: 'Nanum Pen Script', cursive;
    }
  }

  .btn{
    width: 80vw;
    height: 5vh;
    margin-top: 1vh;
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 1.6vmin;
    .write, .list{
      padding: 0.5rem 1rem;
      margin: 0 .5vw;
      border: 1px solid #413F42;
      box-shadow: 3px 1px 5px rgba(0,0,0,11);
      border-radius: 10px;
      text-decoration: none;
    }

    .list{
      background-color: white;
      :hover{
        font-weight: bold;
        font-size: 105%;
      }
    }

    .write{
      background-color: #413F42;
      color: white;
      :hover{
        font-weight: bold;
        font-size: 105%;
      }
    }
  }

  .select_container{
    background-color: #F5F5F5;
    width: 80vw;
    margin-top: 1vh;
    height: 8vh;
    display: flex;
    align-items: center;
    font-size: 2vmin;
    overflow-x: scroll;
    white-space: pre;

    select{
      margin: 0 1vw;
    }
  }

  .red{
    background-color: tomato;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .orange{
    background-color: orange;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .blue{
    background-color: skyblue;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .green{
    background-color: green;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .violet{
    background-color: violet;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .tag_search{
    border: 1px solid black;
    margin-top: 1vh ;
    padding: 0.5vh 1vw;
    font-size: 1.5vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    :hover{
      background-color: lightgray;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .tags_container{
    display: flex;
  }

  .cancle_icon{
    margin-top: -1vh;
    margin-left: -.5vw;
    font-size: 2vmin;
    cursor: pointer;
    color: darkgrey;
    :hover{
      color: black;
    }
  }

  .notice{
    font-size: 2vmin;
  }

  .bords_container{
    width: 80vw;
    height: 90vh; // 한페이지에 몇개 들어오나 봐서 수정할거임
    margin-top: 2vh;
    font-size: 1.5vmin;
    /* border: 3px solid red; */
  }

  .bords_list{
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2vh;
    padding: 1vh 0;

    .pointer{
      cursor: pointer;
    }
    
    span{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .id{
    width: 8%;
    text-align: center;
  }

  .title{
    width: 45%;
    margin: 0 3%;
  }

  .user{
    width: 15%;
  }

  .updateAT{
    width: 11%;
  }

  .tags{
    width: 13%;
    text-align: center;
  }

  .suggestion{
    width: 8%;
    text-align: center;
  }

`