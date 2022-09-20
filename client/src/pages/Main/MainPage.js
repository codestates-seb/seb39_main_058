import { useState, useEffect } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MainPage(){

    // 초기 위치 상태
    const [ initLoc, setInitLoc ] = useState({
        // 초기 위치: 구로구청(위도, 경도)
        center: { lat: 37.495025886857, lon: 126.88797161395 },
        isPanto: false,
    });

    // 현재 위치 상태
    const [ myLocation, setMyLocation ] = useState({
        center: { lat: null, lon: null },
        inPanto: false,
    });
    const [ guro, setGuro ] = useState(null);

    // 구로구 쓰레기통 API
    useEffect(() => {
        fetch(`https://api.odcloud.kr/api/15087773/v1/uddi:d9bdf233-ee41-46fe-8e08-bb74980f1155?page=1&perPage=292&serviceKey=JLEKtRKG4tdEBz4y7sC%2FevNdcgS0EiQ9jhzT%2Bt2pQyQdZyGO0DtMfVGTiosROFjB%2BgYobwwT2wuL5nIXoT4tQA%3D%3D`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.data);
            })
            .catch(err => err)
    }, []);
    
    const handleMyLocation = () => {
        // console.log('현재위치!');
        navigator.geolocation.getCurrentPosition(position => {
            setMyLocation({
                center: { lat: position.coords.latitude, lon: position.coords.longitude },
                isPanto: false,
            });
        })
    };

    return (
        <Map
            center={{ lat: initLoc.center.lat, lng: initLoc.center.lon }}
            style={{ width: "100%", height: "92vh" }}
            level={3}
        >
        <MapMarker position={ !myLocation.center.lat ? 
            { lat: initLoc.center.lat, lng: initLoc.center.lon } : 
            { lat: myLocation.center.lat, lng: myLocation.center.lon }
            }>
            <div style={{color:"#000"}}>{ !myLocation.center.lat ? '초기 위치입니다.' : '현재위치' }</div>
        </MapMarker>
        <MyLocationBtn onClick={handleMyLocation}>현위치</MyLocationBtn>
        </Map>
    )
}

export default MainPage;

const MyLocationBtn = styled.button`
    position: absolute;
    bottom: 0;
    left: 30%;
    z-index: 2;
    background-color: white;
    padding: 10px;
    :hover {
    color: white;
    background-color: gray;
    }
    cursor: pointer;
`;