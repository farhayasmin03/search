const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var fs = require('fs');
var path = require("path");
var multer = require('multer');
var storage = multer.diskStorage({

    destination: function (req, file, callback) {

        callback(null, './upload');
    },
    filename: function (req, file, callback) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        callback(null, file.fieldname + '-' + Date.now() + '.' + extension);
    }
});
var upload = multer({
    storage: storage
}).single('name');

router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.json({
            file: req.file
        })
    });
});

router.get('/search', function (req, res) {
    var serchText = rex.query.text

    fs.readFile('./upload/name-1580714534658.csv', function (err, data) {
        if (err) throw err;

        var serchData = data.indexOf(serchText) > -1 ? "has string" : "does not have string"
        res.status(200).json({
            success: true,
            message: serchData
        })

    });


})




module.exports = router;