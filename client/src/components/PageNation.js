import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch } from 'react-redux'

// 사실 더 좋은 코드도 있을거 같은데 이미 머리에 과부하 옴 ㅂㄷㅂㄷ 그래도 혼자 구현했으니 뿌듯

function PageNation({data}) { // 더미 props 받아온거임

    const [num, setNum] = useState([]) // 아래 몇번째 화면으로 갈건지 보여주는 숫자들
    const [page, setPage] = useState(0) // 화살표 아이콘들 눌렀을때 숫자 몇부터 몇까지 보여줄지 가리기 위해
    const [click, setClick] = useState(1) // 특정숫자를 눌렀을때 그 숫자에 대한 스타일을 주기위해 만들어준 스테이트

    // count는 총 페이지의 수를 선언 해둔거임 
    // 테스트해보려면 밑에줄 주석풀고 if문들 주석하면 돼요

    // let count = 16

    const dispatch = useDispatch()

    let count

    useEffect(() => {
        let arr = []

        // if(list !== undefined){
        //     count = Math.ceil((list.length)/20) // 한페이지에 20개씩 보여줄거기때문에
        // }

        if(data !== undefined){
            count = Math.ceil((data.length)/20)
        }

        for(let i = 1 ; i <= count+1 ; i++){
            arr.push(i)
        }
        
        setNum(arr)
        
    },[data])

  return (
    <PageNationStyle>
        <span> <BiFirstPage onClick={() => {
            setPage(0)
        }} /> </span>
        <span> < MdNavigateBefore onClick={() => {
            page > 0 ? setPage(page-5) : setPage(page)
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
        <span> < MdNavigateNext onClick={() => {
            page + 5 < count ? setPage(page+5) : setPage(page)
        }} /> </span>
        <span> <BiLastPage onClick={() => {
            setPage(num.length - (num.length % 5))
        }} /> </span>
    </PageNationStyle>
  )

}

export default PageNation

const PageNationStyle = styled.div`

    user-select: none;
    display: flex;

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