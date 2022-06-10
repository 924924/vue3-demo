const axios = require('axios');

/**
 * 根据当前时间生成流水号
 *
 * @param {String} LSH 流水号生成规则如 LSH....
 *
 * @returns {String} 成功返回数据格式
 */
function randomNumber(LSH) {
  const now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  return (
    LSH +
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 89 + 100).toString());
}

/**
 * 根据模板替换内容
 * @param template
 * @param values [{name:'##项目名称##',value: '123'}]
 */
function handleTemplate(template, values) {
  for (let value of values) {
    template = replaceAll(template, value.name, value.value, false);
  }
  return template
}

/**
 *  替换内容
 * @param reallyDo 被搜索的子字符串
 * @param replaceWith 用于替换的子字符串。
 * @param ignoreCase  忽略大小写; 大小写
 * @returns {void | string | never}
 */
function replaceAll(string, reallyDo, replaceWith, ignoreCase) {
  return string.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
}

/**
 * 隐藏手机号或者 姓名
 * @param type
 * @param value
 */
function hidePhoneOrNameOrEmail(type, value) {
  let regular = '';
  let content = '';
  switch (type) {
    case 'phone':
      regular = /^(\d{3})\d{7}(\d{1})$/;
      content = '$1*******$2';
      break;
    case 'name':
      //regular = name[0]+"***";
      //content = '*';
      value = value[0] + "**";
      break;
    case 'email':
      regular = /(.{1}).+(.{1}@.+)/g;
      content = '$1****$2';
      break;
  }
  return value.replace(regular, content);
}

/**
 * 精度计算 保留2 位小数
 * @param number1 第一个值
 * @param number2 第2个值
 * @param tag 计算符号
 * @param fix
 * @returns {number}
 */
function toCluNumber(number1 = 0, number2 = 0, tag = '+', fix = 2) {
  number1 = parseFloat(number1);
  number2 = parseFloat(number2);
  let number = {
    '+': number1 + number2,
    '-': number1 - number2,
    '*': number1 * number2,
    '/': number1 / number2
  }[tag];
  const pow = Math.pow(10, fix);
  return Math.round(number * pow) / pow
}


/**
 *精度 保留2 位小数
 * @param number 输入的值
 * @param fix
 * @returns {number}
 */
function toFixNumber(number = 0, fix = 2) {
  number = parseFloat(number);
  const pow = Math.pow(10, fix);
  return Math.round(number * pow) / pow
}

/**
 * 将有特殊符号的字符串在特殊符号前增加转义符
 * @param {Number} num 是否需要特殊处理相关字符串 0,1
 * @param {String} str 需处理的字符串
 */
