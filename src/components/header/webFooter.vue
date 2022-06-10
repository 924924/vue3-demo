<template>
<!--    <div class="webFooter">-->
<!--        <div class="footerFlexCol">-->
<!--            <div class="footerList">-->
<!--                <span v-for="(item,index) in footer.footerList" :key="index + 'a'" class="listFlex">-->
<!--                    <span>{{item.label}}</span>-->
<!--                    <span v-if="!item.last">|</span>-->
<!--                </span>-->
<!--            </div>-->
<!--            <div class="footerText">-->
<!--                <p>北京佰策邦信用管理公司 版权所有</p>-->
<!--                <p>c2015 xincn.com 京ICP备 15054876号-2</p>-->
<!--                <p>地址：北京市东城区东中街9号东环广场A座五层J-L室 电话：010-57015798</p>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
    import footerList from '@/components/projectFooter'
    import {reactive} from 'vue'

    export default {
        name: "webFooter",
        setup() {
            const footer = reactive({
                footerList,
            });
            return {
                footer
            }
        }
    }
</script>

<style scoped lang="less">
    .webFooter {
        background: #fff;
        width: 1200px;
        height: 200px;
        text-align: center;
        font-size: 14px;
        margin: 0 auto;
        color: #000;

        .footerFlexCol {
            display: flex;
            flex-direction: column;
            justify-content: center;

            div {
                margin: 20px 0;
            }

            .footerList {
                .listFlex {
                    cursor: pointer;

                    span {
                        margin: 0 5px;
                    }
                }
            }

            .footerText {
                p {
                    margin: 5px 0;
                }
            }
        }
    }
</style>
