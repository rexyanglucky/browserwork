var http = require('http');
var helloworld = "";
var url = require("url");//路由模块
var fs = require("fs");//文件系统模块
var p = require("path");//路径
var router=require("./router");//自定义路由
function main(){console.log(1);}
main();
var MIME = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "htc": "text/x-component"
}
for (var i = 0; i < 1024 * 10; i++) {
    helloworld += "a";
}
http.createServer(function (req, res) {
    if (req.url != "/favicon.ico") {
        var path = url.parse(req.url).path;
        if (path == "/") {
            path ="home/index";
        }
        var fpath = p.join(__dirname, path);
        fs.exists(fpath, function (r) {
            if (r) {
                var t = fpath.substring(fpath.lastIndexOf(".") + 1).toLowerCase();
                switch (t) {
                    case "html":
                    case "htc":
                        setHtml(fpath, req, res);
                        break;
                    default:
                        setFile(fpath, req, res);
                        break;
                }

            }
            else {
                router.resolveUrl(path);
                router.redirectAction(req,res);
            }

        });

    }
    else {
        res.writeHead(200);
        res.end("favicon.ico");
    }

}).listen(8001);
console.log("http://127.0.0.1:8001");
/**
 * 
 * @param {String} 文件路径 
 * @param {req} request 
 * @param {res} response 
 */
function setHtml(path, req, res) {
    fs.readFile(path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset:utf-8' });
            res.end("加载文件失败");
        }
        else {
            var t = path.substring(path.lastIndexOf(".") + 1);
            if (MIME.hasOwnProperty(t)) {
                res.writeHead(200, { 'Content-Type': MIME[t] });
                res.end(data.toString());
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/plain;charset:utf-8' });
                res.end("文件类型错误" + t);
            }
        }

    })
}
/**
 * 处理二进制文件
 * @param {String} path 
 * @param {req} req 
 * @param {res} res 
 */
function setFile(path, req, res) {
    var data = fs.readFileSync(path, "binary");
    var t = path.substring(path.lastIndexOf(".") + 1);
    if (MIME.hasOwnProperty(t)) {
        res.writeHead(200, { 'Content-Type': MIME[t] });
        res.end(data, "binary");
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain;charset:utf-8' });
        res.end("文件类型错误" + t);
    }
}

function sleep(sleepTime) {
    for (var start = +new Date; +new Date - start <= sleepTime;) { }
}
