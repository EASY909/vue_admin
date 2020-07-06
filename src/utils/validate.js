/**
 * 
 * 过滤函数
 */
export function stripscript(s) {
    var pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（ ）&;—|{}【】‘；：”“'。，、？]"
    );
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, "");
    }
    return rs;
}
export function checkEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false;
}
export function checkPassword(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false;
}


export function validateCode(value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false;
}

export function timestampToTime(timestamp) {
    let now = new Date(timestamp * 1000);
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

export function debounce(fn, delay) {

    let timer = null;
 
    return function (...args) {
        console.log(this);
        let _self = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
    
            timer = null;
            fn.apply(_self, args);
        }, delay);
    };
}