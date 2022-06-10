const crypto = require('crypto');

// Md5加密
function md5 (str) {
    const md5Hash = crypto.createHash("md5");
    md5Hash.update(str);
    const s = md5Hash.digest('hex');
    return s.toUpperCase();
}

function signWithMd5(obj, salt) {
    const keys = Object.keys(obj).sort();
    const s = [];
    s.push(salt);
    for (let k of keys) {
        const v = obj[k];
        // 不考虑空值的字段
        if (v !== undefined && v !== null) {
            s.push(k, v)
        } else {
            delete obj[k];
        }
    }
    s.push(salt);
    return md5(s.join(''));
}

export default {
    md5,
    signWithMd5
};
