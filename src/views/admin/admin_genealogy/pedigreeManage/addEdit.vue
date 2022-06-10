<template>
    <div class="bg">
        <div class="breadcrumb">
            <menu-bread-crumb></menu-bread-crumb>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormes" label-width="100px" class="demo-ruleForm">
            <div class="ruleForm-box">
                <el-form-item label="族谱名称：" prop="name">
                        <el-input 
                        :disabled="fnSee()"  
                        v-model="ruleForm.name"
                        clearable
                        placeholder="请输入族谱名称（如北京张氏宗谱）"
                        ></el-input>
                </el-form-item>
                <el-form-item label="族谱封面：" >                   
                    <el-upload 
                        
                        :disabled="fnSee()"                   
                        class="avatar-uploader"                      
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload" 
                        :http-request="fnCardUploadFileDrag"
                        action="#"
                    >
                        <div class='imagesBox' v-if="my.imageUrl">
                            <img  :src="my.imageUrl" class="avatar">
                            <div class='box-m'></div>
                            <!-- 放大 -->
                            <i  class="el-icon-zoom-in" @click.stop="handleZoomImage"></i>
                            <!-- 删除 -->
                            <i v-if="my.type=='see'?false:true" class="el-icon-delete" @click.stop="handleRemoveImage"></i>
                        </div> 
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="堂号：" >
                        <el-input 
                        :disabled="fnSee()"  
                        v-model="ruleForm.houseHold"
                        clearable
                        placeholder="如世德堂"
                        ></el-input>
                </el-form-item>
                <el-form-item label="始祖姓名：" >
                        <el-input 
                        :disabled="fnSee()"   
                        v-model="ruleForm.ancestorsName"
                        clearable
                        placeholder="请输入始祖姓氏（如曾）"
                        ></el-input>
                </el-form-item>
                <el-form-item label="祖籍所在地：" >
                        <el-input 
                        :disabled="fnSee()"  
                        v-model="ruleForm.address"
                        clearable                        
                        ></el-input>
                </el-form-item>
                <el-form-item label="现居住地：" >
                        <el-input 
                       :disabled="fnSee()"   
                        v-model="ruleForm.currentAddress"
                        clearable                       
                        ></el-input>
                </el-form-item>
                 <el-form-item label="房系：" >
                        <el-input 
                        :disabled="fnSee()" 
                        v-model="ruleForm.clique"
                        clearable                       
                        ></el-input>
                </el-form-item>
                 <el-form-item label="管理员：" v-if="my.type && my.type!='add'">
                     
                        <el-select 
                            :disabled="fnSee()"
                            clearable    
                            placeholder="请选择"
                            v-model="ruleForm.genealogyId"
                        >
                            <el-option
                            v-for="item in my.manageList"
                            :key="item._id"
                            :label="item.realName"
                            :value="item._id">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="族谱简介：" >
                        <el-input 
                        :disabled="fnSee()"  
                        v-model="ruleForm.desc"
                        clearable 
                        type="textarea"
                        :rows="6"                    
                        ></el-input>
                </el-form-item>
            </div>
            <el-form-item style="margin-top:40px">
                <el-button  type="primary" v-if="my.type==='see'?false:true" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="fnReturn">返回</el-button>
            </el-form-item>
        </el-form>        
        <el-dialog                 
            v-model="my.showImage"
            width="60%"
            top='2vh'
            :before-close="handleImageClose"
            :close-on-click-modal="false"
            >
            <img :src="my.zoomImage" />
            
        </el-dialog>
    </div>
