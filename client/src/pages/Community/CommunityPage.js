import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiCancel } from "react-icons/gi";
import { AiOutlineSearch, AiFillLock } from "react-icons/ai";
import PageNation from '../../components/PageNation';
import { useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";

const tag = ["구로구","강남구","관악구","동작구","마포구"]

function CommunityPage() {

  const [tags, setTags] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState({
    select : "title",
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
    fetch(`https://sswitch.ga/community/forum?page=${page}&size=20`)
    .then(res => res.json())
    .then(res => {
      setData(res.data)
      setTotal(res.pageInfo.totalElements)
    })  
  },[page])

  const filteredTag = (value) => {

    if(value === "태그를 선택해주세요"){
      setTags([])
    }
    else{
      setTags([value])
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
      fetch(`https://sswitch.ga/community/forum/search/${search.select}?page=1&size=20&${search.select}=${search.content}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data)
        setTotal(res.pageInfo.totalElements)
      })
    }
    window.scrollTo(0, 0);
    setSearch({select : "title" , content : ""})
    document.getElementById("search").value = "title"
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      handleSearchButton()
    }
  }

  const handleTagSearch = () => {
    if(tags.length !== 0){
      fetch(`https://sswitch.ga/community/forum/search/tag?page=1&size=20&tag=${tags[0]}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data)
        setTotal(res.pageInfo.totalElements)
      })
      .catch(err => console.log(err))
      window.scrollTo(0, 0);
      setTags([])
      document.getElementById("select").value = "태그를 선택해주세요"
    }
    else{
      alert("태그를 선택해주세요.")
    }
  }

  return (
    <CommunityPageStyle>
      <div className='title_container'>
        <p>자유게시판</p>
      </div>
      <div className='btn'>
        <span className='list' onClick={() => window.location.reload()}>목록</span>
        <span className='write' onClick={() => {
          userInfo.accessToken ?
          navigate('/community/create') :
          navigate('/login', {state: {path:location.pathname}})
        }}>글쓰기</span>
      </div>
      <div className='select_container'>
        <select id='select' onChange={(e) => {
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
        <div className='tag_search' onClick={handleTagSearch}> <AiOutlineSearch/> 태그 검색</div>
        <div className='bords_container'>
          <div className='bords_list top'>
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
                <div className='title pointer'>
                  <span onClick={() => {
                    navigate(`/community/${el.forumId}`)
                  }}>{el.forumTitle}</span>
                  {el.commentCount ? <span>{`(${el.commentCount})`}</span> : undefined}
                </div> :
                <span className='title pointer secret' onClick={() => {
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
          <select id='search' onChange={e => setSearch({select : e.target.value, content : search.content})}>
            <option>title</option>
            <option>text</option>
            <option>username</option>
          </select>
          <input value={search.content} onKeyDown={handleEnter} type='search' onChange={e => setSearch({select : search.select, content : e.target.value})} />
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
      cursor: pointer;
      :hover{
        font-weight: bold;
        font-size: 105%;
      }
    }

    .write{
      background-color: #413F42;
      color: white;
      cursor: pointer;
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
    height: 90vh;
    margin-top: 2vh;
    font-size: 1.5vmin;
  }

  .bords_list{
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2vh;
    padding: 1vh 0;
    border-top: none;

    .pointer{
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }

    .secret{
      display: initial;
    }
    
    span{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .top{
    border-top: 1px solid black;
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