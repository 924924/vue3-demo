<template>
    <table v-if="treeData.realName" class="tableObj">   
      <tr>
        <td :colspan="Array.isArray(treeData.children) ? treeData.children.length * 2 : 1" 
          :class="{parentLevel: Array.isArray(treeData.children) && treeData.children.length, extend: Array.isArray(treeData.children) && treeData.children.length && treeData.extend}"
        >
          <div :class="{node: true, hasMate: ((treeData.children && treeData.children[0].motherName) || (treeData.spouseListInfo && treeData.spouseListInfo.length>0))}">
            <div class="person" 
              :class="[Array.isArray(treeData.class) ? treeData.class : []]"
              :id="treeData.code"

              @click="$emit('click-node', treeData)"
            >
              <!-- 判断男女颜色gender =10 男的 20女的 -->
              <div :title="treeData.realName" :class="['avat',treeData.gender===10?(treeData.isDead && treeData.isDead===20?'isDead':''):(treeData.isDead && treeData.isDead===20?'isDead':'monthColor')]">
                {{treeData.realName.substring(0,1)}}               
              </div>
              <div class="name" :title="treeData.realName">{{treeData.realName}}</div>
            </div>
            <!-- 为了配偶右边显示的 -->
            <!-- <template v-if="treeData.children && treeData.children[0].motherName">
              <div :class="['person']"
              :id="treeData.children[0].motherInfo.code"
                
                @click="$emit('click-node', mate)"
              >
                <div :class="['avat',treeData.motherInfo && treeData.motherInfo.isDead===20?'isDead':'monthColor']">
                  {{treeData.children[0].motherName.substring(0,1)}}
                </div>
                <div class="name">{{treeData.children[0].motherName}}</div>
              </div>
            </template> -->
            <!-- 为了多个配偶判断 -->
            <template v-if="treeData.spouseListInfo && treeData.spouseListInfo.length>0">
              <div :class="['person']"
                v-for="(item,i) in treeData.spouseListInfo"
                :key="i"
                :id="item.code"                
                :title="item.realName"
                @click="$emit('click-node', item)"
              >             
              <!-- 判断男女颜色gender =10 男的 20女的  -->
                <div :class="['avat',item.gender===10?(item.isDead===20?'isDead':''):(item.isDead===20?'isDead':'monthColor')]">
                  {{item.realName.substring(0,1)}}               
                </div>
                <div class="name" :title="item.realName">{{item.realName}}</div>
              </div>
            </template>
            
          </div>
          <div class="extend_handle" v-if="Array.isArray(treeData.children) && treeData.children.length" @click="toggleExtend(treeData)"></div>
        </td>
      </tr>
      <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend">
        <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">
          <TreeChart   :json="children" @click-node="$emit('click-node', $event)"/>
        </td>
      </tr>
    </table>
</template>

<script>
export default {
  name: "TreeChart",
  props: ["json"],
  data() {
    return {
      treeData: {},
      codeObj:'',
      arrCopy:[],      
    }  
  },
  watch: {
    json: {
      handler: function(Props){       
        let extendKey = function(jsonData){                
          jsonData.extend = (jsonData.extend===void 0 ? true: !!jsonData.extend);
          if(Array.isArray(jsonData.children)){
            jsonData.children.forEach(c => {
              extendKey(c)
            })
          }
          return jsonData;
        }
        if(Props){  
          this.treeData = extendKey(Props);         
        }
      },
      immediate: true
    },
    
  },
  methods: {
    toggleExtend: function(treeData){  
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
    },
    fnReceive(item,obj,element){ 
      this.treeData = [] 
      let itemObj = [{...item}] // 树上的值
      let dataObj = {...obj}  // 左边筛选的值        
      this.treeData = {...itemObj[0]}      
      this.arrCopy.push({code:dataObj[0].code}) //为了上一个去除选中的样式     
      this.fnResult(dataObj) 
      document.getElementById(dataObj[0].code.toString()).scrollIntoView();     
      
    },
    // 为了搜索定位
    fnResult(dataObj){     
      if(this.arrCopy.length>1){
        // 把上一个样式清空
          let spliceArr = this.arrCopy[0].code.toString()
          let spliceObj =  document.getElementById(spliceArr)
          if(spliceObj){
            spliceObj.style.border = "none"
          }        
      }
      // 添加当前样式
      let current = dataObj[0].code.toString()     
      let currentObj =  document.getElementById(current)  
      if(currentObj){        
          currentObj.style.border = "2px solid #009933"
          // 去除第一个元素
          if(this.arrCopy.length>1){
            this.arrCopy.shift()
          }
      }
    }
  }
}
</script>

