<template>
    <div class="my-sufferer">
        <NavBar title="患者详情" />
        <div v-for="(item, index) in list" :key="index">
            <div class="item" v-if="+item.pId === +pId">
                <div class="left">
                    <div class="name">{{ item.name }}</div>
                    <div class="address">
                        {{ item.province }}{{ item.city }}{{ item.district }}
                    </div>
                </div>
                <div class="btn-group">
                    <van-button
                        size="small"
                        round
                        :to="`/supervisor/patients-information?pId=${item.pId}`"
                        >患者信息</van-button
                    >
                    <van-button
                        size="small"
                        round
                        :to="`/supervisor/patients-calendar?pId=${item.pId}`"
                        >监测日记</van-button
                    >
                    <van-button
                        size="small"
                        round
                        :to="`/supervisor/patients-cases?pId=${item.pId}`"
                        >患者病历</van-button
                    >
                    <van-button
                        size="small"
                        round
                        :to="
                            `/supervisor/diagnosis-advice?pId=${item.pId}&dId=${dId}`
                        "
                        >诊疗建议</van-button
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
            pId: null,
            dId: null,
            list: [],
        };
    },
    computed: {},
    async mounted() {
        this.dId = this.$route.query.dId;
        this.pId = this.$route.query.pId;
        await this.getPatients();
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        NavBar,
    },
    methods: {
        getPatients() {
            this.$api
                .get(`/qkys/api/sup/getPatientsByDId/${this.dId}`)
                .then(res => {
                    const { data = [] } = res;
                    this.list = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-sufferer {
    padding: 10px;
    .title {
        text-align: center;
        font-size: 22px;
    }
    .left {
        flex-grow: 1;
    }
    .name {
        font-size: 16px;
    }
    .address {
        margin: 3px 0;
        font-size: 14px;
        color: #5f5b5b;
    }
    .btn-group {
        .van-button {
            margin-right: 4px;
        }
    }
}
</style>
