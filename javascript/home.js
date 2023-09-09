"use strict"
import * as BusTime from "./bus-time.js"
import * as YouBike from "./youbike.js"


setInterval(updateTimer, 1000);     // 1s
// setInterval(busTime("NewTaipei","937","未來城社區",0), 10000);   // 10s 
function updateTimer() { 
    var time = Math.floor(Date.now() / 1000)

    Time();
    if(time % 30 === 0){
        setYouBike("1266","1")
        setYouBike("1378","2")
    }
    setYouBikeTimer(time % 30, index)
}

function setYouBikeTimer(second, index) 
{
    $("#ubikeUpTime" + index).text(`${second} 秒後更新`)
}

function setYouBike(id, index) {
    YouBike.getYouBikeData(id, "", 0, 500)
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