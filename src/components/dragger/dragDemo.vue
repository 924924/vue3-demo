<template>
    <div class="dragDemo">
        <div class="test_wrapper" @dragover="dragover($event)">
                <div v-for="(item) in my.dataList" :key='item.id' class="sort-item"
                     :draggable="true"
                     @dragstart="dragstart($event,item)"
                     @dragenter="dragenter($event,item)"
                     @dragend="dragend($event,item)"
                     @dragover="dragover"
                >
                    {{ item.label}}
                </div>
        </div>
    </div>
</template>

<script>
    import {reactive, getCurrentInstance} from 'vue';

    export default {
        name: "dragDemo",
        setup() {
            let {proxy} = getCurrentInstance();
            let my = reactive({
                oldData:{},
                newData:{},
                dataList:[
                    { id:1,label:'测试一号' },
                    { id:2,label:'测试二号' },
                    { id:3,label:'测试三号' },
                    { id:4,label:'测试四号' },
                ],
            });

            const dragstart=(e,value)=>{
                my.oldData = value;
            };
            // 记录移动过程中信息
            const dragenter=(e,value) =>{
                my.newData = value;
                if (my.oldData !== my.newData) {
                    let oldIndex = my.dataList.indexOf(my.oldData);
                    let newIndex = my.dataList.indexOf(my.newData);
                    let newItems = [...my.dataList];
                    // 删除老的节点
                    newItems.splice(oldIndex, 1);
                    // 在列表中目标位置增加新的节点
                    newItems.splice(newIndex, 0, my.oldData);
                    my.dataList = [...newItems]
                }
            };
            const dragend=(e,item)=>{

            };
            const  dragover=(e) =>{
            };
            return {
                my,
                dragenter,
                dragstart,
                dragend,
                dragover,
            }
        }
    }
</script>

<style lang="less" scoped>
    .dragDemo{
        .sort-item{
            margin-bottom: 20px;
            border: 1px dotted #cccccc;
            width: 200px;
        }
    }
</style>
