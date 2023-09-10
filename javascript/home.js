"use strict"
import * as BusTime from "./bus-time.js"
import * as YouBike from "./youbike.js"

var startUp = true;
setInterval(updateTimer, 1000);     // 1s
// setInterval(busTime("NewTaipei","937","未來城社區",0), 10000);   // 10s 

function updateTimer() { 
    let now = Date.now();
    let timespanSec = Math.floor(now / 1000);

    setClock();
    setDate();
    setBackground();
    setYouBikeView(timespanSec, startUp, 120);
    startUp = false;
}

function setBackground() { 
    const now = new Date();
    if(now.getHours() < 6 || now.getHours() >18 ){
        $('body').css('background-color', '#7272FF');
    }else{
        $('body').css('background-color', 'lightblue');
    }
 }

function setYouBikeView(time, startUp, update) { 
    if(time % update === 0 || startUp){
        setYouBike("1266","5",1) //捷運林口站
        setYouBike("1378","1",1) //三井 outlet
        setYouBike("1405","3",1) //林口行政中心
        setYouBike("500216001","6",2) //捷運林口站
        setYouBike("500216008","2",2) //三井 outlet
        setYouBike("500216009","4",2) //林口行政中心
    }
    for(let i = 1; i<=6; i++){
        setYouBikeTimer(update - time % update, i)
    }
 }

function setYouBikeTimer(second, index) 
{
    $("#ubikeUpTime" + index).text(`${second} 秒後更新`)
}

function setYouBike(id, index, version) {
    YouBike.getYouBikeData(id, "", 0, 1000, version)
    .then((youBikeObject) => {
        if(youBikeObject.zhName.includes('林口站')){
            ubikeColour(parseInt(youBikeObject.availableSpace), index)
        }else{
            ubikeColour(parseInt(youBikeObject.available), index)
        }
        $("#ubikeName" + index).text(youBikeObject.zhName);
        $("#ubikeAvlbe" + index).text(` ${youBikeObject.available} `);
        $("#ubikeSpace" + index).text(` ${youBikeObject.availableSpace} `);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
function ubikeColour(num, index) { 
    console.log(num);
    if(num >= 10 ){
        $("#ubike" + index).removeClass("bg-warning bg-danger");
        $("#ubike" + index).addClass("bg-success");
    } 
    else if(num <= 5 ){
        $("#ubike" + index).removeClass("bg-success bg-warning");
        $("#ubike" + index).addClass("bg-danger");
    } 
    else if(num < 10 ){
        $("#ubike" + index).removeClass("bg-success bg-danger");
        $("#ubike" + index).addClass("bg-warning");
    } 
 }

function setDate() { 
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const now = new Date();
    const month = now.toLocaleDateString("en-US",{ month: 'short' })
    const date = String(now.getDate()).padStart(2, '0');
    const day = now.getDay();
    $("#month").text(month);
    $("#date").text(date);
    $("#day").text(dayNames[day]);
 }

function setClock() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    $("#clock").text(`${hour}:${minute}`) //:${second}
}

async function busTime(city,busId,station,direction) {
    let busTime = BusTime.EstimatedTimeOfArrival(city,busId,station,direction);
    console.log(busTime);
    $(".bus-time").html(`${busTime} mins`);
}
