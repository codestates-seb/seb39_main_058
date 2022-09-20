import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Map, MapMarker, Roadview } from "react-kakao-maps-sdk";

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
        console.log('현재위치!');        
        navigator.geolocation.getCurrentPosition(position => {
            setInitLoc({
                center: { lat: position.coords.latitude, lng: position.coords.longitude },
                isPanto: false,
            });
            setMyLocation({
                center: { lat: position.coords.latitude, lng: position.coords.longitude },
                isPanto: false,
            });
        })
       
    };

    const findNearestTrash = () => {
        // console.log('가까운 쓰레기통 찾기!');
        setRoadView(!roadView);
    }


    return (
        
        !(roadView) ? <Map
                center={{ lat: initLoc.center.lat, lng: initLoc.center.lng }}
                style={{ width: "100%", height: "92vh" }}
                    level={3}
                > 
                <MapMarker position={ !myLocation.center.lat ? 
                    { lat: initLoc.center.lat, lng: initLoc.center.lng } : 
                    { lat: myLocation.center.lat, lng: myLocation.center.lng }
                    }>
                    <div style={{color:"#000"}}>{ !myLocation.center.lat ? '초기 위치입니다.' : '현재위치' }</div>
                </MapMarker>
                
                {guro.map((ele, idx) => (
                    // console.log(ele.위도, ele.경도)
                    <MapMarker 
                        key={idx}
                        position={!ele.위도 ? { lat: 37.48289633, lng: 126.8868871 } : { lat: ele.위도, lng: ele.경도}}
                        image={{
                            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                            size: {
                            width: 24,
                            height: 35
                            }, 
                        }}
                    />
                ))}
                <MyLocationBtn onClick={handleMyLocation}>현위치</MyLocationBtn>
                <NearestTrashBtn onClick={findNearestTrash} roadView={roadView}>{ !roadView ? '가까운 쓰레기통 찾기' : '지도보기'}</NearestTrashBtn>
            </Map> : 
            <>
                <Roadview 
                    position={{ lat: 33.450701, lng: 126.570667, radius: 50 }}
                    style={{width: "100%", height: "92vh" }}
                />
                <NearestTrashBtn onClick={findNearestTrash}>{ !roadView ? '가까운 쓰레기통 찾기' : '지도보기'}</NearestTrashBtn>
            </>
    )
}

export default MainPage;

const MyLocationBtn = styled.button`
    background: #38d9a9;
    &:hover {
    background: #63e6be;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    font-size: 20px;
    position: absolute;
    left: 20%;
    bottom: 50px;
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NearestTrashBtn = styled.div`
    background: #38d9a9;
    &:hover {
    background: #63e6be;
    }

    z-index: 5;
    cursor: pointer;
    width: 150px;
    height: 80px;
    font-size: 15px;
    position: absolute;
    left: 50%;
    bottom: 50px;
    color: white;
    border-radius: 10%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

