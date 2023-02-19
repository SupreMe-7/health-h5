<template>
    <div class="my-sufferer">
        <NavBar title="全科医生菜单" />
        <div class="item">
            <div class="left">
                <div class="name">
                    <div>{{ data.name }}</div>
                    <div>
                        <van-button type="danger" @click="clearShow = true"
                            >注销</van-button
                        >
                    </div>
                </div>
                <div class="time">
                    上次登录时间：{{ data.lastLoginTime || '暂无' }}
                </div>
                <div
                    v-for="(item, index) in data.superiors"
                    :key="index"
                    class="doctor"
                >
                    上级医生：{{ item.supName }}
                </div>
            </div>
            <div>
                <van-button
                    round
                    :to="
                        `/admin/user-manage/doc/doc-information?dId=${this.dId}`
                    "
                    >一般信息</van-button
                >
                <van-button
                    round
                    :to="`/admin/user-manage/doc/doc-manage-pa?dId=${this.dId}`"
                    >管理的患者</van-button
                >
                <van-button
                    round
                    :to="
                        `/admin/user-manage/doc/doc-sup-consult?dId=${this.dId}`
                    "
                    >上级医生咨询</van-button
                >
            </div>
            <van-divider />
        </div>
        <van-dialog
            v-model="clearShow"
            title="注销"
            @confirm="clear"
            show-cancel-button
        >
            <div class="clear-dialog">
                <div class="info">确认注销该用户，注销后无法恢复</div>
                <van-field
                    v-model="newDocName"
                    label="推荐新医生"
                    placeholder="请输入医生姓名"
                    size="large"
                />
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { Button, Divider, Toast, Dialog, Field } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            adminId: null,
            dId: null,
            data: {},
            newDocName: '',
            clearShow: false,
        };
    },
    computed: {},
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
        this.dId = this.$route.query.dId;
        this.getData();
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        [Field.name]: Field,
        [Dialog.Component.name]: Dialog.Component,
        NavBar,
    },
    methods: {
        getData() {
            this.$api
                .get(`/qkys/api/admin/getSuperiorByDId/${this.dId}`)
                .then(res => {
                    const { data } = res;
                    this.data = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        clear() {
            this.$api
                .post(`/qkys/api/admin/clearDoctorInfoByDId`, {
                    dId: this.dId,
                    adminId: this.adminId,
                    newDocName: this.newDocName,
                })
                .then(() => {
                    this.clearShow = false;
                    this.$router.back();
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
    .clear-dialog {
        padding: 0 20px;
        .info {
            text-align: center;
        }
    }
}
</style>
