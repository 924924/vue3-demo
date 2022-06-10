<template>
    <div class="bg">
        <div class="breadcrumb">
            <menu-bread-crumb></menu-bread-crumb>
        </div>
        <div class="select-box">
            <div class="select-item">
                <span>族谱名称：</span>
                <el-input v-model="my.name" placeholder="请输入族谱"></el-input>
            </div>           
            <div class="select-item">
                <span>堂号：</span>
                <el-input v-model="my.houseHold" placeholder="请输入堂号"></el-input>
            </div>                    
            <div class="select-item" style="margin-left:90px">
                <el-button type="primary" @click="fnSearch" plain>查 询</el-button>
                <el-button @click="fnReset" plain>重 置</el-button>
                <el-button type="success" @click="fnAddEdit('add')" plain>新 增</el-button>                
                
            </div>
        </div>
       
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
            >  
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
                        <span v-if="item.prop === 'genealogyId'">{{fnName(scope.row.genealogyId)}}</span>
                        <!-- 创建时间 -->
                        <span v-else-if="item.prop==='createTime'">{{new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        <span v-else>{{scope.row[item.prop]}}</span>

                </template>
                </el-table-column>
                 <el-table-column
                        fixed="right"
                        label="操作"
                        width="220"
                        align="center">
                        <template #default="scope">
                            <el-button type="text" size="small" @click="fnAddEdit('edit',scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="fnAddEdit('see',scope.row)">详情</el-button>
                            <el-button type="text" size="small"  @click="fnSeeAtlas(scope.row)">宗族图谱</el-button>
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
  
    </div>
</template>
<script>
import {reactive,getCurrentInstance} from 'vue'
import Pagination from '@c/pagination'
import {ancestralHallStore} from '@store'
import menuBreadCrumb from '@c/menuGlobal/menuBreadCrumb/menuBreadCrumb'

export default{
    components: {
        Pagination,
        menuBreadCrumb
    },
    setup(){
        let {proxy} = getCurrentInstance();
        const my = reactive({             
            limit:10,
            page:1,
            total:0,
            name:'', // 唯一序号
            houseHold:'',// 堂号
            tableData: [
               {code:'111',createTime:'2012'}
            ],
            tableTitle:[
                {name:'序号',prop:'code',width:130,fixed:true},
                {name:'族谱名称',prop:'name',width:200,fixed:true},
                {name:'堂号',prop:'houseHold'},
                {name:'始祖名',prop:'ancestorsName'},               
                {name:'祖籍地',prop:'address'},
                {name:'现居住地',prop:'currentAddress'},
                {name:'族员',prop:'clanNum',width:110},
                {name:'管理员（族长）',prop:'genealogyId',width:150},               
                {name:'创建人',prop:'createUserName',width:90},
                {name:'创建时间',prop:'createTime',width:155},
            ],
            manageList:[],// 管理员
        })
        const fnAddEdit = (type,item) =>{
            const params = {
                type:type,                    
            }
            if(item){
                params._id = item._id
            }
            let routeData = proxy.$router.resolve({
                name:'pedigreeManageDddEdit',
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
                name:my.name,  
                houseHold:my.houseHold,            
                limit:my.limit,
                page:my.page
            }
            await ancestralHallStore.fetchList(param).then(()=>{
                my.tableData = ancestralHallStore.state.list || []
                my.total = ancestralHallStore.state.total || 0                
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
            ancestralHallStore.removeInfo({_id:item._id}).then(res=>{                    
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
            let arr = ['name','houseHold']
            arr.map(v=>{             
                my[v] = ''
            })
            fnGetList(1)
        }
        const fnSearch = () =>{
            fnGetList(1)
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
        // 管理员
        const fnManage = async() =>{            
            const param = {
                name:'',  
                houseHold:'',
                limit:100000,
                page:1
            }
            await ancestralHallStore.fetchList(param).then(()=>{
                my.manageList = ancestralHallStore.state.list || [] 
            })
        }
        // 管理员组长名称
        const fnName = (id) =>{            
            let obj = my.manageList.find(v=>{
                return v._id === id
            })    
            return obj?obj.name:''
        }
        const fnPub = async() =>{
            let res1 = await fnManage(); // 管理员
            let res2 = await  fnGetList(1) // 查询列表
        }
        fnPub() // 接口       
       
        return {
            my,
            fnAddEdit,
            fnHandleSize,
            fnHandleCurrent,          
            fnReset,
            fnSearch,
            fnDeleteRow,
            fnSeeAtlas, 
            fnName
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
   
   
    
}
</style>
