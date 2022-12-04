<template>
    <div class="recommend-manage-detail">
        <NavBar title="推荐阅读详情" />
        <van-cell-group>
            <van-cell size="large" title="标题" :label="detail.topic" />
            <van-cell size="large" title="消息内容" :label="detail.message" />
            <van-cell size="large" title="添加人" :label="detail.adminName" />
            <van-cell
                size="large"
                title="创建日期"
                :label="detail.createTime"
            />
            <van-cell
                size="large"
                title="截止日期"
                :label="detail.expireTime"
            />
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
                        .post(`/qkys/api/admin/deleteSystemMsg`, {
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
