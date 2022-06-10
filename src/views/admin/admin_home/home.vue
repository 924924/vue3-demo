<template>
  <div class="adminHome">
    <div class="homeContent">
      <div class="breadcrumb">
        <menu-bread-crumb></menu-bread-crumb>
      </div>
      <div class="content-wrap">
        <!-- <h5> 姓氏名录</h5> -->
        <el-divider content-position="left" >姓氏名录</el-divider>
        <div :class="['box',my.surnameInfo.length>15?'scroll':'']" v-if="my.surnameInfo.length>0">  
          <div>
            <el-descriptions             
              direction="vertical"
              :column="5"
              border 
            >
              <el-descriptions-item  v-for="(item,i) in my.surnameInfo" :key="i" :label="item._id">族员{{item.count}}人</el-descriptions-item>
              </el-descriptions>
          </div>
        </div>
        <el-empty v-if="my.surnameInfo.length==0" description="暂无数据"></el-empty>
        
        <!-- <h5> 族谱名录</h5> -->
        <el-divider content-position="left" >族谱名录</el-divider>
       <div :class="['box',my.ancestralHallInfo.length>15?'scroll':'']" v-if="my.ancestralHallInfo.length>0">          
          <div>
            <el-descriptions              
              direction="vertical"
              :column="5"
              border 
            >
              <el-descriptions-item v-for="(item,i) in my.ancestralHallInfo" :key="i"  :label="item.name" :contentStyle="{'text-align': 'right'}">族员{{item.clanNum || 0}}人</el-descriptions-item>
              </el-descriptions>
          </div>
        </div>
         <el-empty v-if="my.ancestralHallInfo.length==0" description="暂无数据"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import menuBreadCrumb from "@/components/menuGlobal/menuBreadCrumb/menuBreadCrumb";
import { reactive, getCurrentInstance } from "vue";
import {genealogyStore} from '@store'
export default {
  name: "home",
  components: { menuBreadCrumb },
  setup() {
    let { proxy } = getCurrentInstance();
    const my = reactive({
      surnameInfo:[],
      ancestralHallInfo:[]

    })
    const fnGetDetail = () =>{
      genealogyStore.getStatisticsInfo().then(res=>{
        if(res && res.code===10000){
          my.surnameInfo = res.data.genealogy.surnameInfo || [] // 姓氏名录
          my.ancestralHallInfo = res.data.genealogy.ancestralHallInfo || [] // 族谱名录         
        }
      })
    }
    fnGetDetail()
    return {
        my
    }
  },
};
</script>

<style lang="less">
.adminHome {
  margin: 0 auto; 
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-button--primary {
    width: 100%;
  }
}
.homeContent {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: white;
}
.breadcrumb{
  padding:10px 0 ;
}
.content-wrap {
  padding:0 20px;
  .box {
    margin-bottom: 20px;   
  }
   h5 {
      font-size: 16px;
      margin:10px 0;
  }
  .scroll{
      height: 280px;
      overflow-y:scroll ;
  }
  
  
}

</style>
