function getYouBikeData(sId = "", sZhName = "", page = 0, size = 0) {
    return new Promise((resolve, reject) => {
        loadData(sId, sZhName, page, size)
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

function loadData(sId, sZhName, page, size) {
    return new Promise((resolve, reject) => {
        const urlString = 'https://data.ntpc.gov.tw/api/datasets/71cd1490-a2df-4198-bef1-318479775e8a/json';

        if (isNaN(page) || isNaN(size)) {
            reject("Invalid page or size parameters");
            return;
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