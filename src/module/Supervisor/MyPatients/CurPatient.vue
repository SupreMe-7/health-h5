<template>
    <div class="my-sufferer">
        <NavBar title="患者菜单" />
        <div class="item">
            <div class="left">
                <div class="name">{{ data.pName }}</div>
                <div class="supervisor" @click="checkDoc(data.dId)">
                    全科医生：{{ data.dName || '暂无全科医生' }}
                </div>
            </div>
            <div>
                <van-button
                    round
                    :to="`/supervisor/patients-information?pId=${data.pId}`"
                    >患者信息</van-button
                >
                <van-button
                    round
                    :to="`/supervisor/patients-calendar?pId=${data.pId}`"
                    >监测回顾</van-button
                >
                <van-button
                    round
                    :to="
                        `/supervisor/patients-cases?pId=${data.pId}&supId=${data.supId}`
                    "
                    >患者病历</van-button
                >
                <van-button
                    round
                    :to="`/supervisor/diagnosis-advice?pId=${data.pId}`"
                    >医生建议</van-button
                >
                <van-button round :to="`/supervisor/consult?pId=${data.pId}`"
                    >上级医生咨询</van-button
                >
            </div>
        </div>
        <van-divider />
    </div>
</template>

<script>
import { Button, Divider } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            sId: null,
            pId: null,
            data: {},
        };
    },
    computed: {},
    mounted() {
        this.sId = sessionStorage.getItem('SID');
        this.pId = this.$route.query.pId;
        this.data = this.$route.query;
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        NavBar,
    },
    methods: {
        checkDoc(dId) {
            this.$router.push(`/supervisor/doctor-info?dId=${dId}`);
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
    .supervisor {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #5f5b5b;
    }
}
</style>
