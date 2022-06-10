<template>
    <div class="encapsulationDialog">
        <el-dialog
                :title="dialogTitle"
                v-model="dialogShow"
                @close="closeEmit"
                :before-close="handleClose"
                :width="dialogWidth">
            <slot></slot>
            <template #footer>
                <span class="dialog-footer">
                    <el-button v-if="dialogCancel" @click="cancelButt">取 消</el-button>
                    <el-button type="primary" @click="commonDialogButt">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {getCurrentInstance} from 'vue'

    export default {
        name: "Dialog",
        props: {
            dialogTitle: String,
            dialogShow: Boolean,
            dialogWidth: String,
            dialogCancel: Boolean,  // 是否需要取消按钮
            dialogClear: Boolean
        },
        setup(props){
            const {proxy} = getCurrentInstance();
            const commonDialogButt = async () => {
                proxy.$emit("addInAccountNumber")
            };
            const cancelButt = async () => {
                proxy.$emit("cancelButton")
            };
            const handleClose = async (done) => {
                done();
                if (props.dialogClear) {
                    proxy.$emit("cancelNotButton");
                }else {
                    proxy.$emit("cancelButton");
                }
            };
            // 弹窗关闭 事件
            const closeEmit = async () => {
                proxy.$emit("closeEmit")
            };
            return{
                commonDialogButt,
                cancelButt,
                handleClose,
                closeEmit
            }
        }
    }
</script>

<style scoped lang="less">
    .encapsulationDialog{}
</style>