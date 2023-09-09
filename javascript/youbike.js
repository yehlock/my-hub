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
    return new YouBike(data.sna, data.sbi, data.bemp);
}

function YouBike(zhName, available, availableSpace) {
    this.zhName = zhName;
    this.available = available;
    this.availableSpace = availableSpace;
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