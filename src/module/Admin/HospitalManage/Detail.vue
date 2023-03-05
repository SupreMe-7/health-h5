<template>
    <div class="hospital-manage-detail">
        <NavBar title="机构详情" />
        <van-cell-group>
            <van-cell size="large" title="医院名称" :label="detail.hospital" />
            <van-cell
                size="large"
                title="医院地址"
                :label="`${detail.province}${detail.city}${detail.district}`"
            />
            <van-cell size="large" title="医院级别" :label="detail.level" />
        </van-cell-group>
        <div class="btn-group">
            <van-button type="danger" @click="deleteMsg">删除</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

import { Cell, CellGroup, Button, Toast, Dialog } from 'vant';
export default {
    data() {
        return {
            adminId: null,
            detail: {},
        };
    },
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
        this.detail = JSON.parse(this.$route.query.detail);
    },
    methods: {
        deleteMsg() {
            Dialog.confirm({
                title: '确认删除',
            })
                .then(() => {
                    this.$api
                        .post(`/qkys/api/admin/deleteHospital`, {
                            id: this.detail.id,
                            adminId: this.adminId,
                        })
                        .then(() => {
                            this.$router.back();
                        })
                        .catch(e => {
                            Toast(e.errMsg);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
    },
    components: {
        NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Button.name]: Button,
    },
};
</script>

<style lang="less" scoped>
.btn-group {
    text-align: right;
    padding: 20px;
}
</style>
