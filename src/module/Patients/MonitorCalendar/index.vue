<template>
    <div class="monitor-calendar">
        <van-tabs v-model="active">
            <van-tab title="血压">内容 1</van-tab>
            <van-tab title="血糖">内容 2</van-tab>
            <van-tab title="运动">内容 3</van-tab>
            <van-tab title="饮食">内容 4</van-tab>
        </van-tabs>
        <TabBar :nowKey="1"></TabBar>
    </div>
</template>

<script>
import { Button, Cell, CellGroup, Tab, Tabs } from 'vant';
import TabBar from '@/components/TabBar.vue';
export default {
    data() {
        return {
            active: 0,
        };
    },
    computed: {},
    mounted() {},
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        TabBar,
        // [Icon.name]: Icon,
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.monitor-calendar {
}
</style>
