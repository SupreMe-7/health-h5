<template>
    <div class="recommend-manage-detail">
        <NavBar title="推荐阅读详情" />
        <van-cell-group>
            <van-cell
                size="large"
                title="标题"
                :label="recommendDeatil.title"
            />
            <van-cell
                size="large"
                title="简介"
                :label="recommendDeatil.introduction"
            />
            <van-cell
                size="large"
                title="引用网站"
                :label="recommendDeatil.website"
            />
            <van-cell
                size="large"
                title="网址"
                :label="recommendDeatil.url"
                :url="recommendDeatil.url"
            />
            <van-cell
                size="large"
                title="阅读用户"
                :label="USER_MAP[recommendDeatil.role]"
            />
            <van-cell
                size="large"
                title="图片数量"
                :label="recommendDeatil.picNum"
            />
            <van-cell
                size="large"
                title="创建时间"
                :label="recommendDeatil.createTime"
            />
            <van-cell
                size="large"
                title="创建人"
                :label="recommendDeatil.adminName"
            />
        </van-cell-group>
        <div class="btn-group">
            <van-button type="danger" @click="deleteRead">删除</van-button>
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
            USER_MAP: {
                Doc: '医生',
                Pa: '患者',
                All: '所有人',
            },
            recommendDeatil: {},
        };
    },
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
        this.recommendDeatil = JSON.parse(this.$route.query.detail);
    },
    methods: {
        deleteRead() {
            Dialog.confirm({
                title: '确认删除',
            })
                .then(() => {
                    this.$api
                        .post(`/qkys/api/admin/deleteRecommandRead`, {
                            id: this.recommendDeatil.id,
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
