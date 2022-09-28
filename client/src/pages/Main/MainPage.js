import { useState, useEffect } from "react";
import styled from "styled-components";
import { Map, CustomOverlayMap, MapMarker, Roadview } from "react-kakao-maps-sdk";
import { BiChevronDownCircle, BiCurrentLocation } from "react-icons/bi";
import Loading from "../../components/Loading";

function MainPage(){

    // 초기 위치 상태
    const [ initLoc, setInitLoc ] = useState({
        // 초기 위치: 구로구청(위도, 경도)
        center: { lat: 37.495025886857, lng: 126.88797161395 },
        isPanto: false,
    });

    // 현재 위치 상태
    const [ myLocation, setMyLocation ] = useState({
        center: { lat: null, lng: null },
        isPanto: false,
    });

    const [ roadView, setRoadView ] = useState(false);

    // 구로구 쓰레기통 상태
    const [ guro, setGuro ] = useState([]);

    const [loading, setLoading] = useState(false)
    const [click, setClick] = useState(false)
    const [hover, setHover] = useState({
        boolean : false ,
        state : ''
    })
    
    // 구로구 쓰레기통 API
    useEffect(() => {
        fetch(`https://api.odcloud.kr/api/15087773/v1/uddi:d9bdf233-ee41-46fe-8e08-bb74980f1155?page=1&perPage=292&serviceKey=JLEKtRKG4tdEBz4y7sC%2FevNdcgS0EiQ9jhzT%2Bt2pQyQdZyGO0DtMfVGTiosROFjB%2BgYobwwT2wuL5nIXoT4tQA%3D%3D`)
            .then(res => res.json())
            .then(data => {
                setGuro(data.data);
            })
            .catch(err => err)
    }, []);
    
    const handleMyLocation = () => {     
        navigator.geolocation.getCurrentPosition(position => {
            setMyLocation({
                center: { lat: position.coords.latitude, lng: position.coords.longitude },
                isPanto: false,
            });
            setInitLoc({
                center: { lat: position.coords.latitude, lng: position.coords.longitude },
                isPanto: false,
            });
            if(position.coords.latitude){
                setLoading(true)
                setClick(false)
            }
        })
    };

    const findNearestTrash = () => {
        setRoadView(!roadView);
    }

    return (
        <MainStyle>
        {click && !loading ? <Loading /> : undefined }
        {!roadView ? <Map
                center={{ lat: initLoc.center.lat, lng: initLoc.center.lng }}
                style={{ width: "100%", height: "92vh" }}
                    level={6}
                > 
                <CustomOverlayMap position={ !myLocation.center.lat ? 
                    { lat: initLoc.center.lat, lng: initLoc.center.lng } : 
                    { lat: myLocation.center.lat, lng: myLocation.center.lng }
                    }>
                    {myLocation.center.lat ?
                    <CustomInfoWindow>
                        <div className="my_location">{myLocation.center.lat ? "현재 위치" : undefined}</div>
                    </CustomInfoWindow> : undefined}
                </CustomOverlayMap>
                {guro.map((ele, idx) => (
                    <div key={idx}>
                    <MapMarker
                        position={{ lat: ele.위도, lng: ele.경도}}
                        image={{
                            src: ele.수거쓰레기종류 === "일반쓰레기" ? "/trash.png" : "/recycle.png",
                            size: {
                            width: 30,
                            height: 30
                            },
                        }}
                        onMouseOver={() => setHover({boolean: true , state : ele.소재지도로명주소})}
                        onMouseOut={() => setHover({boolean : false , state : ''})}
                        onClick={() => window.open(`https://map.kakao.com/link/to/${ele.소재지도로명주소},${ele.위도},${ele.경도}`)}
                    >
                    {ele.소재지도로명주소 === hover.state ? <div className="info">{hover.state}</div> : undefined}
                    </MapMarker>
                    </div>
                ))}
                <MyLocationBtn onClick={() => {
                    handleMyLocation()
                    setLoading(false)
                    setClick(true)
                }}>
                    <BiCurrentLocation className="location_icon"/>
                    <div className="guide">현위치 찾기</div>
                </MyLocationBtn>
                <NearestTrashBtn onClick={findNearestTrash} roadView={roadView}>{ !roadView ? '가까운 쓰레기통 찾기' : '지도보기'}</NearestTrashBtn>
            </Map> : 
            <>
                <Roadview 
                    position={{ lat: 33.450701, lng: 126.570667, radius: 50 }}
                    style={{width: "100%", height: "92vh" }}
                />
                <NearestTrashBtn onClick={findNearestTrash}>{ !roadView ? '가까운 쓰레기통 찾기' : '지도보기'}</NearestTrashBtn>
            </>
        }
        </MainStyle>
    )
}

export default MainPage;

const MainStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .info{
        white-space: pre;
        padding: 1vh 1vw;
        font-size: 2vmin;
        border: 3px solid #277BC0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const MyLocationBtn = styled.div`
    :hover {
        .location_icon{
            color: lightgray;
        }

        .guide{
            display: block;
            position: absolute;
            top: 10%;
            right: 9%;
            z-index: 1;
            background-color: #73777B;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1vh 1vw;
            font-size: 2vmin;
        }
    }

    .location_icon{
        background: white;
        cursor: pointer;
        z-index: 1;
        font-size: 3.5vmin;
        position: absolute;
        right: 3%;
        top: 10%;
        color: black;
        border-radius: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5vh 1vw;
        box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
                    0 2px 2px rgba(0,0,0,0.11), 
                    0 4px 4px rgba(0,0,0,0.11), 
                    0 6px 8px rgba(0,0,0,0.11),
                    0 8px 16px rgba(0,0,0,0.11);
    }

    .guide{
        display: none;
    }
`;

const NearestTrashBtn = styled.div`
    &:hover {
        font-weight: bold;
    }

    z-index: 1;
    cursor: pointer;
    font-size: 2vmin;
    position: absolute;
    left: 42vw;
    bottom: 3%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1vh 2vw;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
                0 2px 2px rgba(0,0,0,0.11), 
                0 4px 4px rgba(0,0,0,0.11), 
                0 6px 8px rgba(0,0,0,0.11),
                0 8px 16px rgba(0,0,0,0.11);
`;

const CustomInfoWindow = styled.div`
    user-select: none;

    .my_location{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 1vh 1.5vw;
        margin-top: -1vh;
        border: 3px solid #277BC0;
        cursor: default;
        font-size: 2.5vmin;
        border-radius: 10%;
    }
`;
