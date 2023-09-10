function getYouBikeData(sId = "", sZhName = "", page = 0, size = 0, version = 1) {
    return new Promise((resolve, reject) => {
        loadData(sId, sZhName, page, size, version)
            .then((data) => {
                if (data.length > 0) {
                    resolve(setData(data[0]));
                } else {
                    reject("No matching data found.");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function setData(data) {
    const stationName = ["三井Outlet", "三井Outlet 2.0", "行政園區", "行政園區 2.0", "林口站", "林口站 2.0" ]
    let name;
    switch (data.sna) {
        case "YouBike2.0_捷運林口站(1號出口)": // 捷運林口站
            name = stationName[5]
            break;
        case "三井Outlet": //三井 Outlet
            name = stationName[0]
            break;
        case "YouBike2.0_三井Outlet":
            name = stationName[1]
            break;
        case "新北市林口行政園區":
            name = stationName[2]
            break;
        case "YouBike2.0_新北市林口行政園區":
            name = stationName[3]
            break;
        case "捷運林口站(1號出口)":
            name = stationName[4]
            break;
        default:
            name = data.sna
            break;
    }
    return new YouBike(name, data.sbi, data.bemp, data.tot);
}

function YouBike(zhName, available, availableSpace, total) {
    this.zhName = zhName;
    this.available = String(available).padStart(2,'0');
    this.availableSpace = String(availableSpace).padStart(2,'0');
    this.total = total
}

function loadData(sId, sZhName, page, size, version) {
    return new Promise((resolve, reject) => {
        const v1UrlString = 'https://data.ntpc.gov.tw/api/datasets/71cd1490-a2df-4198-bef1-318479775e8a/json';
        const v2UrlString = 'https://data.ntpc.gov.tw//api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json'

        if (isNaN(page) || isNaN(size)) {
            reject("Invalid page or size parameters");
            return;
        }
        let urlString;
        if(version == 1){
            urlString = v1UrlString;
        }else{
            urlString = v2UrlString;
        }
        const urlParams = page > 0 ? `?page=${page}` : `?size=${size}`;

        $.ajax({
            url: urlString + urlParams,
            type: "GET",
            dataType: "json",
            success: (data) => {
                let result;

                if (sId) {
                    result = data.filter(item => item.sno === sId);
                } else if (sZhName) {
                    result = data.filter(item => item.sna === sZhName);
                }

                resolve(result);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

export { getYouBikeData };