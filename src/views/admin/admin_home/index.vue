<template>
    <div class="adminMain">
        <menu-page></menu-page>
    </div>
</template>

<script>
    import menuPage from '@/components/menuGlobal/menuPage'

    export default {
        name: "index",
        components: {menuPage}
    }
</script>

<style scoped lang="less">
    // .adminMain-box{
    //     height: 100%;
    // }
</style>
