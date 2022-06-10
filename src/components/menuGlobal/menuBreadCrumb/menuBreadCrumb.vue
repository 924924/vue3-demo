<template>
    <div class="menuBreadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
            <el-breadcrumb-item>
                <router-link tag="a" class="tab-item" to="/adminHome/home">
                    主页
                </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item
                    v-for="(item, index) in menuBread.menuArray"
                    :key="index"
                    :to="item.bPath"
                    :class="[index === menuBread.menuArray.length - 1 ? 'highlight' : '']"
            >{{menuBread.breadCrumbObj[item.bName]}}</el-breadcrumb-item>
        </el-breadcrumb>
        <slot></slot>
    </div>
</template>

<script>
    import breadCommon from '@/menuCommon/adminBreadCrumb'
    import {reactive, getCurrentInstance, onMounted} from 'vue'

    export default {
        name: "menuBreadCrumb",
        setup(){
            let {proxy} = getCurrentInstance();
            const menuBread = reactive({
                menuArray: [],
                breadCrumbObj: breadCommon.breadCrumb
            });
            const splitSlash = async () => {
                let temp = [];
                let path = proxy.$route.path;
                if (path === "/adminHome/home") {
                    proxy.menuBread.menuArray = [{ bName: "首页导航", bPath: "" }];
                    return;
                }
                let pathArray = path.split("/");
                pathArray.splice(0, 1);
                for (let i = 0; i < pathArray.length; i++) {
                    let obj = {};
                    if (i === 0) {
                        obj.bName = `/${pathArray[i]}`;
                        obj.bPath = "";
                        temp.push(obj);
                    } else {
                        let bName = "";
                        let bPath = "";
                        for (let k = 0; k <= i; k++) {
                            bName += `/${pathArray[k]}`;
                            bPath += `/${pathArray[k]}`;
                            if (k === i) {
                                obj.bName = bName;
                                obj.bPath = bPath;
                                temp.push(obj);
                            }
                        }
                    }
                }
                proxy.menuBread.menuArray = temp;
                proxy.$nextTick(() => {
                    // 第一个分隔符隐藏
                    let arrow = document.querySelectorAll(".el-icon-arrow-right");
                    arrow[0].style.display = "none";
                    // 第一个文字margin-right为 8px
                    let breadcrumb = document.querySelectorAll(".el-breadcrumb__item");
                    breadcrumb[0].style.marginRight = "8px";
                });
            };
            onMounted(() => {
                splitSlash()
            });
            return{
                menuBread
            }
        }
    }
</script>

<style scoped lang="less">
    .menuBreadCrumb {
        background: #fff;
        height: 40px;
        border-radius: 5px;
        line-height: 40px;
        font-size: 14px;
        box-sizing: border-box;
        padding: 0 16px;
        position: relative;
        .firsttag {
            float: left;
        }
        .el-breadcrumb__separator[class*="icon"]:first-child {
            color: #4484ff;
        }
        .el-breadcrumb {
            padding-top: 12px;
            .el-breadcrumb__inner.is-link {
                font-weight: normal;
            }
            .highlight {

                .el-breadcrumb__inner {
                    color: #4484ff;
                }
            }
        }
    }
</style>