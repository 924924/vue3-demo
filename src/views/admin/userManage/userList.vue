<template>
    <div class="userList">
        <div class="breadcrumb">
            <menu-bread-crumb></menu-bread-crumb>
        </div>
        <div class="searchDiv">
            <div>
               手机号：
            </div>
            <div>
                <el-input v-model="searchForm.account" ></el-input>
            </div>
            <div class="ml10" >
                <el-button type="primary"  @click="getList" plain>查询</el-button>
                <el-button type="warning"  @click="reSet" plain>重置</el-button>
                <el-button type="success"  @click="openAdd" plain>添加用户</el-button>
            </div>
        </div>

        <div class="mt20" style="padding:15px;">
            <el-table :data="my.userList"                 
                border
                :header-cell-style="{
                background: '#F5F7FA',
                height: '40px',
                fontSize: '14px',
                color: 'rgb(96, 98, 102)'
                }">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="account" label="账号(手机号)" ></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="180">
                    <template #default="scope">
                        {{scope.row.createTime?scope.row.createTime.split("T")[0]:''}}
                    </template>
                </el-table-column>
                <el-table-column prop="enable" label="状态" width="180">
                    <template #default="scope">
                        {{scope.row.enable?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="操作" width="199">
                    <template #default="scope">
                        <span class="blueSpan" @click="openLook(scope.row)">查看</span>
                        <span v-if="userInfo.adminRole===20" class="blueSpan ml10" @click="openEdit(scope.row)">编辑</span>
                        <span  v-if="userInfo.adminRole===20">
                            <span v-if="scope.row.enable" class="blueSpan ml10" @click="stopUse(scope.row._id)">停用</span>
                            <span v-else class="blueSpan ml10" @click="openUse(scope.row._id)">启用</span>
                        </span>
                        <el-popconfirm v-if="userInfo.adminRole===20"
                                confirmButtonText='确定'
                                cancelButtonText='取消'
                                icon="el-icon-info"
                                iconColor="red"
                                title="确定删除当前数据吗？" @confirm="deleteUser(scope.row._id)">
                            <template #reference>
                                <span class="blueSpan ml10">删除</span>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="mt20"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="searchForm.page"
                           :page-sizes="[20, 40, 60, 100]"
                           :page-size="searchForm.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="my.total">
            </el-pagination>
        </div>


        <!--新增用户-->
        <el-dialog
                title="新增用户"
                v-model="my.addVisible"
                width="50%"
                :before-close="addHandleClose"   customClass="customWidth">
            <div>
                <user-form :form-data="addForm"></user-form>
                <div class="mt20 tac">
                    <el-button type="primary" @click="addInfo">确定</el-button>
                    <el-button @click="addHandleClose">取 消</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 编辑页面 -->
        <el-dialog
                title="编辑用户"
                v-model="my.editVisible"
                width="50%"
                :before-close="addHandleClose"   customClass="customWidth">
            <div>
                <user-form :editFlag="true" :form-data="my.editInfo"></user-form>
                <div class="mt20 tac">
                    <el-button type="primary" @click="saveInfo">确定</el-button>
                    <el-button @click="addHandleClose">取 消</el-button>
                </div>
            </div>
        </el-dialog>

        <!--查看页面-->
        <el-dialog
                title="查看用户"
                v-model="my.lookVisible"
                width="50%"
                :before-close="addHandleClose"   customClass="customWidth">
            <div>
                <user-form :lookFlag="true" :form-data="my.editInfo"></user-form>
                <div class="mt20 tac">
                    <el-button @click="addHandleClose">确 定</el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {reactive, getCurrentInstance} from 'vue';
    import menuBreadCrumb from '@/components/menuGlobal/menuBreadCrumb/menuBreadCrumb'
    import {userStore} from "../../../store";
    import UserForm from "./userForm";
    import md5 from "@/utils/crypto";
    export default {
        name: "userList",
        components: {UserForm, menuBreadCrumb},
        setup() {
            let {proxy} = getCurrentInstance();
            let my = reactive({
                editInfo:{},
                addVisible:false,
                editVisible:false,
                lookVisible:false,
                userList:[],
                total:0,
            });
            let userInfo =JSON.parse(sessionStorage.getItem('adminUserInfo'));
            let searchForm = reactive({
                account:'',
                page:1,
                limit:20,
            });
            let addForm = reactive({
                name:'',
                account:'',
                password:'',
                enable:true,
                adminRole:10,
            });


            //启用
            const openUse=async (_id)=>{
                await userStore.saveInfo({_id:_id,enable:true});
            };
            //禁用
            const stopUse=async (_id)=>{
                await userStore.saveInfo({_id:_id,enable:false});
            };

            //删除用户
            const deleteUser=async (_id)=>{
                await userStore.removeInfo({_id:_id});
                await getList();
            };

            const openAdd=()=>{
                my.addVisible=true;
            };
            const openLook=(row)=>{
                my.editInfo={
                    _id:row._id,
                    name:row.name,
                    account:row.account,
                };
                my.lookVisible=true;
            };
            const openEdit=(row)=>{
                my.editInfo={
                    _id:row._id,
                    name:row.name,
                    account:row.account,
                    password:'',
                };
                my.editVisible=true;
            };

            const addHandleClose=()=>{
                my.addVisible=false;
                my.lookVisible=false;
                my.editVisible=false;
            };

            const addInfo=async ()=>{
                if (addForm.account === "") {
                    proxy.$message.warning("请输入手机号!");
                    return
                } else if (addForm.name === "") {
                    proxy.$message.warning("请输入姓名!");
                    return
                } else if (addForm.password.length<6) {
                    proxy.$message.warning("请输入大于等于6位的密码!");
                    return
                }
                let param={};
                Object.keys(addForm).forEach(v=>{
                    if(v==="password"){
                        param[v] = md5.md5(addForm[v]).substring(4);
                    }else {
                        param[v]=addForm[v];
                    }
                });
                await userStore.addAccount(param).then(res=>{
                    proxy.$message.success("添加用户成功！");
                }).catch(res=>{
                    proxy.$message.error(res.msg);
                });
                await getList();
                addHandleClose();
                addForm.name='';
                addForm.account='';
                addForm.password='';
            };

            const saveInfo=async ()=>{
                if (my.editInfo.account === "") {
                    proxy.$message.warning("请输入手机号!");
                    return
                } else if (my.editInfo.name === "") {
                    proxy.$message.warning("请输入姓名!");
                    return
                } else if (my.editInfo.password.length<6) {
                    proxy.$message.warning("请输入大于等于6位的密码!");
                    return
                }
                let param={
                    _id:my.editInfo._id,
                    account:my.editInfo.account,
                    name:my.editInfo.name,
                    password:md5.md5(my.editInfo.password).substring(4),
                };
                await userStore.saveInfo(param).then(res=>{
                    proxy.$message.success("修改用户成功！");
                }).catch(res=>{
                    proxy.$message.error(res.msg);
                });
                await getList();
                addHandleClose();
                addForm.name='';
                addForm.account='';
                addForm.password='';
            };

            const handleSizeChange=async (val)=>{
                searchForm.limit=val;
                await getList();
            };
            const handleCurrentChange=async (val)=>{
                searchForm.page=val;
                await getList();
            };

            const reSet=async ()=>{
                searchForm.account='';
                await getList();
            };

            const getList=async ()=>{
                await userStore.fetchList(searchForm);
                my.userList=userStore.state.list;
                my.total=userStore.state.total;
            };
            getList();
            return {
                my,
                userInfo,
                addForm,
                searchForm,
                openAdd,
                openLook,
                openEdit,
                addHandleClose,
                addInfo,
                saveInfo,

                openUse,
                stopUse,
                deleteUser,

                getList,
                reSet,
                handleSizeChange,
                handleCurrentChange,
            }
        }
    }
</script>

<style lang="less" scoped>
    .userList {
        background-color: white;
        height: 100%;
        display: flex;
        flex-direction: column;       
        padding:10px;
        font-size: 14px;
        .breadcrumb{
            padding: 10px 10px 0 0px;
        }
        .searchDiv{
            height: 40px;
            line-height: 40px;         
            display: flex;
            padding:15px;
        }

    }
</style>
