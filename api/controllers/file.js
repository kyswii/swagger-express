'use strict';

const wrap = require("co-express");
var fs = require("fs");
var path = require("path");
// var formidable = require("formidable");
var sd = require('silly-datetime');
var uuid = require('node-uuid');


module.exports.uploadFile = wrap(function* (req, res) {
    var file = req.swagger.params.file;

    try {
        var date = sd.format(new Date(), 'YYYYMM');
        var folderPath = path.resolve(__dirname, '../../file/upload/' + date.toString());

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        var newFileName = uuid.v4() + '-' + file.value.originalname;
        var dirPath = folderPath + '/' + newFileName;
        var webPath = '/file/upload/' + date.toString() + '/' + newFileName;

        var buffer = file.value.buffer;
       
        fs.writeFile(dirPath, buffer, function (err) {

            console.log('err.....', err);
            if (err) {
                res.json(err);
            } else {
                res.json(webPath);
            }
        });
    } catch (err) {
        res.json(err);
    }
});

module.exports.deleteFile = wrap(function* (req, res) {
    var path = req.swagger.params.path.value;

    try {
        var decPath = decodeURIComponent(path.substr(5, path.toString().length - 1));

        if (fs.existsSync(decPath)) {
            fs.unlinkSync(decPath);
        }

        res.json('Success');
    } catch (err) {
        res.json(err);
    }
});
