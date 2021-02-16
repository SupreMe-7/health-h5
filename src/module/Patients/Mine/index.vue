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
                    icon="user-o"
                    @click="jumpUrl('/patients/personal-information')"
                />
                <van-cell
                    title="个人病例"
                    size="large"
                    is-link
                    icon="orders-o"
                    @click="jumpUrl('/patients/personal-cases')"
                />
                <van-cell
                    title="我的消息"
                    size="large"
                    is-link
                    icon="chat-o"
                    @click="jumpUrl('/patients/notice')"
                />
                <van-cell
                    title="清理缓存"
                    size="large"
                    is-link
                    icon="brush-o"
                    @click="jumpUrl('/patients/notice')"
                />
                <van-cell
                    title="系统更新"
                    size="large"
                    is-link
                    icon="info-o"
                    @click="jumpUrl('/patients/notice')"
                />
                <van-cell
                    title="意见与建议"
                    size="large"
                    is-link
                    @click="jumpUrl('/patients/notice')"
                    icon="question-o"
                />
                <van-cell
                    title="退出登录"
                    size="large"
                    is-link
                    @click="jumpUrl('/patients/notice')"
                    icon="revoke"
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
    methods: {
        jumpUrl(url) {
            this.$router.push(url);
        },
    },
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
