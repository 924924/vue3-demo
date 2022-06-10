<template>
    <div class="mainNav">
        <div class="mainNavContent">
            <ul class="navTab">
                <li v-for="(nav,index) in headerNav.headerNavList" :key="index" :id="nav.id"
                    class="tabLi"
                    :class="{'active': index === nav.isActive}"
                    @click="headerNavClick(nav,index)">
                    <span style="color: white">{{nav.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {reactive} from 'vue'
    import {useRouter} from 'vue-router'

    export default {
        name: "index",
        setup() {
            const Router = useRouter();
            const headerNav = reactive({
                headerNavList: [
                    {
                        router: "/projectMain/selectProject",
                        title: "甄选项目",
                        isActive: 0
                    },
                ]
            });
            const headerNavClick = (nav,index) => {
                for (let item of headerNav.headerNavList){
                    item.isActive = ''
                }
                nav.isActive = index;
                Router.push({
                    path: nav.router
                })
            };
            return {
                headerNav,
                headerNavClick
            }
        }
    }
</script>

<style scoped lang="less">
    .mainNav {
        background: #39c84a;

        .mainNavContent {
            width: 1200px;
            margin: 0 auto;
            height: 56px;
            background: #39c84a;
            line-height: 56px;
            display: flex;

            .navTab {
                padding: 0 10px;
                text-align: center;
                cursor: pointer;
                color: #fff;
                margin: 0 5px;
                list-style-type: none;
                display: flex;
                .tabLi{
                    flex: 1;
                    padding: 0 5px;
                    cursor: pointer
                }
            }

            .active {
                background: darkgreen;
                color: white;
            }
        }
    }
</style>