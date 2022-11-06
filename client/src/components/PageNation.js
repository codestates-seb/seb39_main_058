import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch } from 'react-redux'

function PageNation({data, total}) {

    const [num, setNum] = useState([]) // 아래 몇번째 화면으로 갈건지 보여주는 숫자들
    const [page, setPage] = useState(0) // 화살표 아이콘들 눌렀을때 숫자 몇부터 몇까지 보여줄지 가리기 위해
    const [click, setClick] = useState(1) // 특정숫자를 눌렀을때 그 숫자에 대한 스타일을 주기위해 만들어준 스테이트

    // count는 총 페이지의 수를 선언 해둔거임 

    const dispatch = useDispatch()

    let count = Math.ceil((total)/20)

    useEffect(() => {
        let arr = []

        for(let i = 1 ; i <= count ; i++){
            arr.push(i)
        }
        
        setNum(arr)
        
    },[data])
    
    const ChangePage = (data) => {
        if(data === "PLUS"){
            if(click + 5 < count){
                setClick(click + 5)
                dispatch({type : "CHANGE", payload : click + 5})
            }else{
                setClick(count)
                dispatch({type : "CHANGE", payload : count})
            }
        }
        if(data === "MINUS"){
            if(click - 5 > 0){
                setClick(click - 5)
                dispatch({type : "CHANGE", payload : click - 5})
            }else{
                setClick(1)
                dispatch({type : "CHANGE", payload : 1})
            }
        }
    }

  return (
    <PageNationStyle>
        <span> <BiFirstPage onClick={() => {
            setPage(0)
            setClick(1)
            dispatch({type : "CHANGE", payload : 1})
        }} /> </span>
        <span className='left'> < MdNavigateBefore onClick={() => {
            page > 0 ? setPage(page-5) : setPage(page)
            ChangePage("MINUS")
        }} /> </span>
        <div className='number_container'>
            {num.slice(page, page+5).map(el => {
                return (
                    <span key={el} className={click === el ? "click number" : "number"} onClick={() => {
                        setClick(el)
                        dispatch({type : "CHANGE", payload : el})
                    }} >{el}</span>
                )
            })}
        </div>
        <span className='right'> < MdNavigateNext onClick={() => {
            page + 5 < count ? setPage(page+5) : setPage(page)
            ChangePage("PLUS")
        }} /> </span>
        <span> <BiLastPage onClick={() => {
            count % 5 === 0 ? setPage(count - 5) :
            setPage(num.length - (num.length % 5))
            setClick(count)
            dispatch({type : "CHANGE", payload : count})
        }} /> </span>
    </PageNationStyle>
  )

}

export default PageNation

const PageNationStyle = styled.div`

    user-select: none;
    display: flex;

    .left{
        margin-right: 2vw;
    }
    
    .right{
        margin-left: 2vw;
    }

    span{
        cursor: pointer;
        font-size: 3vmin;
    }

    .number{
        padding: 0 1vw;
        margin: 0 0.7vw;
    }

    .number_container{
        width: 25vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .click{
        background-color: gray;
        color: white;
        border-radius: 20%;
    }

`