<template>
    <div class="mine-page">
        <div class="mine-page-title">
            我的
        </div>
        <div class="mine-page-content">
            <van-cell-group>
                <van-cell
                    title="个人信息"
                    size="large"
                    is-link
                    url="/patients/personal-information"
                    icon="user-o"
                />
                <van-cell
                    title="个人病例"
                    size="large"
                    is-link
                    url="/patients/personal-cases"
                    icon="orders-o"
                />
                <van-cell
                    title="我的消息"
                    size="large"
                    is-link
                    url="/vant/mobile.html"
                    icon="chat-o"
                />
                <van-cell
                    title="清理缓存"
                    size="large"
                    is-link
                    url="/vant/mobile.html"
                    icon="brush-o"
                />
                <van-cell
                    title="系统更新"
                    size="large"
                    is-link
                    url="/vant/mobile.html"
                    icon="info-o"
                />
                <van-cell
                    title="意见与建议"
                    size="large"
                    is-link
                    url="/vant/mobile.html"
                    icon="question-o"
                />
            </van-cell-group>
        </div>

        <TabBar :nowKey="3"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';
import { Cell, CellGroup } from 'vant';
export default {
    data() {
        return {};
    },
    methods: {},
    components: {
        TabBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
    },
};
</script>

<style lang="less" scoped>
.mine-page {
    padding: 10px 8px;
    .mine-page-title {
        margin-bottom: 24px;
        font-size: 28px;
        text-align: center;
    }
    .mine-page-content {
        .item-btn {
            border-bottom: 1px solid #9e9e9e;
            padding: 10px 5px;
            font-size: 22px;
        }
    }
}
</style>
