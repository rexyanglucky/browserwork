(function (obj) {
    function myBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
        var isChrome = userAgent.toLowerCase().indexOf("chrome") > -1;
        var browserVersion = '';
        var browserType = 'IE';
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            browserVersion = fIEVersion;
            browserType = 'IE';
        }//isIE end
        if (isFF) {
            browserType = "FF";
            browserVersion = "FF";
        }
        if (isOpera) {
            browserType = "Opera";
            browserVersion = "Opera";
        }
        if (isChrome) {
            browserType = "Chrome";
            browserVersion = "Chrome";
        }
        return { browserType: browserType, browserVersion: browserVersion };
    }
    var binfo = myBrowser();
    if (binfo.browserType == "FF") {
            }
    if (binfo.browserType == "Opera") {
    }
    if (binfo.browserType == "Safari") {
    }
    if (binfo == "Chrome") {
    }
    if (binfo.browserType == "IE") {
        var b = binfo.browserVersion;
        if (b < 7) {
            // var sobj = document.createElement("script");
            // sobj.id = "pngscript";
            // sobj.src = "png.js";
            // sobj.type = "text/javascript";
            // if (document.getElementsByTagName) {
            //     document.getElementsByTagName("head")[0].appendChild(sobj);
            // }
            // else if (document.all) {
            //     document.all["head"][0].appendChild(sobj);
            // }
            // sobj.onload = function () {
            //     DD_belatedPNG.fix('.pop_bg_img');
            // }
        }
    }

    function removePop() {
        var pop = document.getElementById("browser_pop");
        pop.parentNode.removeChild(pop);
    }
    obj.onload = function () {
        //todo 低版本浏览器的判断标准
        if (binfo.browserType == "IE" && binfo.browserVersion < 9) {
        createPop();
        document.getElementById("btn_pop_close").onclick = removePop;
        document.getElementById("btn_pop_close1").onclick = removePop;

        if (binfo.browserType == "IE" && binfo.browserVersion < 7) {
                var layer = document.getElementById("pop_layer");
                layer.style.position = "absolute";
                var maxWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
                var maxHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
                layer.style.width = maxWidth;
                layer.style.height = maxHeight;

        }

     }


    }
    function createPop() {
        // var html = ' <div class="browser_pop " id="browser_pop">';
        var html = '<div class="pop_layer" id="pop_layer">';
        html += '</div>';
        html += '<div class="pop_bg_img pop">';
        html += '<div class="pop_warp">';
        html += '<div class="pop_bg_img close_bg " id="btn_pop_close">';
        html += '<i class="pop_bg_img close"></i>';
        html += '</div>';
        html += '<div class="pop_main">';
        html += '<div class="browser_low">';
        html += '<p>您的浏览器版本过低</p>';
        html += '<p>可能导致网站无法正常访问！</p>';
        html += '</div>';
        html += '<div class="browser_suggest">';
        html += '<div class="browser_item browser_item_IE">';
        html += '<a href="https://support.microsoft.com/zh-cn/products/internet-explorer#!/zh-cn/products/internet-explorer">';
        html += '<div class="pop_bg_img browser_icon "></div>';
        html += '<div class="browser_info">';
        html += '<p>IE9.0</p>';
        html += '<p>及以上版本</p>';
        html += '</div>';
        html += '</a>';
        html += '</div>';
        html += '<div class="browser_item browser_item_chrome">';
        html += '<a href="https://www.google.cn/intl/zh-CN/chrome/browser/desktop/?spm=a21bo.50862.20161112.d1.7ea3a888TMe4iC">';
        html += '<div class="pop_bg_img browser_icon "></div>';
        html += '<div class="browser_info">';
        html += '<p>谷歌浏览器</p>'; html += '<p>最新版本</p>';
        html += '</div>'; html += '</a>'; html += '</div>';
        html += '<div class="browser_item browser_item_firfox">';
        html += '<a href="http://www.firefox.com.cn/#desktop ">';
        html += '<div class="pop_bg_img browser_icon "></div>';
        html += '<div class="browser_info">';
        html += '<p>火狐浏览器</p>';
        html += '<p>最新版本</p>'; html += '</div>';
        html += '</a>'; html += '</div>';
        html += '</div>';
        html += '<div class="browser_jisu">';
        html += '<span class="browser_jisu_info">可支持在极速模式下使用的浏览器：</span>';
        html += '<a href="" class="browser_jisu_item sg"><i class="pop_bg_img browser_icon_js browser_sg"></i></a>';
        html += '<a href="" class="browser_jisu_item"><i class="pop_bg_img browser_icon_js browser_360"></i></a>';
        html += '<a href="" class="browser_jisu_item"><i class="pop_bg_img browser_icon_js browser_qq"></i></a>';
        html += '</div>';
        html += '<p class="btn_close "><span  id="btn_pop_close1">任性，继续访问</span></p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        // html += '</div>';
        var warp = document.createElement("div");
        warp.className = "browser_pop";
        warp.id = "browser_pop";
        warp.innerHTML = html;
        if (document.getElementsByTagName) {
            document.getElementsByTagName("body")[0].appendChild(warp);
        }
    }
})(window);