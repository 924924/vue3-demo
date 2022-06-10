import * as Constant from '@assets/constant'

/**
 * 通用过滤函数，返回value对应的label
 * @param {*} value 当前要过滤的值
 * @param {String} name 类型的名称
 */
 export const commonFilter = (value, name) => {
    let temp = Constant[name].filter(cu => { return value == cu.value })    
    return temp && temp.length > 0 ? temp[0].label : ''
}


import { CodeToText } from 'element-china-area-data';
export const fnArea = (provinceCode,cityCode,countyCode)=>{
    if(provinceCode && cityCode && countyCode){
        return CodeToText[provinceCode]+','+CodeToText[cityCode]+','+CodeToText[countyCode]
    }else{
        return CodeToText[provinceCode]+','+CodeToText[cityCode]
    }
   
}
/* 读取文件 */
export const readFile = (file) => {
    return new Promise(resolve => {
      let reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = ev => {
        resolve(ev.target.result)
      }
    })
  }

  export const fnTimerResult = (timer) =>{
    return new Date(timer).Format('yyyy-MM-dd ')+'23:59:59'
  }