function transferredStr(str, num) {
  if (num) {
    const chk = str.substring(0, 2);
    if (chk === 'WD' || chk === 'wd' || chk === 'Wd' || chk === 'wD') {
      str = str.replace(/(YjLy)|(yJLy)|(YJLY)|(yjly)|(Yjly)|(YJly)|(YJLy)|(yjLy)|(YjlY)|(YJlY)|(yJly)|(yJLY)|(yJlY)|(yjLY)|(yjlY)|(YjLY)/g, 'YJLE');
      str = str.replace(/(YJY)|(YJy)|(Yjy)|(YjY)|(yjy)|(yJy)|(yJY)|(yjY)/g, 'YJE');
    }
    const eds = str.substring(str.length - 2, str.length);
    if ((str.length > 2) &&
      (eds === '22' || eds === '23'
        || eds === '32' || eds === '33'
        || eds === '62' || eds === '63'
        || eds === '72' || eds === '73'
      )) {
      if (str.substring(str.length - 3, str.length - 2) !== '-') {
        str = str.substring(0, str.length - 2) + '-' + eds
      }
    }
    str = str.replace(/(ZRA)|(zra)|(ZRa)|(Zra)|(ZrA)|(zRA)|(zrA)|(zRa)/, 'ZA');
    str = str.replace(/(ZRB)|(zrb)|(ZRb)|(Zrb)|(ZrB)|(zRB)|(zrB)|(zRb)/, 'ZB');
    str = str.replace(/(ZRC)|(ZRc)|(Zrc)|(ZrC)|(zrc)|(zRc)|(zRC)|(zrC)|(ZR)|(Zr)|(zr)|(zR)/, 'ZC');
  }
  str = str.replace(/【/g, '[');
  str = str.replace(/】/g, ']');
  str = str.replace(/{/g, '{');
  str = str.replace(/}/g, '}');
  str = str.replace(/（/g, '(');
  str = str.replace(/）/g, ')');
  str = str.replace(/\*/g, '×');
  return str.replace(/[\\+\-\*\/\(\)\$\[\]\?\.\^\{\}\|\x\×\"\']/g, '\\$&');
}

/**
 * 生成由数字字母组成的唯一码
 * @param length 需要字符码的长度
 */
function getRandomCode(length) {
  if (length > 0) {
    const data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let str = "";
    for (let i = 0; i < length; i++) {
      const r = parseInt(Math.random() * 35);
      str += data[r];
    }
    return str;
  } else {
    return false;
  }
}

/**
 * 获取本地地址
 */
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

/**
 * 查询结果生成树
 * @param data
 * @returns {Promise<Array>}
 */
function toTree(data) {
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  let map = {};
  data.forEach(function (item) {
    map[item._id.toString()] = item;
  });
  let val = [];
  for (let item of data) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    let parent = map[item.parentId];
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent._doc.children || (parent._doc.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      item._doc.checkAll = false;
      item._doc.indeterminate = false;
      item._doc.checkedList = [];
      val.push(item);
    }
  }
  return val;
}

/**
 * 首字母大写
 * @param s
 * @returns {string | * | void}
 */
function upcaseFirst(s) {
  return s.replace(/(\w)/, (v) => {
    return v.toUpperCase()
  });
}

/**
 * 数组去重
 *
 * @param {array} arr 需去重的数组
 *
 * @returns {array}
 */
function uniqueArray(arr) {
  return [...new Set(arr)];
}

function SHA256(s) {
  var chrsz = 8;
  var hexcase = 0;

  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  function S(X, n) {
    return (X >>> n) | (X << (32 - n));
  }

  function R(X, n) {
    return (X >>> n);
  }

  function Ch(x, y, z) {
    return ((x & y) ^ ((~x) & z));
  }

  function Maj(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z));
  }

  function Sigma0256(x) {
    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
  }

  function Sigma1256(x) {
    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
  }

  function Gamma0256(x) {
    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
  }

  function Gamma1256(x) {
    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
  }

  function core_sha256(m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
    for (var i = 0; i < m.length; i += 16) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];
      for (var j = 0; j < 64; j++) {
        if (j < 16) W[j] = m[j + i];
        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }
      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }

  function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    }
    return bin;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
  }

  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

//生成唯一标识
function generateUUID() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function errLogToDingTalk(failContent) {
  axios({
    method: 'post',
    url: 'https://oapi.dingtalk.com/robot/send?access_token=b183d4b654904abbcf8b1463fa6ecc61bd8c7a9543f39175366164a0f2957ff8',
    data: {"msgtype": "text", "text": {"content": `企信在线：${failContent}`}},
  });
}

// 验证重复元素，有重复返回true；否则返回false
function isRepeat(arr) {
  const hash = {};
  for (let i in arr) {
    if (hash[arr[i]]) {
      return true;
    }
    // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
    hash[arr[i]] = true;
  }
  return false;
}

// 计算平均值
function avg(array) {
  //将array的长度赋给len
  const len = array.length;
  let sum = 0;
  //利用for循环遍历数组的内容，利用sum累加求和
  for (let i = 0; i < len; i++) {
    sum += array[i];
  }
  //返回数组的和与长度求平均值
  return sum / len;
}

/**
 * 根据计算规则计算最终得分
 *
 * @param {Number} powerScore 指标分
 * @param {String} type 越大越优 BIG_EXCELLENT 越小越优 SMALL_EXCELLENT
 * @param {Number} selfQualification 自己填的指标值
 * @param {Number} bigQualification 其他人填的最大的指标值
 * @param {Number} smallQualification 其他人填的最小的指标值
 *
 * @returns {Number}
 */
function calculationScore({powerScore=0,type='',selfQualification=0,bigQualification=0,smallQualification=0}){
  let score = 0;
  //越大越优
  if(bigQualification === smallQualification){
    score = powerScore
  }else{
    if (type === 'BIG_EXCELLENT') {
      const calculationScore = powerScore * (selfQualification - smallQualification) / (bigQualification - smallQualification);
      //如果自己就是最优值 则是自己就是最高分
      score = selfQualification === bigQualification ? powerScore : toFixNumber(calculationScore);
      //越小越优
    } else if (type === 'SMALL_EXCELLENT') {
      const calculationScore = powerScore * (bigQualification - selfQualification) / (bigQualification - smallQualification);
      //如果自己就是最优值 则是自己就是最高分
      score = selfQualification === smallQualification ? powerScore : toFixNumber(calculationScore);
    }
  }
  return score;
}


module.exports = {
  randomNumber, handleTemplate, hidePhoneOrNameOrEmail, toCluNumber,
  toFixNumber, transferredStr, getRandomCode, toTree, upcaseFirst,
  uniqueArray, SHA256, generateUUID, errLogToDingTalk, isRepeat,avg,
  calculationScore
};
