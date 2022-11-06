<template>
    <div class="my-sufferer">
        <NavBar title="患者菜单" />
        <div class="item">
            <div class="left">
                <div class="name">{{ data.name }}</div>
                <div class="doctor" @click="checkSup(data.supId, data.pId)">
                    上级医生：{{ data.supName || '暂无上级医生' }}
                </div>
            </div>
            <div>
                <van-button
                    round
                    :to="`/doctor/sufferer-information?pId=${data.pId}`"
                    >一般信息</van-button
                >
                <van-button
                    round
                    :to="`/doctor/sufferer-calendar?pId=${data.pId}`"
                    >监测回顾</van-button
                >
                <van-button
                    round
                    :to="
                        `/doctor/sufferer-cases?pId=${data.pId}&supId=${data.supId}`
                    "
                    >患者病历</van-button
                >
                <van-button
                    round
                    :to="`/doctor/diagnosis-advice?pId=${data.pId}`"
                    >医生建议</van-button
                >
                <van-button
                    round
                    :to="
                        `/doctor/patient-chat?pId=${data.pId}&name=${data.name}`
                    "
                    >患者咨询</van-button
                >
                <div>
                    <van-button
                        :disabled="!data.supId"
                        round
                        :to="
                            `/doctor/ask-superior?pId=${data.pId}&name=${data.name}&supId=${data.supId}`
                        "
                        >咨询上级医生</van-button
                    >
                    <van-button
                        :disabled="!data.supId"
                        round
                        :to="`/doctor/my-consultation?pId=${data.pId}`"
                        >查询上级医生咨询</van-button
                    >
                </div>
            </div>
            <van-divider />
        </div>
    </div>
</template>

<script>
import { Button, Divider, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            dId: null,
            data: {},
        };
    },
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
        this.pId = this.$route.query.pId;
        this.getData();
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        NavBar,
    },
    methods: {
        getData() {
            this.$api
                .get(`/qkys/api/doc/getPatientSupByPId/${this.pId}`)
                .then(res => {
                    const { data } = res;
                    this.data = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        checkSup(supId, pId) {
            this.$router.push(`/doctor/sup-doctor?supId=${supId}&pId=${pId}`);
        },
    },
};
</script>

<style lang="less" scoped>
.my-sufferer {
    padding: 10px;
    .title {
        margin-bottom: 12px;
        text-align: center;
        font-size: 22px;
    }
    .item {
        .van-button {
            margin-right: 4px;
            margin-bottom: 4px;
        }
    }
    .left {
        flex-grow: 1;
    }
    .name {
        margin: 10px 0;
        font-size: 26px;
    }
    .doctor {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #5f5b5b;
    }
}
</style>
