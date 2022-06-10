<template>
    <div v-html="getCode.verifyData" @click="getVerifyCode" class="div1"></div>
</template>

<script>
    import {ref, reactive, getCurrentInstance} from 'vue'

    export default {
        name: "verifyCode",
        setup(){
            let {proxy} = getCurrentInstance();
            const getCode = reactive({
                verifyData: '',
            });
            const getVerifyCode = async () => {
                const res = await proxy.$get("/captcha/refresh");
                let code = res.replace(/scirp/g,'cgy');
                // code = code.replace('130','90');
                // code =  code.slice(0,4) + ' viewBox="30 -5 70 30"' + code.slice(4);
                getCode.verifyData = code
            };
            getVerifyCode();
            return {
                getCode,
                getVerifyCode
            }
        }
    }
</script>

<style scoped>

</style>