<template>
    <div class="my-doctor">
        <div class="title">我管理的全科医生</div>
        <div v-for="(item, index) in list" :key="index" class="item">
            <div>{{ item.name }}医生</div>
            <div>{{ item.hospital }}</div>
            <div class="btn-group">
                <van-button
                    type="info"
                    :to="`/supervisor/doctor-information?dId=${item.id}`"
                    >医生信息</van-button
                >
                <van-button
                    type="info"
                    :to="`/supervisor/manage-patients?dId=${item.id}`"
                    >管理的患者</van-button
                >
                <van-button
                    type="info"
                    :to="`/supervisor/doctor-consult?dId=${item.id}`"
                    >医生咨询</van-button
                >
            </div>
        </div>
        <TabBar type="supervisor" :nowKey="1"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';

import { Button, Toast } from 'vant';
export default {
    data() {
        return {
            sId: null,
            list: [],
        };
    },
    components: {
        TabBar,
        [Button.name]: Button,
    },
    async mounted() {
        this.sId = sessionStorage.getItem('SID');
        await this.getDoctor();
    },
    methods: {
        getDoctor() {
            this.$api
                .get(`/qkys/api/sup/getDocsBySupId/${this.sId}`)
                .then(res => {
                    this.list = res.data;
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
