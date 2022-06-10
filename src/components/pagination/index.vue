<template>
<!-- <el-config-provider :locale="locale"> -->
    <div class="pagination-box">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizeArr"
            :page-size="pageSize"
            :layout="layout"
            :total="total"
            background
        >
        </el-pagination>
    </div>
<!-- </el-config-provider> -->
</template>
<script>
/**
 * @description: 分页组件
 * @param {pageSize,total,pageSizeArr,currentPage} 参数入参名称
 */
// import {ElConfigProvider} from 'element-plus'
// import locale from 'element-plus/lib/locale/lang/zh-cn';
export default {
    // components:{
    //     ElConfigProvider
    // },
    props: {
        // 页码
        pageSize: {
            type: Number,
            default: 10
        },
        // 每页多少条记录
        pageSizeArr: {
            type: Array,
            default: () => [10, 20, 30, 40, 50, 100, 200]
        },
        // 总数
        total: {
            type: Number,
            default: () => 0
        },
        layout: {
            type: String,
            default: () => 'total, sizes, prev, pager, next, jumper'
        },
        // 当前页
        currentPage: {
            type: Number,
            default: () => 0
        },
        // 表格ref
        // tableRef: {
        //     type: String,
        //     default: () => 'multipleTable'
        // },
        // // 表格ref
        // refs: {
        //     type: Object,
        //     default: () => {}
        // }
    },
    data() {
        return {
            // locale:locale
        }
    },
    
    methods: {
        /**
         * @desc 每页多少条
         * */
        handleSizeChange(val) {
            this.$emit('fnHandleSize', val)
        },
        /**
         * @desc 当前页
         */
        handleCurrentChange(val) {
            this.$emit('fnHandleCurrent', val)
            // this.$nextTick(() => {
            //     this.refs.bodyWrapper.scrollTop = 0
            // })
        }
    }
}
</script>

