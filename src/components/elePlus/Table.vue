<template>
    <div class="encapsulationTable">
        <el-table
                :data="tableData"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    v-if="isShowSelect"
                    type="selection"
                    align="center">
            </el-table-column>
            <el-table-column
                    v-if="isShowIndex"
                    type="index"
                    label="序号"
                    align="center"
                    width="60">
            </el-table-column>
            <el-table-column v-for="(item,index) in tableHeader"
                             :key="index + 'a'"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width ? item.width : ''"
                             :align="item.center ? item.center : 'center'">
                <template #default="scope">
                    <!-- 若需特殊处理，使用插槽返回 -->
                    <slot v-if="item.slotName" :name="item.slotName" :scope="scope"></slot>
                    <span v-else>
                        {{scope.row[item.prop]}}
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="margin-top: 10px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="pageSizesArr"
                :page-size="pageSize"
                :current-page.sync="currentPageInfo"
                :page-size.sync="currentLimitInfo"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userTableTotal">
        </el-pagination>
    </div>
</template>

<script>
    import {getCurrentInstance} from 'vue'

    export default {
        name: "Table",
        props: {
            tableData: Array,
            tableHeader: Array,
            tabHeight: String,
            loading: Boolean,
            isShowIndex: Boolean, // 是否需要 序列
            isShowSelect: Boolean, // 是否需要 多选列
            pageSizesArr: Array,
            pageSize: Number,
            userTableTotal: Number,
            currentPageInfo: Number,
            currentLimitInfo: Number
        },
        setup() {
            const {proxy} = getCurrentInstance();
            // limit
            const handleSizeChange = async (val) => {
                proxy.$emit("commonHandleSize", val)
            };
            // page
            const handleCurrentChange = async (val) => {
                proxy.$emit("commonHandleCurrent", val)
            };
            return {
                handleSizeChange,
                handleCurrentChange,
            }
        }
    }
</script>

<style scoped lang="less">
    .encapsulationTable {

    }
</style>