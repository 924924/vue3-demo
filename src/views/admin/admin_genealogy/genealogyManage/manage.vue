<template>
    <div class="bg">
        <div class="breadcrumb">
            <menu-bread-crumb></menu-bread-crumb>
        </div>
        <div class="select-box">
            <div class="select-item">
                <span>序号：</span>
                <el-input v-model="my.code" placeholder="请输入序号"></el-input>
            </div>
            <div class="select-item">
                <span>姓：</span>
                <el-input v-model="my.surname" placeholder="请输入姓"></el-input>
            </div>
            <div class="select-item">
                <span>名：</span>
                <el-input v-model="my.name" placeholder="请输入名"></el-input>
            </div>
            <div class="select-item">
                <span>堂号：</span>
                <el-input v-model="my.houseHold" placeholder="请输入堂号"></el-input>
            </div>
            <div class="select-item">
                <span>父亲姓名：</span>
                <el-input v-model="my.fatherName" placeholder="请输入父亲姓名"></el-input>
            </div>
            <div class="select-item">
                <span>父亲序号：</span>
                <el-input v-model="my.fatherCode" placeholder="请输入父亲序号"></el-input>
            </div>
            <div class="select-item">
                <span>祖籍地：</span>
                <el-input v-model="my.address" placeholder="请输入祖籍地"></el-input>
            </div>            
            <div class="select-item" style="margin-left:90px">
                <el-button type="primary" @click="fnSearch" plain>查 询</el-button>
                <el-button @click="fnReset" plain>重 置</el-button>
                <el-button type="success" @click="fnAddEdit('add')" plain>新 增</el-button>                
                
            </div>
        </div>
        <div class="other-btn">
            <el-button type="primary" @click="fnIsPublicity" plain>是否公示</el-button>
            <el-button type="primary" @click="fnDown" plain>下载模板</el-button>
            <el-upload
                    style="margin:0 10px"
                    class="upload-demo"
                    :http-request="fnExcel"
                    :show-file-list="false"
                    :file-list="my.fileList"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    action="#"                                       
                >              
                <el-button type="primary" plain>导入模板</el-button>
            </el-upload>
            <span>(注：导入excel表格时间必须都是文本格式。如：2020-10-10)</span></div>
        <div class="table-box">
            <el-table
                :data="my.tableData"
                style="width: 100%"
                border
                :header-cell-style="{
                background: '#F5F7FA',
                height: '40px',
                fontSize: '14px',
                color: 'rgb(96, 98, 102)'
                }"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="40"
                     fixed>
                </el-table-column>               

                <el-table-column
                :prop="item.prop"
                :label="item.name"
                v-for="(item,i) in my.tableTitle"
                :key="i"
                :width="item.width?item.width:'auto'"
                align="center"
                :fixed="item.fixed?true:false"
                >
                <template #default="scope">
                        <!-- 性别 -->
                        <span v-if="item.prop === 'gender'">{{$commonFilter(scope.row.gender,'gender')}}</span>
                        <!-- 人员状态 -->
                        <span v-else-if="item.prop === 'personnelStatus'">{{$commonFilter(scope.row.personnelStatus,'personnelStatus')}}</span>
                       <!-- 人员类型 -->
                        <span v-else-if="item.prop === 'personnelType'">{{$commonFilter(scope.row.personnelType,'personnelType')}}</span>
                        <!-- 出生和死亡时间 -->
                        <span v-else-if="item.prop === 'birthTime' || item.prop ==='deathTime'">{{scope.row[item.prop]?scope.row[item.prop].substring(0,10):''}}</span>
                        <!-- 出生时辰 -->
                        <span v-else-if="item.prop === 'birthMoment'">{{$commonFilter(scope.row.birthMoment,'birthMoment')}}</span>
                        <!-- 创建时间 -->
                        <span v-else-if="item.prop==='createTime'">{{new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        <span v-else>{{scope.row[item.prop]}}</span>

                </template>
                </el-table-column>
                 <el-table-column
                        fixed="right"
                        label="操作"
                        width="190"
                        align="center">
                        <template #default="scope">
                            <el-button type="text" size="small" @click="fnAddEdit('edit',scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="fnAddEdit('see',scope.row)">查看</el-button>
                            <el-button type="text" size="small" v-if="scope.row.isPublicity===20 && scope.row.ancestralHallListInfo.length>0" @click="fnShowDialog(scope.row)">宗族图谱</el-button>
                            <el-popconfirm
                                confirmButtonText='确定'
                                cancelButtonText='取消'
                                icon="el-icon-info"
                                iconColor="red"
                                title="确定删除当前数据吗？" @confirm="fnDeleteRow(scope.row)">
                                <template #reference>
                                    <el-button type="text" size="small" class="red">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                        </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <Pagination
                v-if="my.tableData.length > 0"
                :total="my.total"
                :pageSize="my.limit"
                :current-page="my.page"
                @fnHandleSize="fnHandleSize"
                @fnHandleCurrent="fnHandleCurrent"
            />
        </div>

        <el-dialog
           :close-on-click-modal="false"
            v-model="my.dialogVisible"
            title="是否公示"
            width="20%"
            :before-close="handleClose"
        >
            <div>
                <el-radio-group v-model="my.isPublicity">
                    <el-radio :label="10">否</el-radio>
                    <el-radio :label="20">是</el-radio>                    
                </el-radio-group>    
            </div> 
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">关闭</el-button>
                <el-button type="primary" @click="fnIsPublicComit"
                >确定</el-button
                >
            </span>
            </template>
        </el-dialog>
        <!-- 宗族图谱table -->
        <el-dialog
            :close-on-click-modal="false"
            v-model="my.showDialog"
            title="族谱名称"
            width="40%"
            :before-close="fnHallfoClose"
            >           
            <el-table
                :data="my.hallList"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="名称"
                >
                </el-table-column>
                <el-table-column  label="操作" width="120">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="fnSeeAtlas(scope.row)">
                            宗族图谱
                        </el-button>                        
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import {reactive,getCurrentInstance} from 'vue'
import Pagination from '@c/pagination'
import {genealogyStore} from '@store'
import menuBreadCrumb from '@c/menuGlobal/menuBreadCrumb/menuBreadCrumb'
import {readFile} from '@utils/filterConstant'
import xlsx from 'xlsx';
export default{
    components: {
        Pagination,
        menuBreadCrumb
    },
    setup(){
        let {proxy} = getCurrentInstance();
        const my = reactive({
            dialogVisible:false,
            isPublicity:20,// 是否公示
            ids:[], // 是否公示的集合
            limit:10,
            page:1,
            total:0,
            code:'', // 唯一序号
            surname:'',// 姓
            name:'',// 名
            houseHold:'',// 堂号
            fatherName:'',// 父亲姓名
            fatherCode:'',// 父亲唯一序号
            address:'',// 祖籍地
            tableData: [],
            tableTitle:[
                {name:'序号',prop:'code',width:130,fixed:true},
                {name:'姓',prop:'surname',},
                {name:'名',prop:'name'},
                {name:'性别',prop:'gender',width:80},               
                {name:'人员状态',prop:'personnelStatus',width:80},
                {name:'人员类型',prop:'personnelType',width:180},
                {name:'出生时间',prop:'birthTime',width:110},
                {name:'死亡时间',prop:'deathTime',width:110},
                {name:'出生时辰',prop:'birthMoment',width:160},
                {name:'联系方式1',prop:'contact1',width:110},
                {name:'父亲',prop:'fatherName',width:90},
                {name:'创建人',prop:'createUserName',width:90},
                {name:'创建时间',prop:'createTime',width:155},
            ],
            fileList:[],
            wb:{},  
            showDialog:false,// 宗祠的显示 
            hallList:[] ,// 宗祠列表         
        })
        const fnAddEdit = (type,item) =>{
            const params = {
                type:type,                    
            }
            if(item){
                params._id = item._id
            }
            let routeData = proxy.$router.resolve({
                name:'genealogyPerson',
                query:{
                    ...params
                }
            });
            window.open(routeData.href, '_blank');
        }
        // 获取列表
        const fnGetList = async (num) =>{            
            if(num){
                my.page = num
            }
            const param = {
                code:my.code,
                surname:my.surname,
                name:my.name,
                houseHold:my.houseHold,
                fatherName:my.fatherName,
                fatherCode:my.fatherCode,
                address:my.address,
                limit:my.limit,
                page:my.page
            }
            await genealogyStore.fetchList(param).then(()=>{
                my.tableData = genealogyStore.state.list || []
                my.total = genealogyStore.state.total || 0                
            })
        }
         // 分页
        const fnHandleSize = (val) =>{
            my.limit = val
            fnGetList(1)
        }
        // 当前页
        const fnHandleCurrent = (val) =>{
            my.page = val
            fnGetList(val)
        }

        
        // 删除
        const fnDeleteRow = (item) =>{
            genealogyStore.removeInfo({_id:item._id}).then(res=>{                    
                   proxy.$fnTip(1,"删除成功！");       
                   // 为了在删除判断最后一页的最后一条数据返回到前一页
                   const totalPage = Math.ceil((my.total - 1) / my.limit) // 总页数
                   my.page = my.page > totalPage ? totalPage : my.page
                   my.page = my.page < 1 ? 1 : my.page        
                   fnGetList() // 列表
                }).catch(() => {               
               })               
        }   
        // 重置
        const fnReset = () =>{                   
            my.limit = 10
            my.page = 1
            let arr = ['surname','code','name','houseHold','fatherName','fatherCode','address']
            arr.map(v=>{             
                my[v] = ''
            })
            fnGetList(1)
        }
        const fnSearch = () =>{
            fnGetList(1)
        }
        const handleSelectionChange = (val) =>{            
            let arr = []
            if(val && val.length>0){
                val.map(v=>{
                    arr.push(v._id)
                })
            }
            my.ids = arr           
        }
        // 是否公示
        const fnIsPublicity = () =>{
            if(my.ids.length===0){
                proxy.$fnTip(2,'请选择是否要公示的数据')
            }else{
                my.dialogVisible = true
            }
        }
        const handleClose = () =>{
            my.dialogVisible = false
            my.ids = []
            fnGetList()
        }

        // 是否公开
        const fnIsPublicComit = () =>{
                genealogyStore.setPublicity({
                    ids:my.ids,
                    isPublicity:my.isPublicity
                }).then(res=>{                   
                    if(res && res.code===10000){                       
                        proxy.$fnTip(1,res.msg)
                        handleClose()
                    }else{                       
                        proxy.$fnTip(3,res.msg)
                    }                   
                })
        }
        // 下载
        const fnDown = () =>{
           window.open(`https://zongpu-web-preview.oss-cn-beijing.aliyuncs.com/%E5%AE%97%E8%B0%B1%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx`) 
        }
       
        // 查看图谱图
        const fnExcel=(file)=>{
                let fileObj=file.file;
                const types = fileObj.name.split('.')[1];
                const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => {
                    return item === types
                });
                if (!fileType) {
                    proxy.$message.error('文件格式错误，请重新选择文件！')
                }

                file2Xce(fileObj).then(res=>{                   
                    genealogyStore.batchAdd({infoList:res[0].sheet}).then(data=>{
                        if(data && data.code===10000){
                              proxy.$fnTip(1,'导入成功')
                              fnGetList(1)
                          }else{
                            proxy.$fnTip(3,'导入失败')
                          }
                      })                    
                });
            };

            const file2Xce=(file)=>{
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const data = e.target.result
                        my.wb = xlsx.read(data, {
                            type: 'binary'
                        })
                        const result = []
                        my.wb.SheetNames.forEach((sheetName) => {
                            result.push({
                                sheetName: sheetName,
                                sheet: xlsx.utils.sheet_to_json(my.wb.Sheets[sheetName])
                            })
                        });
                        resolve(result)
                    };
                    reader.readAsBinaryString(file) // 传统input方法
                })
            };
        // 宗族图谱弹框
        const fnShowDialog = (item) =>{           
            my.hallList = item.ancestralHallListInfo
            my.showDialog = true                
        }
        const fnHallfoClose = () =>{
            my.showDialog = false
        }
        const fnSeeAtlas = (item) =>{            
            let routeData = proxy.$router.resolve({
                name:'genealogyAtlas',
                query:{
                    ancestralHallId:item._id,
                    name:item.name
                }
            });
            window.open(routeData.href, '_blank');
            
        }
        fnGetList(1) // 查询列表
        return {
            my,
            fnAddEdit,
            fnHandleSize,
            fnHandleCurrent,
            handleSelectionChange,
            fnReset,
            fnSearch,
            fnDeleteRow,
            fnIsPublicity,
            handleClose,
            fnIsPublicComit,
            fnDown,  
            fnSeeAtlas,
            fnExcel,
            fnShowDialog,
            fnHallfoClose
        }
    }
}
</script>
<style lang="less" scoped>
.bg{    
    background: #fff;
    padding:0 20px 20px;
    font-size: 14px;
    .breadcrumb{
        padding:20px 0 25px 0;
    }
    .select-box{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .select-item{
            display: flex;
            justify-content: flex-start;
            margin-bottom:15px;

            span{
                width:120px;
                line-height: 40px;
                text-align: right;
            }
        }
    }
    .table-box{
        margin:20px 0;
        .red{
            color:red
        }
    }
    .flex-b{
        display: flex;
        justify-content: space-between;
    }
    /deep/.el-upload-list{
        display: none;
    }
    .other-btn{
        display: flex;
        justify-content: flex-start;
        align-content: center;
        span{
            line-height: 38px;
        }
    }
}
</style>
