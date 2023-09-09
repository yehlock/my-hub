/*
    EstimatedTimeOfArrival(busId,station,direction)
    string city: 城市名(英文)
    string busId: 公車路線名稱(繁體中文)
    string station: 站名(繁體中文)
    int direction: 車站方向(0:去程,1:返程)
    return: EstimateTime
        (單位:秒, -1：尚未發車, -2：交管不停靠, -3：末班車已過, -4：今日未營運, -5：發生錯誤)
*/
function EstimatedTimeOfArrival(city,busId,station,direction) {
    $.ajax({
        url: `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/`+
             `${city}/${busId}?%24format=JSON`,
        type: "GET",
        dataType: "json",
        success: function (data) {
            const result = data.filter(item => item.StopName.Zh_tw === station)
                               .filter(item => item.RouteName.Zh_tw === busId)
                               .filter(item => item.Direction === direction);
            if(typeof(result[0].EstimateTime)==="number")
                return result[0].EstimateTime;
            return -5;
        },
        error: function (err) {
            console.log(err);
            return -5;
        }
    })
    return -5;
}

export {EstimatedTimeOfArrival}