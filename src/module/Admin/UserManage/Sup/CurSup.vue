<template>
    <div class="my-sufferer">
        <NavBar title="上级医生菜单" />
        <div class="item">
            <div class="left">
                <div class="name">
                    <div>{{ data.name }}</div>
                    <div>
                        <van-button type="danger" @click="clear"
                            >注销</van-button
                        >
                    </div>
                </div>
                <div class="time">
                    上次登录时间：{{ data.lastLoginTime || '暂无' }}
                </div>
            </div>
            <div>
                <van-button
                    round
                    :to="
                        `/admin/user-manage/sup/sup-information?sId=${this.sId}`
                    "
                    >一般信息</van-button
                >
                <van-button
                    round
                    :to="
                        `/admin/user-manage/sup/sup-manage-doc?sId=${this.sId}`
                    "
                    >管理的全科医生</van-button
                >
                <van-button
                    round
                    :to="
                        `/admin/user-manage/sup/sup-doc-consult?sId=${this.sId}`
                    "
                    >全科医生咨询</van-button
                >
            </div>
            <van-divider />
        </div>
    </div>
</template>

<script>
import { Button, Divider, Toast, Dialog } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            adminId: null,
            sId: null,
            data: {},
        };
    },
    computed: {},
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
        this.sId = this.$route.query.sId;
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
                .get(`/qkys/api/admin/getSuperiorBySupId/${this.sId}`)
                .then(res => {
                    const { data } = res;
                    this.data = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        clear() {
            Dialog.confirm({
                title: '注销',
                message: '确认注销该用户，注销后无法恢复',
            })
                .then(() => {
                    this.$api
                        .get(
                            `/qkys/api/admin/clearSuperiorInfoBySupId/${this.sId}/${this.adminId}`
                        )
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
        display: flex;
        justify-content: space-between;
    }
    .time {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #5f5b5b;
    }
    .doctor {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #5f5b5b;
    }
}
</style>
