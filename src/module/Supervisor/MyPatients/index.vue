<template>
    <div class="my-patients">
        <NavBar title="我的患者" />
        <div v-for="(item, index) in list" :key="index" class="item">
            <van-row>
                <van-col span="12">姓名: {{ item.name }}</van-col>
                <van-col span="12">全科医生: {{ item.docName }}</van-col>
            </van-row>
            <div>
                地址: {{ item.province }}{{ item.city }}{{ item.district }}
            </div>
            <div class="btn-group">
                <van-button
                    type="info"
                    size="small"
                    :to="`/supervisor/patients-information?pId=${item.pId}`"
                    round
                    >患者信息</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    :to="`/supervisor/patients-calendar?pId=${item.pId}`"
                    round
                    >监测日记</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    :to="`/supervisor/patients-cases?pId=${item.pId}`"
                    round
                    >患者病历</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    :to="
                        `/supervisor/diagnosis-advice?pId=${item.pId}&dId=${item.dId}`
                    "
                    round
                    >诊疗建议</van-button
                >
                <van-button
                    type="info"
                    size="small"
                    :to="`/supervisor/consult?pId=${item.pId}`"
                    round
                    >医生咨询</van-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

import { Button, Col, Row, Toast } from 'vant';
export default {
    data() {
        return {
            sId: null,
            list: [],
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
        [Button.name]: Button,
    },
    async mounted() {
        this.sId = sessionStorage.getItem('SID');
        await this.getPatients();
    },
    methods: {
        getPatients() {
            this.$api
                .get(`/qkys/api/sup/getPatientsBySuPId/${this.sId}`)
                .then(res => {
                    const { data = [] } = res;
                    this.list = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
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
