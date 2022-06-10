<template>
    <div class="webHead">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
                <span class="menuTitle">{{title}}</span>
            </el-menu-item>
            <el-button v-if="rightBtn" class="addBtn" type="primary" size="mini" @click="btnClick">{{btnText}}</el-button>
        </el-menu>
    </div>
</template>

<script>
    import {getCurrentInstance} from 'vue';
    export default {
        name: "webHead",
        props:{
            title:String,
            rightBtn:Boolean,
            btnText:String,
        },
        setup() {
            let {proxy} = getCurrentInstance();
            const btnClick=()=>{
                proxy.$emit("btnClick");
            };
            return {
                btnClick,
            }
        }
    }
</script>

<style lang="less" scoped>
    .webHead{
        .menuTitle{
            font-size: 16px;
        }
        .addBtn{
            margin-top: 14px;
            float: right;
        }
    }
</style>
