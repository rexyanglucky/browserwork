var path = require("path");
var rurl = require("url");//路由模块
var fs = require("fs");//文件系统模块
var router = {
    area: "",
    controller: "Home",
    action: "Index",

    /**
     * 解析URL 获取area,controller,action
     */
    resolveUrl: function (url) {
        var originurl = rurl.parse(url).path;
        originurl = originurl.charAt(0) == "/" ? originurl.substring(1) : originurl;
        var arr = originurl.split('/');
        if (arr.length > 1) {
            area = arr.length > 2 ? arr[0] : "";
            controller = arr.length > 2 ? arr[1] : arr[0];
            action = arr.length > 2 ? arr[2] : arr[1];
        }
        else if (arr.length > 0) { controller = arr[0]; }
    },
    redirectAction: function (req, res) {

        //能否找到Action
        var findAction = false;
        var actionPath = path.resolve(__dirname, "..", area, "controller", controller + "controller") + ".js";
        if (fs.existsSync(path.join(actionPath))) {
            var controllerFile = require(actionPath);
            if (controllerFile.hasOwnProperty(action)) {
                findAction = true;
            }
        }

        if (findAction) {
            var actionMethod = controllerFile[action];
            actionMethod(req, res, this);
        }
        else {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset:utf-8' });
            res.end("controller or action not config");
        }

    }
}
module.exports = router;