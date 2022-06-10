// 表单验证手机号
export const cellValidate = {
    trigger: 'blur',
    required: true,
    validator: (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入手机号码'))
        }
        let MobileRegex = /^[1]([3-9])[0-9]{9}$/;
        if (!MobileRegex.test(value)) {
            callback(new Error('手机号码格式不正确！'))
        } else {
            callback()
        }
    }
};
// 表单验证密码8-20位
export const passValidate = {
    trigger: 'blur',
    required: true,
    validator: (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入密码'))
        }
        let PassRegex = /^[0-9A-Za-z]{8,20}$/;
        if (!PassRegex.test(value)) {
            callback(new Error('密码格式不正确（8-20位数字和字母组合）'))
        } else {
            callback()
        }
    }
};

// 非空，必填
export const notEmpty = str => ({
    required: true,
    message: '请输入' + str,
    trigger: 'blur'
});

// 不能有空格
export const noBlank = () => ({
    pattern: /^(\S)+$/,
    message: '不能有空格',
    trigger: 'blur'
});
// type 1是chang 2 是blur
export const notEmptySelect = (str) => ({
    required: true,
    message: '请选择' + str,
    trigger: 'change'
})

// 滚动条及页面高度
export const getFullHeight = () => {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    return {
        scrollTop,
        windowHeight,
        scrollHeight
    }
};