<template>
    <div class="bg">
        <div :style="{'min-width':fnResult()}">
            <div class="breadcrumb">
                <menu-bread-crumb></menu-bread-crumb>
            </div>
            <div class="tuPu-box">
                <div class="bet" >
                    <el-select 
                        style="width:500px"                                   
                        v-model="my._id" 
                        placeholder="请输入进行筛选"  
                        @change="fnChange" 
                        filterable 
                        remote
                        reserve-keyword
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                            v-for="item in my.listData"
                                :key="item._id"
                                :label="item.realName"
                                :value="item._id"
                        >
                        </el-option>
                    </el-select>
                    <span class="reaction">注：<span class="col1">蓝色</span>代表男性；<span class="col2">红色</span>代表女性；<span class="col3">灰色</span>代表死亡</span>
                </div>
               <div class="zupu-title">{{my.name}}</div>
                <div class="scroll-box" id="scroll-box">
                     
                    <div class="treeBox">
                        <TreeChart ref="toParent" :json="my.data" :class="{landscape: my.landscape.length}" @click-node="clickNode" />
                    </div> 
                </div>
            </div>
            <!-- 详情对话框 -->
            <el-dialog
                :close-on-click-modal="false"
                :title="my.title"
                v-model="my.dialogVisible"
                width="80%"
                :before-close="handleClose">
                <div class="dialog-detail">
                    <div class="item" v-for="(item,i) in titleArr.list" :key="i" >
                        <b>{{item.name}}：</b>
                        <!-- 性别 -->
                    <span v-if="item.prop === 'gender'">{{$commonFilter(item.value,'gender')}}</span>
                        <!-- 人员状态 -->
                        <span v-else-if="item.prop === 'personnelStatus'">{{$commonFilter(item.value,'personnelStatus')}}</span>
                        <!-- 人员类型 -->
                        <span v-else-if="item.prop === 'personnelType'">{{$commonFilter(item.value,'personnelType')}}</span>
                        <!-- 出生和死亡时间 -->
                        <span v-else-if="item.prop === 'birthTime' || item.prop ==='deathTime'">{{item.value?item.value.substring(0,10):''}}</span>
                        <!-- 出生时辰 -->
                        <span v-else-if="item.prop === 'birthMoment'">{{$commonFilter(item.value,'birthMoment')}}</span>
                        <!-- 婚姻状态 -->
                        <span v-else-if="item.prop === 'maritalStatus'">{{$commonFilter(item.value,'maritalStatus')}}</span>
                        <!-- 是否在世 -->
                        <span v-else-if="item.prop === 'isDead'">{{$commonFilter(item.value,'isDead')}}</span>
                        <!-- 创建时间 -->
                        <span v-else-if="item.prop==='createTime'">{{new Date(item.value).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        <span v-else>{{item.value}}</span>
                    </div>
                </div>
            
                <div class="item">
                    <b>简介：</b>
                    <span>{{titleArr.desc}}</span>       
                </div>
            
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="handleClose">关闭</el-button>
                    </span>
                </template>
            </el-dialog>
        </div> 
    </div>
</template>
<script>
import {reactive,getCurrentInstance,ref} from 'vue'
import {genealogyStore} from '@store'
import menuBreadCrumb from '@c/menuGlobal/menuBreadCrumb/menuBreadCrumb'
import TreeChart from "../component/TreeChart";
export default{
    components: {       
        menuBreadCrumb,
        TreeChart
    },
    setup(){
        let {proxy} = getCurrentInstance();       
        const my = reactive({          
            listData:[],// 列表值
            treeList:[],// 图谱图
            ancestralHallId:proxy.$route.query.ancestralHallId,
            listDataCopy:[],
            code:'',           
            landscape: [],
            _id:'',
           dialogVisible:false,// 查看详情
           title:'',
           name:proxy.$route.query.name
        })
        const titleArr = reactive({
            list:[
                {name:'序号',prop:'code',},
                {name:'姓',prop:'surname'},
                {name:'名',prop:'name'},             
                {name:'性别',prop:'gender'},
                {name:'人员状态',prop:'personnelStatus'},
                {name:'人员类型',prop:'personnelType'},
                {name:'出生时间',prop:'birthTime'},
                {name:'死亡时间',prop:'deathTime'},
                {name:'出生时辰',prop:'birthMoment'},
                {name:'曾用名',prop:'usedName'},
                {name:'现居住地',prop:'currentAddress'},
                {name:'祖籍',prop:'address'},
                {name:'婚姻状态',prop:'maritalStatus'},
                {name:'父亲名字',prop:'fatherName'},
                {name:'父亲序号',prop:'fatherCode'},
                {name:'生父名字',prop:'naturalFatherName'},
                {name:'生父序号',prop:'naturalFatherCode'},
                {name:'母亲名字',prop:'motherName'},
                {name:'母亲序号',prop:'motherCode'},
                {name:'堂号',prop:'houseHold'},
                {name:'是否在世',prop:'isDead'},
                {name:'排行',prop:'ranking'},
                {name:'世代',prop:'generation'},
                {name:'联系方式1',prop:'contact1'},
                {name:'联系方式2',prop:'contact2'},
                {name:'联系方式3',prop:'contact3'},
                {name:'毕业院校',prop:'school'},
                {name:'学历',prop:'education'},
                {name:'工作单位',prop:'workUnit'},
                {name:'岗位',prop:'position'},
                {name:'血型',prop:'bloodType'},
                {name:'墓葬所在地',prop:'cemetery'},
                {name:'谥号',prop:'posthumousTitle'},
                {name:'星座',prop:'constellation'},
            ],
            desc:'' // 简介
        })
        // loading
        const loading = ref(false) 
        const remoteMethod = (query) =>{ 
            if (query !== '') {
                    loading.value = true;                   
                    setTimeout(() => {
                        loading.value = false;                        
                        my.listData = my.listDataCopy.filter(item => {
                            return item.realName.indexOf(query) > -1;
                        });                    
                    }, 200);                   
                    
            } else {
                    my.listData = [];
            }
                  
        }
        const fnChange = (item) =>{          
               let obj =  my.listData.filter(v=>{
                    return v._id === item
                })                
                let toParent = {...my.data,extend:true}
                let element = document.getElementById('scroll-box')
                // let toParent = {class: ["rootNode"],...my.treeList[0],extend:1} // 传过去的数据
                proxy.$refs.toParent.fnReceive(toParent,obj,element)
               
        }
        const fnGetList = () =>{
            genealogyStore.getTreeListByCode({ancestralHallId:my.ancestralHallId}).then(res=>{
                if(res && res.code === 10000){
                    my.listDataCopy = res.data.genealogy.list || [] // 为了筛选
                    my.listData = res.data.genealogy.list || []
                    my.treeList = res.data.genealogy.treeList || [] 
                    my.data = {class: ["rootNode"],...my.treeList[0]} // 传过去的数据 要注意
                    if(res.data.genealogy.list && res.data.genealogy.list.length>0){
                        // 为选中做判定
                        proxy.$nextTick(()=>{
                            my._id = res.data.genealogy.treeList[0]._id
                            let obj =  my.listData.filter(v=>{
                                return v._id === my._id
                            }) 
                            let element = document.getElementById('scroll-box')
                            proxy.$refs.toParent.fnReceive(my.data,obj,element)
                        })
                        
                    }else{
                       my._id = '' 
                    }                  
                    
                }else{
                    my.listData = []
                    my.treeList = []
                    proxy.$fnTip(3,res.msg)
                }
            })
        }
      
        const clickNode = (item) =>{  
            let param = {
                _id:item._id
            }
            genealogyStore.fetchInfo(param).then(res=>{
                let dataObj = genealogyStore.state.info || {}                              
                Object.keys(titleArr.list).map(v=>{                   
                    titleArr.list[v].value= dataObj[titleArr.list[v].prop]                    
                })
                titleArr.desc = dataObj.desc                             
                my.title = `${item.realName}`+'信息详情'
                my.dialogVisible = true                
               
            })
        }
        // 关闭详情
        const handleClose = () =>{
            my.dialogVisible = false
        }
        const fnResult = () =>{
           if(my.listData.length<=20){
                return '1366px'                
            }else if(my.listData.length>=21 && my.listData.length<=50){
                return '2000px'                
            }else if(my.listData.length>50 && my.listData.length<=100){
                return '4000px'
            }else if(my.listData.length>=101 && my.listData.length<=200){
                 return '7000px'
            }else if(my.listData.length>=201 && my.listData.length<=300){
                 return '10000px'
            }else if(my.listData.length>300 && my.listData.length<=400){
                 return '13000px'
            }else if(my.listData.length>400 && my.listData.length<=500){
                 return '16000px'
            }else if(my.listData.length>500 && my.listData.length<=600){
                 return '19000px'
            }else if(my.listData.length>600 && my.listData.length<=800){
                 return '22000px'
            }else if(my.listData.length>800 && my.listData.length<=1000){
                 return '25000px'
            }else if(my.listData.length>1000 && my.listData.length<=1200){
                return '28000px'
            }else if(my.listData.length>1200 && my.listData.length<=1400){
                return '32000px'
            }else{
                return '50000px'
            }
        //    return my.listData.length<=35?'1366px':(my.listData.length>35 && my.listData.length<=100?'2000px':'10000px')
        }
        fnGetList() // 获取数据
        
        return {
            my,           
            loading,
            remoteMethod,
            fnChange,
            clickNode,            
            handleClose,
            titleArr,
            fnResult
        }
    }
}
</script>
<style lang="less" scoped>
.bg{  
    background: #fff;
    padding:0 20px 20px;
    font-size: 14px;    
    height:100%;
    overflow: hidden;
    overflow-x: scroll;
    // max-height:900px;
    // min-height:500px;
    // min-width: 1366px;
    // max-width: 1650px;
    .breadcrumb{
        padding:20px 0 25px 0;
    }
    .tuPu-box{
        margin:10px 0;
        min-width: 1635px;
        // overflow-x: scroll;
      
    }
    
  .bet{
      line-height: 35px;
    //   display:flex;
    //   justify-content:flex-start;
      position:fixed;
      .reaction{
          margin-left:50px;         
      }
  }
  .col1{
      color:#409eff
  }
  .col2{
      color:#FF6666
  }
  .col3{
      color:gray
  }
  .dialog-detail{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width:100%;
      .item{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width:25%;
          line-height: 40px;
          font-size:14px;
      }
  }
  .scroll-box{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;      
        width:100%;      
        flex:1;
        overflow-y: scroll;
        height: 600px;         
    }
    .zupu-title{
        width:100%;
        text-align: center;
        height:50px;
        line-height: 50px;
        font-size: 25px;
        margin-top: 20px;
        padding-top:100px;
        font-weight: bold;
    }    
}
</style>
