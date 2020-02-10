var fs = require('fs');
const csvtojson = require("csvtojson");
var mongoose = require('mongoose');
var db = mongoose.connection


exports.import = (req, res) => {
    csvtojson()
        .fromFile('./upload/name-1580840155009.csv')
        .then(csvData => {
            db.collection("fileData").insertMany(csvData)
            res.json({
                messege:"data saved",
                status:200
            })
        })
        .catch(() => {
            return res.status(HttpCodes.NOT_FOUND).json({
                error: 'Something went wrong please tyr again later.',
                errorCode: HttpCodes.NOT_FOUND
            })
        });
}