</template>
<script> 
import {reactive,ref,getCurrentInstance,unref  } from 'vue'
import {notEmpty,notEmptySelect} from '@utils/verification'
import {ancestralHallStore,genealogyStore} from '@store'
import menuBreadCrumb from '@c/menuGlobal/menuBreadCrumb/menuBreadCrumb'
export default{
    components: {        
        menuBreadCrumb
    },
    setup(){
        let {proxy} = getCurrentInstance();
        const ruleFormes = ref(null);
      
        const my = reactive({
           type:proxy.$route.query.type,// 判断新增  编辑和显示的
           disabled:false,
           _id:proxy.$route.query._id,
           showImage:false,// 图谱封面放大显示
           imageUrl:'', // 图谱封面
           manageList:[],// 管理员
        })
                 
        const ruleForm = reactive({                
                name:'',// 族谱名称   
                houseHold:'',// 堂号
                address:'',// 祖籍地
                desc:'', //简介
                pic:[],// 图片  
                ancestorsName:'',// 始祖姓名 
                currentAddress:'',// 现居住地         
                clique:'',// 房系
                genealogyId:''// 族长_id 编辑时候才加
        })  
         // 规则
        const rules = {               
                name: [notEmpty('族谱名称')]              
        }
        // 提交
        const submitForm = async()=> {
               const form = unref(ruleFormes);  
               if (!form) return
               try {
               await form.validate()                 
                let API
                if(my.type=='edit'){
                        ruleForm._id = my._id
                        // 更新
                        API = ancestralHallStore.saveInfo(ruleForm)
                }else{
                        // 新增
                        API = ancestralHallStore.addInfo(ruleForm)
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
            proxy.$router.push({name:'pedigreeManage'})
        } 
        
        // 判断查看 编辑新增
        const fnSee = () =>{
            if(my.type && my.type==='see'){
                return true
            }else{
                return false
            }
            
        }     
        
        // 上传图片接口
        const fnCardUploadFileDrag = async(params) =>{             
            let fileObj = params.file;              
            const res =  await proxy.$uploadFile("/upload/file", fileObj);
            ruleForm.pic = [{name:res.data.name,url:res.data.url}]
                              
        }
        // 上传图片之前判断
        const beforeAvatarUpload = (file) =>{           
                const isJPG = file.type === "image/jpeg";
                const isJPEG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isLt2M = file.size / 1024 / 1024 < 3;
                if (!isJPG && !isJPEG && !isPNG) {
                this.$message.error('只能是jpg/png/jpeg格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 3MB!');
                }
                return (isJPG || isJPEG || isPNG) && isLt2M;
        }
         // 上传成功
        const handleAvatarSuccess = (res,file) =>{
            my.imageUrl = URL.createObjectURL(file.raw); 
        }
        // 放大
        const handleZoomImage = () =>{      
            my.showImage = true  
            my.zoomImage = ruleForm.pic[0].url                               
        }
        const handleImageClose = () =>{
            my.showImage = false                
        }
        // 移除图谱封面图
        const handleRemoveImage = () =>{               
            my.imageUrl = ''
            ruleForm.pic.name = ''
            ruleForm.pic.url = ''
        }         
        // 管理员接口
        const fnList = async() =>{           
            const param = {  
                limit:100000,
                page:1,
                ancestralHallId:my._id
            }
            await genealogyStore.fetchList(param).then(()=>{
                my.manageList = genealogyStore.state.list || []
                         
            })
        }
        // 详情
        const fnGetDetail = async() =>{
                if(my.type==='see'){
                    my.disabled = true
                }else if(my.type === 'edit' || my.type==='add'){
                    my.disabled = false
                }             
                if(my._id){
                    // ruleForm.genealogyId = my._id
                   await ancestralHallStore.fetchInfo({_id:my._id}).then(res=>{                               
                        const detailObj = ancestralHallStore.state.info || {}                              
                        Object.keys(ruleForm).map(v=>{
                            ruleForm[v] = detailObj[v]                                        
                        })
                        // 族谱封面
                        if(detailObj.pic && detailObj.pic.length>0){                                       
                            my.imageUrl = detailObj.pic[0].url 
                            ruleForm.pic = detailObj.pic
                        }else{
                            my.imageUrl = ''
                            ruleForm.pic = [{ name:'', url:''}]
                        }
                        // 管理员如果genealogyId存在 就用genealogyId 否则就用_id
                        if(detailObj.genealogyId){
                            ruleForm.genealogyId = detailObj.genealogyId
                        }else{
                            ruleForm.genealogyId = detailObj._id
                        }    
                        console.log(ruleForm.genealogyId)                  
                        
                    })
                }
        }
        // 请求接口
        const fnPub = async () =>{
           
                const res2 = await fnList()
                const res1 = await fnGetDetail() 
           
                       
        }
        proxy.$nextTick(()=>{
            fnPub() // 接口请求 
         })            
      
        return {
            my,                   
            ruleForm,
            ruleFormes,
            rules,      
            submitForm,
            fnReturn,
            fnSee,
            handleAvatarSuccess,
            beforeAvatarUpload,
            fnCardUploadFileDrag,           
            handleZoomImage,
            handleImageClose,
            handleRemoveImage
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
    .ruleForm-box{        
        display: flex;
        flex-direction: column;       
        /deep/.el-input__inner{
            width:500px;
        }
    } 
    .imagesBox{
        position: relative;
        .box-m{
            position: absolute;
            left:0;
            top:0;
            background-color: black;
            opacity: 0.5;
        }
        i{
            position: absolute;            
            z-index: 999999;
            font-size: 22px;
            color:white;
            display: none;
        }
        .el-icon-delete{
            right:25%;
            top:41%;
        }
        .el-icon-zoom-in{
            left:25%;
            top:41%;
           
        }
    }
    .imagesBox:hover{       
        .box-m{
            background-color: black;
            opacity: 0.4;
            width: 120px;
            height: 120px;            
        }
        .el-icon-delete{
            display: block;
            z-index: 9999999;
        }
        .el-icon-zoom-in{
            display: block;
            z-index: 9999999;
        }
    }
    /deep/.avatar {
        width: 120px;
        height: 120px;
        display: block;       
    }
     /deep/.avatar-uploader .el-upload {
        border: 1px dashed #ccc;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/.avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    /deep/.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    /deep/.el-upload-list--picture-card{
        display: flex;
        justify-content: flex-start;
    }
     .noAdd{
        /deep/.el-upload--picture-card{
            display: none !important;
        }
        /deep/.el-upload{
            display: none;
        }
    }
     /deep/.el-dialog{
        background: none;
        border: none;
        height: 90%;
        margin-top: none !important;
        box-shadow:none;
        /deep/.el-dialog__header{
            background:none;            
        }
        .el-dialog__headerbtn .el-dialog__close{
            color: white;
            z-index: 999999999;
            font-size: 30px;
            right: -70px;
        }
        .el-dialog__body{          
            margin: 0 auto;
            text-align: center;
            img{
                width:100%;
                height:100%;
            }
        }
    }
}

</style>
