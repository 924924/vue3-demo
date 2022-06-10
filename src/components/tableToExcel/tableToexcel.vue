<template>
    <div class="tableToExcel">
        <el-row>
            <el-col :span="24"><el-button size="small" type="primary" @click="exportExcel">导出为excel模板</el-button>
                <el-upload class="ml10 uploadBtn"
                           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                           :show-file-list="false"
                           :file-list="my.fileList"
                           action="#"  :http-request="inExcel">
                    <el-button size="small" type="success">导入excel模板</el-button>
                </el-upload></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><span>注：导入excel表格文件的正文部分必须都是文本格式。时间：2020-10-10,时间范围：2020-10-10,2021-10-10</span></el-col>
        </el-row>
    </div>
</template>

<script>
    import {reactive, getCurrentInstance} from 'vue';
    import XLSX from 'xlsx';
    export default {
        name: "tableToExcel",
        props:{
          exportData:Object,
        },
        setup() {
            let {proxy} = getCurrentInstance();
            let my = reactive({
                wb:{},
                fileList:[],
                xlscTitle:[],
                xlscList:[],

            });
            let exportData=proxy.exportData;
            let exportTiTle='上传资质'+exportData.name+'模板';
            // console.log(exportData);
            const exportExcel=()=>{
                let row1=[];
                console.log(exportData.fieldTable);
                for(let item of exportData.fieldTable){
                    row1.push(item.name);
                    if(item.unitInfo){
                        let unitTitle=item.name+'单位(';
                        for(let unit of item.unitInfo.data){
                            unitTitle+=unit.unit+',';
                        }
                        unitTitle=unitTitle.substring(0,unitTitle.length-1)+')';
                        row1.push(unitTitle);
                    }
                }
                let tableData = [
                    row1//导出表头
                ]; // 表格表头
                let ws = XLSX.utils.aoa_to_sheet(tableData);
                let wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, '上传资质模板'); // 工作簿名称
                XLSX.writeFile(wb, exportTiTle+'.xlsx'); // 保存的文件名
            };

            const inExcel=(file)=>{
                let fileObj=file.file;
                const types = fileObj.name.split('.')[1];
                const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => {
                    return item === types
                });
                if (!fileType) {
                    proxy.$message.error('文件格式错误，请重新选择文件！')
                }

                file2Xce(fileObj).then(res=>{
                    // console.log(res[0].sheet);
                    proxy.$emit("inExcel",res[0].sheet);
                });
            };

            const file2Xce=(file)=>{
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const data = e.target.result
                        my.wb = XLSX.read(data, {
                            type: 'binary'
                        })
                        const result = []
                        my.wb.SheetNames.forEach((sheetName) => {
                            result.push({
                                sheetName: sheetName,
                                sheet: XLSX.utils.sheet_to_json(my.wb.Sheets[sheetName])
                            })
                        });
                        resolve(result)
                    };
                    reader.readAsBinaryString(file) // 传统input方法
                })
            };

            return {
                my,
                exportExcel,
                inExcel,
                file2Xce,
            }
        }
    }
</script>

<style lang="less" scoped>
    .tableToExcel{
        .uploadBtn{
            display: inline-block;
        }
    }
</style>
