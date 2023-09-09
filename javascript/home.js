"use strict"
import * as BusTime from "./bus-time.js"
import * as YouBike from "./youbike.js"


setInterval(updateTimer, 1000);     // 1s
// setInterval(busTime("NewTaipei","937","未來城社區",0), 10000);   // 10s 
function updateTimer() { 
    var time = Math.floor(Date.now() / 1000)

    Time();
    if(time % 30 === 0){
        setYouBike("1266","5",1) //捷運林口站
        setYouBike("1378","1",1) //三井 outlet
        setYouBike("1405","3",1) //林口行政中心
        setYouBike("500216001","6",2) //捷運林口站
        setYouBike("500216008","2",2) //三井 outlet
        setYouBike("500216009","4",2) //林口行政中心
    }
    for(let i = 1; i<=6; i++){
        setYouBikeTimer(30 - time % 30, i)
    }
    
}

function setYouBikeTimer(second, index) 
{
    $("#ubikeUpTime" + index).text(`${second} 秒後更新`)
}

function setYouBike(id, index, version) {
    YouBike.getYouBikeData(id, "", 0, 1000, version)
    .then((youBikeObject) => {
        $("#ubikeName" + index).text(youBikeObject.zhName);
        $("#ubikeAvlbe" + index).text(`可借 ${youBikeObject.available} `);
        $("#ubikeSpace" + index).text(`可還 ${youBikeObject.availableSpace} `);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

function Time() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    $(".title").text(`${hour}:${minute}:${second}`)
}

async function busTime(city,busId,station,direction) {
    let busTime = BusTime.EstimatedTimeOfArrival(city,busId,station,direction);
    console.log(busTime);
    $(".bus-time").html(`${busTime} mins`);
}