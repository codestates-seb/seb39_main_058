import React from 'react'
import styled from "styled-components";

function Welcome() {
  return (
    <WelcomeStyle>
      <img src='https://media.istockphoto.com/photos/hand-holding-recycle-symbol-on-green-bokeh-background-eco-and-save-picture-id1023963786?k=20&m=1023963786&s=612x612&w=0&h=gnS5A4GBB8f7d3Wsg6d7wNcJXGSX_tXx4YCgHCDeOnY=' />
      <div>
        <div className='title'>
          <div className='first_title'>
            <span className='red'>쓰</span><span>레기통의</span>
          </div>
          <div className='second_title'>
            <span className='red'>위치</span><span>가 궁금해?</span>
          </div>
          <div className='third_title'>
            <span className='green'>쓰위치</span>
          </div>
        </div>
      </div>
    </WelcomeStyle>
  )
}

export default Welcome

const WelcomeStyle = styled.div`
  user-select: none;

  margin: -10px 0px 0px -10px;

  img{
    width: 100vw;
    height: 100vh;
    opacity: 0.6;
    position: absolute;
  }

  .title{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    height: 100vh;
    margin-left: 25%;


    div{
      margin: 3vmin 0px;
      z-index: 1;
      border-radius: 30px;
    }

    span{
      font-size: 9vmin;
      font-weight: bold;
    }
  }

  .red{
    color: red;
    font-family: 'Gugi', cursive;
  }

  .green{
    color: #277BC0;
    font-style: oblique;
    font-family: 'Gugi', cursive;
  }

  .first_title{
    animation: move_title 3s;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  .second_title{
    animation: move_title 5s;
    opacity: 0;
    animation-fill-mode: forwards;
    animation-delay: 0.5s;
  }

  .third_title{
    animation: move_title 1.5s;
    opacity: 0;
    animation-fill-mode: forwards;
    animation-delay: 1.5s;
  }

  @keyframes move_title {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`