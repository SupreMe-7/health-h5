<template>
    <div class="diagnosis-advice">
        <NavBar title="诊疗建议" />
        <van-tabs v-model="active">
            <van-tab title="全科医生">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div
                        class="item"
                        v-for="(item, index) in firstList"
                        :key="index"
                    >
                        <div class="item-title">
                            <span>医生: 格台</span>
                            <span>时间: 2020-10-10</span>
                        </div>
                        <div class="item-content">
                            建议:s水电费违法威风威风无法违反微服务范围分为服务费违反威风威风我违反微服务发FFAF
                            fewef wef we fwf wfwe fww分违反微服务访问访问发
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="主管医生">内容 2</van-tab>
        </van-tabs>
    </div>
</template>

<script>
// 诊疗建议
import { Tab, Tabs, List } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            firstList: [],
            active: 0,
            loading: false,
            finished: false,
        };
    },
    computed: {},
    mounted() {},
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        NavBar,
    },
    methods: {
        onLoad() {
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.firstList.push(this.firstList.length + 1);
                }

                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.firstList.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        },
    },
};
</script>

<style lang="less" scoped>
.diagnosis-advice {
    padding: 0 10px;
    .item {
        margin: 10px;
        padding: 10px;
        border: 1px solid #e2e2e2;
        .item-title {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
