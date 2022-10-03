import styled from "styled-components";

function Guide({guide, setGuide}) {



  return (
    <GuideStyle>
      <div className="back" onClick={() => {
        guide < 3 ? setGuide(guide+=1) : setGuide(0)
      }}>
        {guide === 1 ?
        <div>
          쓰레기통의 위치를 알려주는 <br/><br/>
          <span className="sswitch">쓰위치</span>에 오신것을 환영합니다! <br/><br/>
          사용법에 대해 알아볼까요?
        </div> :
        guide === 2 ?
        <div className="container">
          <img className="map" src="/map.jpeg"/>
          <div className="content">
            <div className="flex">
              <img className="img" src="/location.jpeg" />
              <p>: 해당 버튼을 클릭하면 내 현재 위치를 알 수 있습니다.</p>
            </div>
            <div className="flex">
              <img className="img" src="/trash.png" />
              <p>: 일반 쓰레기통의 위치를 표시합니다.</p>
            </div>
            <div className="flex">
              <img className="img" src="/recycle.png" />
              <p>: 재활용 쓰레기통의 위치를 표시합니다.</p>
            </div>
          </div>
        </div> :
        guide === 3 ?
          <div className="container">
            <img className="map" src="/loadview.jpeg"/>
            <div className="content2">
              <div className="flex">
                <img className="img" src="/trash.png" />
                <img className="img" src="/recycle.png" />
                <p>: 해당 핀포인트를 클릭하면 해당 위치의 로드뷰를 볼 수 있습니다.</p>
              </div>
              <div className="flex">
                <img className="img" src="/search.jpeg" />
                <p>: 현재 보고 있는 장소까지의 길을 찾을 수 있게 카카오맵이 실행됩니다.</p>
              </div>
              <div className="flex">
                <img className="img" src="/reset.jpeg" />
                <p>: 현재 보고 있는 장소의 쓰레기통이 꽉찼을경우 눌러주세요!</p>
              </div>
                <p className="fast"> 신속하게 처리해드리겠습니다.</p>
            </div>
          </div>
        : undefined}

        <div className="notice">화면을 터치하면 다음으로 넘어갑니다.</div>
      </div>
    </GuideStyle>
  )
}


export default Guide

const GuideStyle = styled.div`

  color: white;
  font-size: 5vmin;

  *{
    white-space: pre-line;
  }

  .fast{
    margin-left: 20vw;
    color: red;
    font-weight: bold;
    margin-top: -1vh;
  }

  .flex{
    display: flex;
    align-items: center;
  }

  p{
    font-size: 3vmin;
  }

  .content{
    position: absolute;
    bottom: 12vh;
    left: 13vw;
  }

  .content2{
    position: absolute;
    bottom: 8vh;
    left: 5vw;
  }

  .img{
    width: 5vw;
    height: 4vh;
    padding-right: 1vw;
  }

  .container{
    display: flex;
    flex-direction: column;
  }

  .notice{
    position: fixed;
    bottom: 3vh;
    font-size: 3vmin;
  }

  .map{
    width: 50vw;
    height: 50vh;
    position: absolute;
    top: 5vh;
    right: 25vw;

    @media screen and (max-width: 500px){
        width: 100%;
        position: static;
        margin-top: -20vh;
    }
  }

  .sswitch{
    color: rgb(71,182,181);
    font-size: 150%;
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
    background-color: rgba(0, 0, 0, .7);
    z-index: 10;
    backdrop-filter: blur(5px);
  }

`