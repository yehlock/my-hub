export class YouBike {
    constructor(sId = "", sZhName = "", page = 0, size = 0) {
        this.sId = sId;
        this.sZhName = sZhName;
        this.available = 0;
        this.availableSpace = 0;

        if (this.sZhName || this.sId) {
            this.loadData(page, size)
                .then((data) => {
                    if (data.length > 0) {
                        this.setData(data[0]);
                    } else {
                        console.error("No matching data found.");
                    }
                    if (typeof callback === "function") {
                        callback(this);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    setData(data) {
        console.log(data);
        this.sZhName = data.sna;
        this.available = data.sbi;
        this.availableSpace = data.bemp;
    }

    loadData(page, size) {
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

                    if (this.sId) {
                        result = data.filter(item => item.sno === this.sId);
                    } else if (this.sZhName) {
                        result = data.filter(item => item.sna === this.sZhName);
                    }

                    resolve(result);
                },
                error: (err) => {
                    console.error(err);
                    reject(err);
                }
            });
        });
    }
}