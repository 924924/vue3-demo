<template>
    <div class="adminLogin">
        <div class="adminLogin_warp">
            <div class="adminLogin_Tab">               
                <div class="tit">
                <img src="@assets/web/logo5.png"/> 
                        
                </div>
                <p class="tab_color">账号登录</p>
                <div class="tab_loginSign">
                    <el-form ref="userParams" :model="userParamsObj" :rules="userParamsObjRules">
                        <el-form-item label prop="account" class="">
                            <el-input
                            prefix-icon="el-icon-s-custom"
                             v-model="userParamsObj.account" placeholder="请输入您的账号">
                            </el-input>
                        </el-form-item>
                        <el-form-item label prop="password" class="">
                            <el-input
                             prefix-icon="el-icon-lock"
                             v-model="userParamsObj.passwordTest" show-password placeholder="请输入密码">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="submitButton" @click="loginInAdmin()">立即登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    <!-- <div style="width:100%;height:100%">
         <el-carousel :interval="5000" arrow="always" class="adminLogin">
            <el-carousel-item v-for="item in imgArr.list" :key="item">
             <img :src="item.pic"/> 
            </el-carousel-item>
             <div class="adminLogin_warp">
            <div class="adminLogin_Tab">               
                <div class="tit">
                <img src="@assets/web/logo1.png"/> 
                        
                </div>
                <p class="tab_color">账号登录</p>
                <div class="tab_loginSign">
                    <el-form ref="userParams" :model="userParamsObj" :rules="userParamsObjRules">
                        <el-form-item label prop="account" class="">
                            <el-input
                            prefix-icon="el-icon-s-custom"
                             v-model="userParamsObj.account" placeholder="请输入您的账号">
                            </el-input>
                        </el-form-item>
                        <el-form-item label prop="password" class="">
                            <el-input
                             prefix-icon="el-icon-lock"
                             v-model="userParamsObj.passwordTest" show-password placeholder="请输入密码">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="submitButton" @click="loginInAdmin()">立即登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        </el-carousel>
    </div> -->

</template>

<script>
    import {reactive, getCurrentInstance} from 'vue'
    import {userStore} from '../../../../store'
    import md5 from "../../../../utils/crypto";
    export default {
        name: "login",
        setup(){
            let {proxy} = getCurrentInstance();
            const imgArr = reactive({
                list:[
                    {pic:require('@/assets/web/zongpu.png')},
                    // {pic:require('@/assets/web/zongpu1.png')},
                   
                ]
            })
            const userParamsObjRules = {
                account: {required: true, message: "请输入账号", trigger: "blur"},
                passwordTest: {required: true, message: "请输入密码", trigger: "blur"},
            };
            const userParamsObj = reactive({
                account: "",
                passwordTest: "",
                password: "",
            });
            const loginInAdmin = async () => {
                if (!userParamsObj.account)  {
                    proxy.$message.warning("请输入您的账号!");
                    return
                }else if (!userParamsObj.passwordTest) {
                    proxy.$message.warning("请输入密码!");
                    return
                }
                let param={
                    account:userParamsObj.account,
                    password:md5.md5(userParamsObj.passwordTest).substring(4),
                };
                await userStore.loginInfo(param).then( res =>{
                    proxy.$message.success("登陆成功!");
                    proxy.$router.push({
                        path: "/adminHome"
                    })
                }).catch(res => {
                    proxy.$message.error(res.msg);
                });
            };
            return{
                userParamsObjRules,
                userParamsObj,
                loginInAdmin,
                imgArr
            }
        }
    }
</script>

<style scoped lang="less">
    .adminLogin {
        width: 100%;
        height: 100%;
        background: url('~@/assets/web/zongpu.png') no-repeat  center 0px;
        background-position: center 0px;
        background-size: cover;
        .adminLogin_warp {
            position: relative;
            width: 1200px;
            // height: 806px;
            margin: 0 auto;

            .adminLogin_Tab {
                width: 420px;
                min-height: 480px;
                position: absolute;
                top: 97px;
                right:20px;
                background: #fff;
                border-radius: 5px;
                padding:5px;
                .tab_logo {
                    text-align: center;

                    img {
                        width: 80%;
                    }
                }

                .tit{
                    width:90%;  
                    margin:15px auto;  
                    margin-top: 30px;
                    // display: flex;
                    // justify-content: flex-start;
                    // align-items: center; 
                    // img{
                    //     width:71px;
                    //     height:68px;
                    // }
                }
                .tab_color {
                    color: #333;
                    font-size: 17px;
                    margin: 40px 0 20px 0;
                    padding-left:30px;
                }

                .tab_loginSign {
                    width:85%;
                    margin:0 auto;
                    .submitButton {
                        margin-top: 20px;
                        width: 100%;
                        height: 48px;
                        background: #B20B30;
                        color: #fff;
                        font-size: 20px;
                        font-weight: bolder;
                        border: none;
                        outline: none;
                    }
                     /deep/.el-input__icon{
                        font-size: 20px; 
                        margin-top: 5px;                                          
                    }
                     /deep/.el-input__inner{
                        height:50px;
                        line-height:50px;
                        // border: none;
                        // border-bottom: 1px solid #c0c4cc;
                        border-radius: 2px;
                        background: #fff;
                        text-indent: 10px;                      
                    }
                }

                .goInRegister {
                    display: flex;
                    flex-direction: row-reverse;
                    color: #4484ff;
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }
    }
    /deep/.el-carousel__container{
        width:100%;
        height:100%;
    }
</style>
