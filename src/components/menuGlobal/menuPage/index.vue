<template>
    <div class="menuPage h100p">
        <aside class="aside">
            <menu-aside></menu-aside>
        </aside>
        <section class="contentWrap">
            <div class="content">
                <header class="header">
                    <menu-header></menu-header>
                </header>
                <main class="main">
                    <router-view></router-view>
                </main>
            </div>
        </section>
    </div>
</template>

<script>
    import menuAside from '../menuAside/index';
    import menuHeader from '../menuHeader/index'

    export default {
        name: "index",
        components:{
            menuAside,
            menuHeader
        }
    }
</script>

<style scoped lang="less">
    .menuPage {
        height:100%;
        width:100%;
        min-width: 1366px;
        display: flex;
        justify-content: flex-start;
        .aside {            
            height: 100%;
            border-right: solid 1px #e6e6e6;                 
            background: url('~@/assets/web/bg1.png') ; 
            box-sizing: border-box;
        }
        .contentWrap {
            height: 100%;
            flex:1;
             background:#e9eef3 ;
            overflow-y: scroll;
           
            .content {               
                height: 100%;
                margin:0 10px;              
                display: flex;
                flex-direction: column;
                .header {
                    height: 40px;
                }
                .main {
                    flex: 1;
                    background-color: #e9eef3;
                    margin: 0px 0px;
                }
            }
        }
    }
</style>