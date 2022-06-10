import _ from 'lodash'

/**
 * 查找顶部面包屑数据
 * @param {*} path 路由路径
 * @param {*} menu 菜单数据
 */
export function findAdminBreadcrumb(path, menu) {
    let patharray = path.split('/');
    let array = [];
    // 二级菜单
    if (patharray.length === 3) {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].children.length) {
                let obj = _.find(menu[i].children, item => {
                    return item.value === path
                });
                if (obj && JSON.stringify(obj) !== '{}') {
                    array.push(menu[i].label);
                    array.push(obj.label);
                    break
                } else {
                    array.push('导航')
                }
            }
        }
    }
    // 三级菜单
    if (patharray.length === 4) {
        for (let i = 0; i < menu.length; i++) {
            for (let k = 0; k < menu[i].children.length; k++) {
                if (menu[i].children[k].children) {
                    let obj = _.find(menu[i].children[k].children, item => {
                        return item.value === path
                    });
                    if (obj && JSON.stringify(obj) !== '{}') {
                        array.push(menu[i].label);
                        array.push(menu[i].children[k].label);
                        array.push(obj.label);
                        break
                    } else {
                        array.push('导航')
                    }
                }
            }
        }
    }
    return array
}

// 时间格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//今天开始时间
export function getTodayStart() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date
}

//今天结束时间
export function getTodayEnd() {
    let date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date
}

export function diffTime(startTime, endTime) {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    const diff = endTime.getTime() - startTime.getTime();
    // 天
    let days = Math.floor(diff / (24 * 3600 * 1000));

    // 时
    let leave1 = diff % (24 * 3600 * 1000);
    let hours = Math.floor(leave1 / (3600 * 1000));

    // 分
    let leave2 = leave1 % (3600 * 1000);
    let minutes = Math.floor(leave2 / (60 * 1000));

    // 秒
    let leave3 = leave2 % (60 * 1000);
    let seconds = Math.round(leave3 / 1000);

    let timeObj = {
        day: "",
        hours: "",
        minutes: "",
        returnStr: "",
    };
    timeObj.returnStr = seconds > 0 ? seconds : 0;
    timeObj.minutes = minutes > 0 ? minutes : 0;
    timeObj.hours = hours > 0 ? hours : 0;
    timeObj.day = days > 0 ? days : 0;
    return timeObj.day + '天' + timeObj.hours + '时' + timeObj.minutes + '分' + timeObj.returnStr + '秒';
}