<style scoped lang="less">
table{
  border-collapse: separate!important;
  border-spacing: 0!important;
}
td{
  position: relative; 
  vertical-align: top;
  padding:0 0 50px 0;
  text-align: center; 
}
.extend_handle{
  position: absolute;
  left:50%;
  bottom:30px; 
  width:10px;
  height: 10px;
  padding:10px;
  transform: translate3d(-15px,0,0);
  cursor: pointer;
}
.extend_handle:before{
  content:""; 
  display: block; 
  width:100%;
  height: 100%;
  box-sizing: border-box; 
  border:2px solid;
  border-color:#ccc #ccc transparent transparent;
  transform: rotateZ(135deg);
  transform-origin: 50% 50% 0;
  transition: transform ease 300ms;
  }
.extend_handle:hover:before{
  border-color:#333 #333 transparent transparent;
}
.extend .extend_handle:before{
  transform: rotateZ(-45deg);
}

.extend::after{
  content: "";
  position: absolute;
  left:50%;
  bottom:15px;
  height:15px;
  border-left:2px solid #ccc;
  transform: translate3d(-1px,0,0)
}
.childLevel::before{
  content: "";
  position: absolute;
  left:50%;bottom:100%;
  height:15px;
  border-left:2px solid #ccc;
  transform: translate3d(-1px,0,0)
}
.childLevel::after{
  content: "";
  position: absolute;
  left:0;
  right:0;
  top:-15px;
  border-top:2px solid #ccc;
}
.childLevel:first-child:before, .childLevel:last-child:before{
  display: none;
}
.childLevel:first-child:after{
  left:50%;
  height:15px; 
  border:2px solid;
  border-color:#ccc transparent transparent #ccc;
  border-radius: 6px 0 0 0;
  transform: translate3d(1px,0,0)
}
.childLevel:last-child:after{
  right:50%;
  height:15px; 
  border:2px solid;
  border-color:#ccc #ccc transparent transparent;
  border-radius: 0 6px 0 0;
  transform: translate3d(-1px,0,0)
}
.childLevel:first-child.childLevel:last-child::after{
  left:auto;
  border-radius: 0;
  border-color:transparent #ccc transparent transparent;
  transform: translate3d(1px,0,0)
}

.node{
  position: relative; 
  display: inline-block;
  margin: 0 1px;
  box-sizing: border-box; 
  text-align: center;
}
.node .person{
  position: relative; 
  display: inline-block;
  z-index: 2;
  width:60px;
  overflow: hidden;
  padding:2px;
  margin:5px;
}
.node .person .avat{  
  line-height: 40px;
  background-color:#409eff;
  cursor: pointer;
  // border-radius:50%;
  color:white;
  display: block;
  width:40px;height: 40px;
  margin:auto;
  overflow:hidden; 
  border:1px solid #ccc;
  box-sizing: border-box;
}
.node .person .monthColor{
  background: #FF6666;
}
 /* 死亡 */
.node .person .isDead{
 background: gray;
}
.node .person .avat img{
  width:100%;
  height: 100%;
}
.node .person .name{
  height:20px;
  line-height: 20px;
  overflow: hidden;
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.node.hasMate::after{
  content: "";
  position: absolute;
  left:20px;
  right:20px;
  top:20px;
  border-top:2px solid #ccc;
  z-index: 1;
}
/* 横板 */
.landscape{
  transform:translate(-100%,0) rotate(-90deg);
  transform-origin: 100% 0;
}
.landscape .node{
  text-align: left;
  height: 80px;
  width:80px;
}
.landscape .person{
  position: relative;
  transform: rotate(90deg);
  padding-left: 450px;
  height:40px;
  top:40px;
  left: -10px;
}
.landscape .person .avat{
  position: absolute;
  left: 0;
}
.node .inClass{
  border:2px solid #009933 !important;
  box-sizing: border-box;
}
.landscape .person .name{
  height: 40px; 
  line-height: 40px;
}
.landscape .hasMate{
  position: relative;
}
.landscape .hasMate .person{
  position: absolute; 
}
.landscape .hasMate .person:first-child{
  left:auto; 
  right:-40px;
}
.landscape .hasMate .person:last-child{
  left: -40px;
  margin-left:0;
}

</style>
