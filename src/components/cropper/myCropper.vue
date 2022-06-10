<template>
    <div class="myCropper">
        <el-row>
            <el-col :span="12">
                <vue-picture-cropper
                        :boxStyle="{
                            width: '300px',
                            height: '300px',
                            backgroundColor: '#f8f8f8',
                            margin: 'auto'
                         }"
                        :img="my.originImg"
                        :options="{
                            width: '200px',
                            height: '200px',
                            minWidth:'200px',
                            minHeight:'200px',
                            viewMode: 1,
                            dragMode: 'crop',
                            aspectRatio: 1,
                            preview: '#show-preview',
                         }"
                        @ready="ready"></vue-picture-cropper>
            </el-col>
            <el-col :span="12">
                    <div id="show-preview" class="show-preview" style="width: 200px;height: 200px;overflow: hidden"></div>
            </el-col>
        </el-row>
        <div class="footerDiv">
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </div>


</template>

<script>
    import { defineComponent } from 'vue';
    import VuePictureCropper, { cropper } from 'vue-picture-cropper';
    import {reactive, getCurrentInstance} from 'vue';
    export default defineComponent({
        name:'myCropper',
        components: {
            VuePictureCropper
        },
        setup(){
            let {proxy} = getCurrentInstance();
            let my = reactive({
                fileObj:{},
                originImg:"",
                previewImg:'.show-preview',
            });

            const initDrawImage =(img)=>{
                my.fileObj=img;
                // console.log(my.fileObj);
                const reader = new FileReader();
                reader.onloadend = (e) => {
                    my.originImg=e.target.result;
                };
                reader.readAsDataURL(img);
            };
            const ready =()=>{
            };
            const confirm = async ()=>{
                const DATA_URL=cropper.getDataURL();
                let imgFile=dataURLtoFile(DATA_URL,my.fileObj.name);
                // console.log(imgFile);
                const res =  await proxy.$uploadFile("/upload/file", imgFile);
                // console.log(res);
                proxy.$emit("getCropImg",res.data);
            };

            const dataURLtoFile=(dataurl, filename) =>{//将base64转换为文件
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type:mime});
            };


            return{
                my,
                initDrawImage,
                ready,
                confirm,
            }
        }
    })
</script>
<style lang="less" scoped>
    .myCropper{
        padding-top: 20px;
        .footerDiv{
            margin-top: 20px;
            width: 100%;
            text-align: center;
        }
    }
</style>
