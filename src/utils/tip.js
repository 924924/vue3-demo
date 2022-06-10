/**
 * @desc 提示 type==1 成功  type ===2 警告  type==3 失败
 * */
export function fnTip(type, msg) {
    this.$message({
        message: msg,
        type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
    })
}
export default fnTip
