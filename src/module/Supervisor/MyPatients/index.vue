<template>
    <div class="my-patients">
        <NavBar title="我的患者" />
        <div v-for="(item, index) in list" :key="index" class="item">
            <van-row>
                <van-col span="12">姓名: {{ item.name }}</van-col>
                <van-col span="12">全科医生: {{ item.doctor }}</van-col>
            </van-row>
            <div>地址: {{ item.address }}</div>
            <div class="btn-group">
                <van-button
                    type="info"
                    size="small"
                    @click="check(item.id)"
                    round
                    >患者信息</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    @click="check(item.id)"
                    round
                    >监测日记</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    @click="check(item.id)"
                    round
                    >患者病历</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    @click="check(item.id)"
                    round
                    >诊疗建议</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    @click="check(item.id)"
                    round
                    >医生咨询</van-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

import { Button, Col, Row } from 'vant';
export default {
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'xxx',
                    doctor: '医生',
                    address: '地址',
                },
                {
                    id: 2,
                    name: 'xxx医生',
                    doctor: '医生',
                    address: '地址',
                },
            ],
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
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
.my-patients {
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
                margin: 0 10px 5px 0;
            }
        }
    }
}
</style>
