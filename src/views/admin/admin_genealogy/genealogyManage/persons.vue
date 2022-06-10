<template>
    <div class="bg">
        <div class="breadcrumb">
            <menu-bread-crumb></menu-bread-crumb>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormes" label-width="100px" class="demo-ruleForm">
            <div class="information-tit">基本信息</div>
            <div class="ruleForm-box">
            <el-form-item label="序号：" v-if="my.type && my.type!='add'">
                    <el-input :disabled="my.type && (my.type==='see' || my.type==='edit')"  v-model="ruleForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓：" prop="surname" >
                    <el-input :disabled="my.disabled" v-model="ruleForm.surname" clearable></el-input>
            </el-form-item>
            <el-form-item label="名：" prop="name" >
                    <el-input :disabled="my.disabled" v-model="ruleForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="gender" >
                <el-select :disabled="my.disabled" v-model="ruleForm.gender" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in arr.gender"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员状态：" prop="personnelStatus" >
                <el-select :disabled="my.disabled" v-model="ruleForm.personnelStatus" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in arr.personnelStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                </el-select>                   
            </el-form-item>
            <el-form-item label="人员类型："  prop='personnelType'>                    
                <el-select :disabled="my.disabled" v-model="ruleForm.personnelType" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in arr.personnelType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                </el-select>                    
            </el-form-item>
            <el-form-item label="出生时间："  >  
                <el-date-picker 
                        :disabled="my.disabled"
                        v-model="ruleForm.birthTime" 
                        type="date"
                        placeholder="请选择"
                        format="YYYY 年 MM 月 DD 日"                        
                        clearable
                >
                </el-date-picker>                  
                                   
            </el-form-item>
            <el-form-item label="死亡时间："  >
                <el-date-picker 
                        :disabled="my.disabled"
                        v-model="ruleForm.deathTime" 
                        type="date"
                        format="YYYY 年 MM 月 DD 日"                       
                        placeholder="请选择"
                        clearable
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="出生时辰："  >
                <el-select :disabled="my.disabled" v-model="ruleForm.birthMoment" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in arr.birthMoment"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="曾用名："  >
                    <el-input :disabled="my.disabled"  v-model="ruleForm.usedName" clearable></el-input>
            </el-form-item>
            <el-form-item label="别名："  >
                    <el-input :disabled="my.disabled"  v-model="ruleForm.alias" clearable></el-input>
            </el-form-item>
            <el-form-item label="字："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.styleName" clearable></el-input>
            </el-form-item>
            <el-form-item label="号："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.pseudonym" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式1："  >
                    <el-input :disabled="my.disabled" v-model="ruleForm.contact1" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式2："  >
                    <el-input :disabled="my.disabled" v-model="ruleForm.contact2" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式3："  >
                    <el-input :disabled="my.disabled" v-model="ruleForm.contact3" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否公示："  >
                <el-radio-group v-model="ruleForm.isPublicity" :disabled="my.disabled">
                        <el-radio :label="10">否</el-radio>
                        <el-radio :label="20">是</el-radio>                       
                </el-radio-group>
            </el-form-item>
            </div>
            <div class="information-tit">宗族信息</div>
            <div class="ruleForm-box" >
                <el-form-item label="族谱名称：" prop="ancestralHallList" style="width:635px;">   
                        <div class="name-box">
                                <!-- <el-select v-model="ruleForm.ancestralHallList" multiple placeholder="请选择" :disabled="my.disabled" >
                                        <el-option
                                        v-for="item in []"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>  -->
                                <el-select   
                                        style="width:520px"   
                                        multiple  
                                        :disabled="my.disabled" 
                                        v-model="ruleForm.ancestralHallList" 
                                        placeholder="请输入搜索或者点击右边添加族谱"  
                                        @change="fnChangeHall" 
                                        filterable 
                                        remote
                                        reserve-keyword
                                        :remote-method="remoteMethodHall"
                                        :loading="loading">
                                        <el-option
                                                v-for="item in my.hallList"
                                                :key="`hall-${item.value}`"
                                                :label="item.name"
                                                :value="item._id"
                                        >
                                        </el-option>
                                </el-select>
                                <i v-if="my.type && my.type==='see'?false:true" @click="fnAddHallShow"  class="iconfont el-icon-plus addIcon"></i>       
                        </div>            
                </el-form-item>  
            <el-form-item label="父系：" required>
                <div class="father-box">
                        <el-form-item prop="fatherSource" :style="{'width':ruleForm.fatherSource==20?'80px':'auto','margin-right':'2px'}">                                
                                <el-select :disabled="my.disabled" v-model="ruleForm.fatherSource" placeholder="请选择" >
                                        <el-option
                                                v-for="item in arr.fatherMotherStatus"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                >
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item prop="fatherCode" class="father-long" v-if="ruleForm.fatherSource==20">
                                <!-- <el-select 
                                        v-if="ruleForm.fatherSource==20 || ruleForm.fatherSource==''" 
                                        :disabled="(my.type==='edit' || my.type==='add') && (!ruleForm.fatherSource) || my.disabled" 
                                        v-model="ruleForm.fatherId" 
                                        placeholder="请选择"  
                                        @change="fnChangeFatherCode(1,'fatherId')"
                                >
                                        <el-option
                                                v-for="item in my.tableData.filter(item => item.value!=my._id)"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                </el-select>     
                        -->
                                <el-select                                    
                                       v-if="ruleForm.fatherSource==20 || ruleForm.fatherSource==''" 
                                        :disabled="(my.type==='edit' || my.type==='add') && (!ruleForm.fatherSource) || my.disabled" 
                                        v-model="ruleForm.fatherCode" 
                                        placeholder="请输入筛选"  
                                        @change="fnChangeFatherCode(1,'fatherCode')" 
                                        filterable 
                                        remote
                                        reserve-keyword
                                        :remote-method="remoteMethodFather"
                                        :loading="loading">
                                        <el-option
                                                v-for="item in my.tableDataCopy"
                                                :key="item.value"
                                                :label="`${item.label}(${item.code}${item.ancestralHallListInfo.length>0?item.ancestralHallListInfo[0].name:''})`"
                                                :value="item.fatherCode"
                                        >
                                        </el-option>
                                </el-select>
                        </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="父系序号：" prop="fatherCode" v-if="ruleForm.fatherSource==20">                   
                    <el-input placeholder="选择父系即可生成" :disabled="my.disabled || ruleForm.fatherSource===20"  v-model="ruleForm.fatherCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="现居住地：" >
                    <!-- <el-cascader   
                       :disabled="my.disabled"
                        clearable            
                        placeholder="请选择"             
                        v-model="ruleForm.currentAddress"
                        :options="regionData">
                    </el-cascader> -->
                    <el-input  :disabled="my.disabled" v-model="ruleForm.currentAddress" clearable></el-input>
            </el-form-item>
            <el-form-item label="祖籍：" >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.address" clearable></el-input>
            </el-form-item>
            <el-form-item label="堂号："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.houseHold" clearable></el-input>
            </el-form-item>
            <el-form-item label="字辈："  >
                    <el-input  :disabled="my.disabled"  v-model="ruleForm.generationName" clearable></el-input>
            </el-form-item>
            <el-form-item label="世代："  >
                    <el-input   autocomplete="off" :disabled="my.disabled" v-model.number="ruleForm.generation" clearable></el-input>
            </el-form-item>
            <el-form-item label="婚姻状态："  >
                <el-select  :disabled="my.disabled" v-model="ruleForm.maritalStatus" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in arr.maritalStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                </el-select>                   
            </el-form-item>
            <el-form-item label="是否在世："  >
                <el-select  :disabled="my.disabled" v-model="ruleForm.isDead" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in arr.isDead"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                </el-select>                  
            </el-form-item>
            <el-form-item label="排行："  >
                    <el-input  :disabled="my.disabled" placeholder="1代表长子或者子女"  v-model.number="ruleForm.ranking" clearable></el-input>
            </el-form-item>
            <el-form-item label="生父："  >
                <div class="father-box">
                        <el-form-item prop="naturalFatherSource" :style="{'width':ruleForm.naturalFatherSource==20?'80px':'auto','margin-right':'2px'}">                                
                                <el-select :disabled="my.disabled" v-model="ruleForm.naturalFatherSource" placeholder="请选择" >
                                        <el-option
                                                v-for="item in arr.fatherMotherStatus"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                >
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item prop="naturalFatherCode" class="father-long" v-if="ruleForm.naturalFatherSource==20">
                                <!-- <el-select 
                                        v-if="ruleForm.naturalFatherSource==20 || ruleForm.naturalFatherSource==''" 
                                        :disabled="(my.type==='edit' || my.type==='add') && (!ruleForm.naturalFatherSource) || my.disabled" 
                                        v-model="ruleForm.naturalFatherId" 
                                        placeholder="请选择"  
                                        @change="fnChangeFatherCode(2,'naturalFatherId')"
                                >
                                        <el-option
                                                v-for="item in my.tableData.filter(item => item.value!=my._id)"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                </el-select>                                 -->
                                <el-select                                    
                                       v-if="ruleForm.naturalFatherSource==20 || ruleForm.naturalFatherSource==''" 
                                        :disabled="(my.type==='edit' || my.type==='add') && (!ruleForm.naturalFatherSource) || my.disabled" 
                                        v-model="ruleForm.naturalFatherCode" 
                                        placeholder="请输入筛选"  
                                        @change="fnChangeFatherCode(2,'naturalFatherCode')" 
                                        filterable 
                                        remote
                                        reserve-keyword
                                        :remote-method="remoteMethodFather2"
                                        :loading="loading">
                                        <el-option
                                                v-for="item in my.tableDataCopy2"
                                                :key="`list2-${item.value}`"
                                                :label="`${item.label}(${item.code}${item.ancestralHallListInfo.length>0?item.ancestralHallListInfo[0].name:''})`"
                                                :value="item.naturalFatherCode"
                                        >
                                        </el-option>
                                </el-select>
                        </el-form-item>
                </div>              
            </el-form-item>
            <el-form-item label="生父序号："  v-if="ruleForm.naturalFatherSource===20">                    
                    <el-input :disabled="ruleForm.naturalFatherSource===20 ||  my.disabled"  v-model="ruleForm.naturalFatherCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="母系："  >
                <div class="father-box">
                        <el-form-item prop="motherSource" :style="{'width':ruleForm.motherSource==20?'80px':'auto','margin-right':'2px'}">                                
                                <el-select :disabled="my.disabled" v-model="ruleForm.motherSource" placeholder="请选择" >
                                        <el-option
                                                v-for="item in arr.fatherMotherStatus"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                >
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item prop="motherCode" class="father-long" v-if="ruleForm.motherSource==20">
                                <!-- <el-select 
                                        v-if="ruleForm.motherSource==20 || ruleForm.motherSource==''" 
                                        :disabled="(my.type==='edit' || my.type==='add') && (!ruleForm.motherSource) || my.disabled" 
                                        v-model="ruleForm.motherId" 
                                        placeholder="请选择"  
                                        @change="fnChangeFatherCode(3,'motherId')"
                                >
                                        <el-option
                                                v-for="item in my.tableDataCopy"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                </el-select>                                 -->
                                <el-select                                    
                                       v-if="ruleForm.motherSource==20 || ruleForm.motherSource==''" 
                                        :disabled="(my.type==='edit' || my.type==='add') && (!ruleForm.motherSource) || my.disabled" 
                                        v-model="ruleForm.motherCode" 
                                        placeholder="请输入筛选"  
                                        @change="fnChangeFatherCode(3,'motherCode')" 
                                        filterable 
                                        remote
                                        reserve-keyword
                                        :remote-method="remoteMethodMother"
                                        :loading="loading">
                                        <el-option
                                                v-for="item in my.tableDataMotherCopy"
                                                :key="`listMonther-${item.value}`"
                                                :label="`${item.label}(${item.code}${item.ancestralHallListInfo.length>0?item.ancestralHallListInfo[0].name:''})`"
                                                :value="item.motherCode"
                                        >
                                        </el-option>
                                </el-select>
                        </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="母系序号：" v-if="ruleForm.motherSource===20" >
                    <el-input placeholder="选择母系即可生成" :disabled="ruleForm.motherSource==20 ||  my.disabled" v-model="ruleForm.motherCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="配偶：" >
                        <el-select 
                                style="width:530px" 
                                multiple
                                :disabled="my.disabled" 
                                v-model="ruleForm.spouseList" 
                                placeholder="请输入查找" 
                                filterable 
                                remote
                                reserve-keyword
                                :remote-method="remoteMethodSpouse"
                                :loading="loading">
                                <el-option
                                        v-for="item in my.spouseList"
                                        :key="`spouseList-${item.value}`"
                                        :label="item.realName"
                                        :value="item._id"
                                >
                                </el-option>
                        </el-select>
            </el-form-item>
            
            <el-form-item label="墓葬所在地："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.cemetery" clearable></el-input>
            </el-form-item>
            <el-form-item label="谥号："  >
                    <el-input   :disabled="my.disabled" v-model="ruleForm.posthumousTitle" clearable></el-input>
            </el-form-item>
            </div>
            <div class="information-tit">教育及工作信息</div>
            <div class="ruleForm-box">
            <el-form-item label="毕业院校："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.school" clearable></el-input>
            </el-form-item>
            <el-form-item label="学历："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.education" clearable></el-input>
            </el-form-item>
            <el-form-item label="工作单位："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.workUnit" clearable></el-input>
            </el-form-item>
            <el-form-item label="岗位："  >
                    <el-input  :disabled="my.disabled" v-model="ruleForm.position" clearable></el-input>
            </el-form-item>           
            </div>
            <div class="information-tit">其他信息</div>
            <div class="ruleForm-box">
                <el-form-item label="血型："  >
                        <el-input  :disabled="my.disabled" v-model="ruleForm.bloodType" clearable></el-input>
                </el-form-item>
                <el-form-item label="生肖："  >
                        <el-input  :disabled="my.disabled"  v-model="ruleForm.constellation" clearable></el-input>
                </el-form-item>
                <el-form-item label="爱好："  >
                        <el-input  :disabled="my.disabled" v-model="ruleForm.hobby" clearable></el-input>
                </el-form-item>                         
            </div>
            <div class="information-tit">个人简介</div>
            <div class="ruleForm-box" >
                
                <el-form-item label="简介："  style="width:78%">
                        <el-input  
                            type="textarea"
                            :rows="14" 
                            v-model="ruleForm.desc"                             
                            placeholder="请输入简介"
                            maxlength="1000"
                            show-word-limit
                             :disabled="my.disabled"
                        ></el-input>
                </el-form-item>           
            </div>       
         
          <el-form-item style="margin-top:40px">
            <el-button  type="primary" v-if="my.type==='see'?false:true" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="fnReturn">返回</el-button>
          </el-form-item>
        </el-form> 
        <el-form :model="ruleFormAncestralHall" :rules="rulesHall" ref="ruleFormHall" label-width="100px" class="demo-ruleForm">
                <el-dialog
                        v-model="my.dialogVisible"
                        title="新增族谱名称"
                        width="30%"
                        :before-close="handleClose"
                        >
                        <div>
                                <el-form-item label="族谱名称" prop="name">
                                        <el-input v-model="ruleFormAncestralHall.name"></el-input>
                                </el-form-item>
                                <el-form-item label="堂号" prop="houseHold">
                                        <el-input v-model="ruleFormAncestralHall.houseHold"></el-input>
                                </el-form-item>
                                <el-form-item label="祖籍地" prop="address">
                                        <el-input v-model="ruleFormAncestralHall.address"></el-input>
                                </el-form-item>
                                <el-form-item label="简介" prop="desc">
                                        <el-input  
                                                type="textarea"
                                                :rows="5" 
                                                v-model="ruleFormAncestralHall.desc"
                                        ></el-input>
                                </el-form-item>

                        </div>
                        <template #footer>
                        <span class="dialog-footer">
                                <el-button @click="handleClose">取消</el-button>
                                <el-button type="primary" @click="fnAddAncestralHall"
                                >提交</el-button>
                        </span>
                        </template>
                </el-dialog>
        </el-form>
        
    </div>
