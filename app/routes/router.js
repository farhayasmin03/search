const express = require('express');
var dbController = require('../controller/controller')
const router = express.Router();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const jsonParser = bodyParser.json();
var fs = require('fs');
const csvtojson = require("csvtojson");
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
    var serchText = req.query.text

    fs.readFile('./upload/name-1580840155009.csv', 'utf8', function (err, data) {
        if (err) throw err;



        var serchData = data.indexOf(serchText) > -1 ? "has string" : "does not have string"
        res.status(200).json({
            success: true,
            message: serchData
        })

    });


})

router.get('/importData',dbController.import)



module.exports = router;