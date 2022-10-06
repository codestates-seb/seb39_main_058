import styled from "styled-components";

import React from 'react'

function Loading() {
  return (
    <LoadingStyle>
        <div className="container">
            <h1 data-back="Sswitch">Sswitch</h1>
        </div>
    </LoadingStyle>
  )
}

export default Loading

const LoadingStyle = styled.div`
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  user-select: none;
  z-index: 10;
  position: absolute;

 * {
  box-sizing:border-box;
}
  div {
    min-width:500px;
    /* background-color: white; */
    /* padding: 40px 60px; */
    /* border-radius: 10px;
    box-shadow: -2px 19px 59px 0px rgb(71,182,181); */
    h1 {
      font-size:8em;
      color :#A7D2CB;
      /* color: white; */
      position:relative;
      margin:0px;
      &:after {
        content:attr(data-back);
        width:0%;
        height:100%;
        background:rgb(71,182,181);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        position:absolute;
        left:0px;
        top:0px;
       animation: backMasking 4s infinite;
      }
    }
  }

@keyframes backMasking {
  0% {
    width:0%;
  }
  100% {
    width:100%;
  }
  
}

@-webkit-keyframes backMasking {
  0% {
    width:0%;
  }
  100% {
    width:100%;
  }
  
}


`