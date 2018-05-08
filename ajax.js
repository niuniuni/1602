function ajax(opt) {
    var def = {
            type: "get",
            async: true,
            data: null,
            success: null,
            error: null,
        },
        settings = extend({}, def, opt),
        data = typeof settings.data === "string" ? settings.data : format(settings.data);
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft", XMLHTTP);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                settings.success && settings.success(xhr.responText);
            } else {
                settings.error && settings.error();

            }
        }
    };
    if (settings.type === "get") {
        xhr.open(settings.type, settings.url + "?" + data, settings.async);
        xhr.send(null);
    } else {
        xhr.open(settings.type, settings.url, settings.async);
        xhr.setRequestHeader("Content-Type", "application/x-www.form-urlencoded,charset=utf-8");
        xhr.send(data);
    }
}

function extend(obj) {
    for (var i = 0; i < arguments.length; i++) {
        for (var k in obj) {
            arguments[0][k] = arguments[i][k];
        }
    }
    return arguments[0];
}

function format(obj) {
    arr = [];
    for (var i in obj) {
        arr.push(i + "=" + encodeURIComponent(obj[i]))
    }
    return arr.join("&");
}