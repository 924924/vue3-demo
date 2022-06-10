<template>
    <div class="userForm">
        <div class="formItem">
            <div class="formItem_l">账号(手机号)：</div>
            <div>
                <span>{{formData.account}}</span>
            </div>
        </div>
        <div class="formItem">
            <div class="formItem_l">姓名：</div>
            <div>
                <span>{{formData.name}}</span>
            </div>
        </div>
        <div class="formItem">
            <div class="formItem_l">权限：</div>
            <div>
                <span v-if="lookFlag">{{formData.adminRole===20?'A':'B'}}</span>
                <el-radio-group v-model="formData.adminRole" v-else>
                    <el-radio :label="20">A</el-radio>
                    <el-radio :label="10">B</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive, getCurrentInstance} from 'vue';
    import {userStore} from "../../../store";

    export default {
        name: "userForm",
        props:{
            formData:Object,
            editFlag:Boolean,
            lookFlag:Boolean,
        },
        setup() {
            let {proxy} = getCurrentInstance();
            let my = reactive({});
            // 手机号判断
            const checkPhone = async (val) => {
                if(!proxy.editFlag&&!proxy.lookFlag){
                    await userStore.checkUser({account:val}).then(res=>{
                        if(res.user){
                            proxy.$message.error("手机号已被注册！");
                            proxy.formData.account='';
                        }
                    }).catch(res=>{
                        proxy.$message.error(res.msg);
                    })
                }
            };
            return {
                my,
                checkPhone,
            }
        }
    }
</script>

<style lang="less" scoped>
    .userForm{
        .formItem{
            display: flex;
            line-height: 40px;
            margin-bottom: 10px;
            .formItem_l{
                height: 40px;
                width: 120px;
                text-align: right;
            }
            .formInput{
                width: 220px;
            }
        }
    }
</style>
