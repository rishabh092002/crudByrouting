class CommonServices {
    constructor() { }

    generateImgName(name) {
        return new Promise(function (resolve, result) {
            let oldNameArr = name.split(".");
            let imgExt = oldNameArr.splice(-1).toString();
            const currentDate = new Date;
            let imgnewName = currentDate.getTime() + "_" + Math.round(Math.random(3333) * 1111) + "." + imgExt;
            resolve(imgnewName);
        });
    }

    uploadPath(image) {
        return new Promise(function (resolve, reject) {
            let uploadPath = __dirname + '/../public/images/' + image.name;
            image.mv(uploadPath, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = new CommonServices();