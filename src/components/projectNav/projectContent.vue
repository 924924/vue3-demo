<template>
    <div class="projectContent">
        <el-container>
            <el-main>
                <slot name="main"></slot>
            </el-main>
            <el-aside :width="slotWidth">
                <slot name="aside"></slot>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "projectContent",
        props: {
            slotWidth: String
        }
    }
</script>

<style scoped lang="less">
    .projectContent{
        margin: 20px 0;

        .el-aside {
            margin-left: 5px;
        }

        .el-main {
            margin-right: 5px;
            padding-top: 0;
            padding-left: 0;
        }
    }
</style>