</template>
<script> 
import {reactive,ref,getCurrentInstance,unref  } from 'vue'
import {notEmpty,notEmptySelect} from '@utils/verification'
import {gender,personnelStatus,personnelType,birthMoment,maritalStatus,isDead,fatherMotherStatus} from '@assets/constant/index'
// import {fnArea} from '@utils/filterConstant'
// import { regionData } from 'element-china-area-data'; 
import {genealogyStore,ancestralHallStore} from '@store'
import menuBreadCrumb from '@c/menuGlobal/menuBreadCrumb/menuBreadCrumb'
import {fnTimerResult} from '@utils/filterConstant'


export default{
    components: {        
        menuBreadCrumb
    },
    setup(){
        let {proxy} = getCurrentInstance();
        const ruleFormes = ref(null);
        const ruleFormHall = ref(null)
        const my = reactive({
           type:proxy.$route.query.type,
           disabled:false,
           tableData:[],// 父亲数据
           tableDataCopy:[],// 复制的数据
           _id:proxy.$route.query._id,           
           firstDetailFather:[],
           tableDataCopy2:[],// 生父的
           firstDetailFather2:[],// 生父copy的
           firstDetailMother:[],// 母亲
           tableDataMotherCopy:[],
           dialogVisible:false,// 族谱名称弹框
           hallList:[],// 族谱筛选
           spouseList:[],// 配偶
        })
        const arr = reactive({
                gender:gender,// 性别
                personnelStatus:personnelStatus, // 人员状态
                personnelType:personnelType,// 人员类型
                birthMoment:birthMoment,// 出生时辰
                maritalStatus:maritalStatus, // 婚姻状态
                isDead:isDead,// 是否在世
                fatherMotherStatus:fatherMotherStatus,// 父亲状态
        })          
        const ruleForm = reactive({  
                realName:'',                              
                fatherSource:'',// 父亲状态
                naturalFatherSource:'',// 生父状态
                motherSource:'',// 母亲状态
                surname:'', // 姓
                name:'',// 名
                gender:'',// 性别 10 男性 20 女性
                personnelStatus:'',// 人员状态 10 正常 20 领养 30 过继 40 承祧 50 兼祧 60 其他
                personnelType:30,// 人员类型 10 古代人(先秦时期-1905) 20 近代人(1840-1949) 30 现代人(1949-至今)
                birthTime:null,// 出生时间
                deathTime:null, // 死亡时间
                birthMoment:'',// 出生时辰 10 子时 20 丑时 30 寅时 40 卯时 50 辰时 60 巳时 70 午时 80 未时 90 申时 100 酉时 110 戌时 120 亥时
                usedName:'', // 曾用名
                alias:'',// 别名
                styleName:'',// 字
                pseudonym:'',// 号
                contact1:'',//  联系方式1
                contact2:'',// 联系方式2
                contact3:'',// 联系方式3
                fatherId:'', // 父亲_id
                fatherName:'',// 父亲名字
                fatherCode:'', // 父亲唯一序号
                motherId:'',// 母亲_id
                motherName:'',// 母亲名字
                motherCode:'',// 母亲唯一序号
                naturalFatherId:'',// 生父_id
                naturalFatherName:'',// 生父名字
                naturalFatherCode:'',// 生父唯一序号
                currentAddress:'',// 现居住地
                address:'',// 祖籍地址
                provinceCode:'',// 省级编码
                cityCode:'',// 市级编码
                countyCode:'',// 区级编码
                houseHold:'',// 堂号
                generationName:'',// 字辈
                generation:'',// 世代 1 2 3 ...
                maritalStatus:20,// 婚姻状态 10 已婚 20 未婚 30 离异 40 丧偶
                isDead:10,// 是否在世 10 是 20 否
                ranking:'',// 排行 1 2 3 ...
                cemetery:'',// 墓葬所在地
                posthumousTitle:'',// 谥号
                school:'',// 毕业院校
                education:'',// 学历
                workUnit:'',// 工作单位
                position:'',// 职位
                bloodType:'',// 血型
                constellation:'',// 星座
                hobby:'',// 爱好
                desc:'',// 个人简介
                isPublicity:10,// 是否公示 10 否 20 是
                ancestralHallList:[],// - 宗祠_id列表
                spouseList:[],// 配偶         
        })  
         // 规则
        const rules = {
                surname:[notEmpty('姓')],
                name: [notEmpty('名')],
                gender:[notEmptySelect('性别')],
                personnelStatus:[notEmptySelect('人员状态')],
                fatherId:[notEmptySelect('父亲')],
                fatherCode:[notEmpty('父亲')],
                personnelType:[notEmptySelect('人员类型')],
                fatherSource:[notEmptySelect('')],
                // ancestralHallList:[notEmptySelect('族谱名称')],
        }  
        // 族谱名称
        const ruleFormAncestralHall = reactive({
                name:'',// 族谱名称
                houseHold:'',// 堂号
                address:'',// 祖籍地
                desc:'',// 简介
        })
        // 族谱名称规则
        const rulesHall = reactive({
                name: [notEmpty('族谱名称')],
        })
      
        // 提交
        const submitForm = async()=> {
               const form = unref(ruleFormes);  
               if (!form) return
               try {
               await form.validate()   
                // 地区                             
                // if(ruleForm.area){
                //         ruleForm.provinceCode = ruleForm.area[0];
                //         if(ruleForm.area[1]){
                //                 ruleForm.cityCode = ruleForm.area[1];
                //         }
                //         if(ruleForm.area[2]){
                //                 ruleForm.countyCode = ruleForm.area[2];
                //         }
                // }else{
                //         ruleForm.provinceCode = ''
                //         ruleForm.cityCode = ''
                //         ruleForm.countyCode = ''
                // }
               
                // 父亲不详的时候清空
                if(ruleForm.fatherSource === 10){
                        // 不详
                        ruleForm.fatherName = ''
                        ruleForm.fatherId = ''                       
                        ruleForm.fatherCode = ''
                }
                // 生父
                if(ruleForm.naturalFatherSource === 10){
                        // 不详
                        ruleForm.naturalFatherId = '' // 生父_id
                        ruleForm.naturalFatherName = '' // 生父名字
                        ruleForm.naturalFatherCode = '' // 生父唯一序号

                }  
                // 母亲不详也清空
                if(ruleForm.motherSource === 10){
                        // 不详                        
                        ruleForm.motherId = '' // 母亲_id
                        ruleForm.motherName = '' // 母亲名字
                        ruleForm.motherCode = '' // 母亲唯一序号
                }     
                ruleForm.realName = ruleForm.surname + ruleForm.name // 姓+名  
              
               // 出生时间
                if(ruleForm.birthTime??'' !== ''){
                        console.log('ruleForm.birthTime==',ruleForm.birthTime)
                        // 非空判断
                        ruleForm.birthTime =  fnTimerResult(ruleForm.birthTime)         
                }
                // 死亡时间
                if(ruleForm.deathTime??'' !== ''){
                        // 非空判断
                        ruleForm.deathTime =  fnTimerResult(ruleForm.deathTime) 
                }
                
                let API
                if(my.type=='edit'){
                        ruleForm._id = my._id
                        // 更新
                        API = genealogyStore.saveInfo(ruleForm)
                }else{
                        // 新增
                        API = genealogyStore.addInfo(ruleForm)
                }
                API.then(res=>{                      
                        if(ruleForm.id && Number(my.type)==='edit'){
                                proxy.$fnTip(1,'修改成功')
                        }else{
                                proxy.$fnTip(1,'添加成功')  
                        }      
                       fnReturn()       
              
                })               
                
           
                } catch (error) {  
                         
                } 
        }  
        const fnReturn = () =>{
            proxy.$router.push({name:'genealogyManage'})
        } 
        const fnGetDetail = () =>{
                if(my.type==='see'){
                    my.disabled = true
                }else if(my.type === 'edit' || my.type==='add'){
                    my.disabled = false
                }
                if(my._id){
                        genealogyStore.fetchInfo({_id:my._id}).then(res=>{                               
                                const detailObj = genealogyStore.state.info || {}                              
                                Object.keys(ruleForm).map(v=>{
                                        ruleForm[v] = detailObj[v]                                        
                                 })
                                //  出生时辰处理
                                if(ruleForm.birthMoment==0){                                        
                                        ruleForm.birthMoment = ''
                                }
                                // 对父亲选择明确进行处理
                                 if(detailObj.fatherSource && detailObj.fatherSource===20){
                                        //  这块要注意
                                         my.firstDetailFather.push({label:detailObj.fatherName,fatherCode:detailObj.fatherCode,value:detailObj.fatherId,code:detailObj.code,ancestralHallListInfo:detailObj.ancestralHallListInfo})
                                         my.tableDataCopy.push({label:detailObj.fatherName,fatherCode:detailObj.fatherCode,value:detailObj.fatherId,code:detailObj.code,ancestralHallListInfo:detailObj.ancestralHallListInfo})
                                 } 
                                 
                                //  生父
                                 if(detailObj.naturalFatherSource==0){
                                        ruleForm.naturalFatherSource = ''
                                 } 
                                 if(detailObj.naturalFatherSource && detailObj.naturalFatherSource===20){
                                        //  这块要注意
                                         my.firstDetailFather2.push({label:detailObj.naturalFatherName,naturalFatherCode:detailObj.naturalFatherCode,value:detailObj.fatherId,code:detailObj.code,ancestralHallListInfo:detailObj.ancestralHallListInfo})
                                         my.tableDataCopy2.push({label:detailObj.naturalFatherName,naturalFatherCode:detailObj.naturalFatherCode,value:detailObj.fatherId,code:detailObj.code,ancestralHallListInfo:detailObj.ancestralHallListInfo})
                                 } 
                                 //  母亲
                                 if(detailObj.motherSource==0){
                                        ruleForm.motherSource = ''
                                 } 
                                 if(detailObj.motherSource && detailObj.motherSource===20){
                                        //  这块要注意
                                         my.firstDetailMother.push({label:detailObj.motherName,motherCode:detailObj.motherCode,value:detailObj.motherId,code:detailObj.code,ancestralHallListInfo:detailObj.ancestralHallListInfo})
                                         my.tableDataMotherCopy.push({label:detailObj.motherName,motherCode:detailObj.motherCode,value:detailObj.motherId,code:detailObj.code,ancestralHallListInfo:detailObj.ancestralHallListInfo})
                                 }    
                                //  母亲
                                 if(detailObj.ancestralHallListInfo && detailObj.ancestralHallListInfo.length>0){
                                        my.hallList.push(...detailObj.ancestralHallListInfo)
                                 } 
                                // 配偶
                                if(detailObj.spouseListInfo && detailObj.spouseListInfo.length>0){
                                        my.spouseList.push(...detailObj.spouseListInfo)
                                 }   
                               
                                ruleForm.code = detailObj.code // 序号
                        })
                }
                
                
        }
        // 获取父亲列表
        // const fnGetList = async () =>{ 
        //     const param = {                
        //         limit:1000,
        //         page:1,
        //         gender:10
        //     }
        //     await genealogyStore.fetchList(param).then(()=>{
        //         let list = genealogyStore.state.list || []
        //         if(list.length>0){
        //                 list.map(v=>{
        //                    my.tableData.push({label:v.realName,value:v._id,code:v.code,familyCode:v.familyCode})
        //                 })
                       
        //         }
        //     })
        // }
        const fnChangeFatherCode = (type,code) =>{
                // Id
                if(type === 1){
                        // 父亲
                         let obj = {}
                        my.tableDataCopy.map(v=>{
                                if(v.fatherCode===ruleForm[code]){
                                        obj = v
                                }                        
                        })  
                        ruleForm.fatherId = obj.value     
                        ruleForm.fatherName = obj.label
                        // ruleForm.fatherCode = obj.code 
                        // ruleForm.familyCode = obj.familyCode              
                }else if(type === 2){                      
                        // 生父               
                        let obj = {}
                        my.tableDataCopy2.map(v=>{
                                if(v.naturalFatherCode===ruleForm[code]){
                                        obj = v
                                }                        
                        })                       
                        ruleForm.naturalFatherName = obj.label
                        // ruleForm.naturalFatherCode = obj.code
                        ruleForm.naturalFatherId = obj.value 
                        console.log(obj)
                        console.log('naturalFatherCode',ruleForm.naturalFatherCode)
                       
                }
                else if(type === 3){                      
                        // 母亲               
                        let obj = {}
                        my.tableDataMotherCopy.map(v=>{
                                if(v.motherCode===ruleForm[code]){
                                        obj = v
                                }                        
                        })  
                        ruleForm.motherId = obj.value // 母亲的Id
                        ruleForm.motherName = obj.label
                        // ruleForm.motherCode = obj.code
                       
                }                
        }
        // loading
        const loading = ref(false)  
        // 过滤父亲数据
        const remoteMethodFather = async (query) => { 
                if(my.type==='edit' && my._id){                                               
                } else{
                        my.tableDataCopy = []
                }                         
                const param = { 
                        selfId:my._id,                               
                        limit:1000,
                        page:1,
                        // gender:10,
                        realName:query
                }
                const fatherList = []
                await genealogyStore.fetchList(param).then(()=>{
                        let list = genealogyStore.state.list || []
                        if(list.length>0){
                                list.map(v=>{
                                // 这里面筛选的fatherCode 是code 注意 
                                fatherList.push({label:v.realName,fatherCode:v.code,value:v._id,code:v.code,ancestralHallListInfo:v.ancestralHallListInfo})
                                })
                        }              
                        my.tableDataCopy = fnUnique([...my.firstDetailFather,...fatherList])               
            })                           
        }
        // 父亲的过滤
        const fnUnique = (arr) =>{                
                 let obj = {};
                arr= arr.reduce((cur,next) => {
                        obj[next.fatherCode] ? "" : obj[next.fatherCode] = true && cur.push(next);
                        return cur;
                },[]);
                return arr;                
        }
        // 生父的数据
        const remoteMethodFather2 = async (query) => { 
                if(my.type==='edit' && my._id){  
                        // let arr = fnUnique([...my.firstDetailFather,...my.tableDataCopy]);
                        // my.tableData = arr                       
                } else{
                        my.tableDataCopy2 = []
                }                         
                const param = { 
                        selfId:my._id,                               
                        limit:1000,
                        page:1,
                        gender:10,
                        realName:query
                }
                const fatherList2 = []
                await genealogyStore.fetchList(param).then(()=>{
                        let list = genealogyStore.state.list || []
                        if(list.length>0){
                                list.map(v=>{
                                // 这里面筛选的naturalFatherCode 是code 注意 
                                fatherList2.push({label:v.realName,naturalFatherCode:v.code,value:v._id,code:v.code,ancestralHallListInfo:v.ancestralHallListInfo})
                                })
                        }                           
                my.tableDataCopy2 = fnUnique2([...my.firstDetailFather2,...fatherList2])               
            })            
        }
        // 生父的过滤
        const fnUnique2 = (arr) =>{              
                let obj = {};
                arr= arr.reduce((cur,next) => {
                        obj[next.naturalFatherCode] ? "" : obj[next.naturalFatherCode] = true && cur.push(next);
                        return cur;
                },[]);
                return arr;                
        }
        // 母亲筛选的数据
        const remoteMethodMother = async (query) => { 
                if(my.type==='edit' && my._id){  
                                          
                } else{
                        my.tableDataMotherCopy = []
                }                         
                const param = { 
                        selfId:my._id,                               
                        limit:1000,
                        page:1,
                        // gender:20, // 女性
                        realName:query
                }
                const montherList = []
                await genealogyStore.fetchList(param).then(()=>{
                        let list = genealogyStore.state.list || []
                        if(list.length>0){
                                list.map(v=>{
                                // 这里面筛选的naturalFatherCode 是code 注意 
                                montherList.push({label:v.realName,motherCode:v.code,value:v._id,code:v.code,ancestralHallListInfo:v.ancestralHallListInfo})
                                })
                        }  
                                                 
                my.tableDataMotherCopy = fnUniqueMother3([...my.firstDetailMother,...montherList])               
            })            
        }
        // 母亲数据的过滤
        const fnUniqueMother3 = (arr) =>{              
                let obj = {};
                arr= arr.reduce((cur,next) => {
                        obj[next.motherCode] ? "" : obj[next.motherCode] = true && cur.push(next);
                        return cur;
                },[]);
                return arr;                
        }
        // 显示族谱名称弹框
        const fnAddHallShow = () =>{
                my.dialogVisible = true
        }
        // 增加族谱名称
        const fnAddAncestralHall = async()=> {
               const form = unref(ruleFormHall);  
               if (!form) return
               try {
               await form.validate() 
                let API = ancestralHallStore.addInfo(ruleFormAncestralHall)
                
                // if(my.type=='edit'){
                //         ruleForm._id = my._id
                //         // 更新
                //         API = genealogyStore.saveInfo(ruleForm)
                // }else{
                //         // 新增
                //         API = genealogyStore.addInfo(ruleForm)
                // }
                API.then(res=>{ 
                        proxy.$fnTip(1,'添加成功')  
                        handleClose()
                }) 
                } catch (error) {  
                         
                } 
        }  
        // 族谱名称关闭
        const handleClose = () =>{
                Object.keys(ruleFormAncestralHall).map(v=>{
                        ruleFormAncestralHall[v] = ''
                })
                my.dialogVisible = false
        }
        const remoteMethodHall = async (query) =>{
                let param = {
                        limit:1000,
                        page:1,
                        name:query
                }
                ancestralHallStore.fetchList(param).then(res=>{
                        let list = ancestralHallStore.state.list || []
                        if(my.hallList.length>0){
                                my.hallList.push(...list)
                        }else{
                                my.hallList = list
                        }
                        my.hallList = fnUniqueHall([...my.hallList]) 
                })
        }
         // 母亲和配偶的数据的过滤
        const fnUniqueHall = (arr) =>{              
                let obj = {};
                arr= arr.reduce((cur,next) => {
                        obj[next._id] ? "" : obj[next._id] = true && cur.push(next);
                        return cur;
                },[]);
                return arr;                
        }
        // 族谱名称选择改变
        const fnChangeHall = () =>{

        }
        // 配偶
        const remoteMethodSpouse = async (query) =>{
                const param = { 
                        selfId:my._id,                               
                        limit:1000,
                        page:1,                      
                        realName:query
                }   
                await  genealogyStore.fetchList(param).then(()=>{
                        let list = genealogyStore.state.list || []
                        if(my.spouseList.length>0){
                                my.spouseList.push(...list)
                        }else{
                            my.spouseList = list    
                        }
                        my.spouseList = fnUniqueHall([...my.spouseList])
                })
        }
        // 配偶数据过滤
        // const fnSpouseList = (arr) =>{              
        //         let obj = {};
        //         arr= arr.reduce((cur,next) => {
        //                 obj[next._id] ? "" : obj[next._id] = true && cur.push(next);
        //                 return cur;
        //         },[]);
        //         return arr;                
        // }
             
        fnGetDetail()

        return {
            my,
            arr,
            loading,
            ruleForm,
            ruleFormes,
            rules,
        //     regionData,
            submitForm,
            fnReturn,         
            fnChangeFatherCode,
            remoteMethodFather,
            fnUnique,
            remoteMethodFather2,
            remoteMethodMother,
            fnTimerResult,
            fnAddHallShow,
            fnAddAncestralHall,
            ruleFormAncestralHall,
            handleClose,
            ruleFormHall,
            rulesHall,
            remoteMethodHall,
            fnChangeHall,
            remoteMethodSpouse
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
    .information-tit{
        margin:15px 10px 20px 10px;
        font-size: 15px;
        font-weight: 600;
    }
    .ruleForm-box{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    /deep/.ruleForm-box{       
        .father-box{
                display:flex;
                justify-content:flex-start
                .father-short{
                        width:60px !important;
                        margin-right:5px !important
                }
                .father-long{
                        width:135px !important;                
                }
        }
        
    }
    .name-box{
        display:flex;
        justify-content:flex-start;
        align-items: center;
        .addIcon{
                margin-left:5px;
                font-size:15px;
                cursor: pointer;
                color:#409eff

        }
    }
        // .noNumber{
        //         .no-arrow::-webkit-inner-spin-button {
        //         -webkit-appearance: none !important;
        //         }
        // }    
     /* element样式重置 start */
        /* 去掉input尾部上下小箭头 start */
       /deep/input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        // -moz-appearance: none !important;
        // -o-appearance: none !important;
        // -ms-appearance: none !important;
        // appearance: none !important;
        // margin: 0;
        }
        /deep/input[type="number"]{
        // -webkit-appearance:textfield !important;
        -moz-appearance:textfield !important;
        // -o-appearance:textfield !important;
        // -ms-appearance:textfield !important;
        // appearance:textfield !important;
        }
        /* 去掉input尾部上下小箭头 end */
   
    
}

</style>
<style scoped>
 /* 关键css */
        .class /deep/ .a input::-webkit-outer-spin-button{
                -webkit-appearance:none !important;
        }
        .class /deep/ .a input::-webkit-inner-spin-button{
                -moz-appearance: textfield;
        }
       
</style>