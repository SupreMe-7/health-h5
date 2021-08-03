<template>
    <div class="my-doctor">
        <div class="title">我管理的全科医生</div>
        <div v-for="(item, index) in list" :key="index" class="item">
            <div>{{ item.name }}医生</div>
            <div>{{ item.hospital }}医院</div>
            <div class="btn-group">
                <van-button type="info" @click="check(item.id)"
                    >医生信息</van-button
                >
                <van-button type="info" @click="check(item.id)"
                    >管理的患者</van-button
                >
                <van-button type="info" @click="check(item.id)"
                    >医生咨询</van-button
                >
            </div>
        </div>
        <TabBar type="supervisor" :nowKey="1"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';

import { Button } from 'vant';
export default {
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'xxx',
                    hospital: '哈尔滨',
                    time: '20166',
                },
                {
                    id: 2,
                    name: 'xxx医生',
                    time: '2016',
                    content: '情况说明',
                    msg: '咨询内容',
                },
            ],
        };
    },
    components: {
        TabBar,
        [Button.name]: Button,
    },
    async mounted() {
        await this.getDoctor();
    },
    methods: {
        getDoctor() {
            console.log('获取我的医生');
        },
        check(id) {
            console.log(id);
        },
    },
};
</script>

<style lang="less" scoped>
.my-doctor {
    .title {
        margin: 15px 0 0 0;
        text-align: center;
        font-size: 24px;
    }
    .item {
        padding: 10px;
        border-bottom: 1px solid rgb(120, 117, 117);
        .btn-group {
            padding: 0 10px 0 0;
            margin: 10px 0 0 0;
            .van-button {
                margin: 0 10px 0 0;
            }
        }
    }
}
</style>
