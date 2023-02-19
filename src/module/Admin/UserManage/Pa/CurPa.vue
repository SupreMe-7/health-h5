<template>
    <div class="my-sufferer">
        <NavBar title="患者菜单" />
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
                    上次登录时间：{{ lastLoginTime || '暂无' }}
                </div>
                <div class="doctor">
                    全科医生：{{ data.docName || '暂无全科医生' }}
                </div>
                <div class="doctor">
                    上级医生：{{ data.supName || '暂无上级医生' }}
                </div>
            </div>
            <div>
                <van-button
                    round
                    :to="`/admin/user-manage/pa/pa-information?pId=${data.pId}`"
                    >一般信息</van-button
                >
                <van-button
                    round
                    :to="`/admin/user-manage/pa/pa-calendar?pId=${data.pId}`"
                    >监测回顾</van-button
                >
                <van-button
                    round
                    :to="
                        `/admin/user-manage/pa/pa-cases?pId=${data.pId}&supId=${data.supId}`
                    "
                    >患者病历</van-button
                >
                <van-button
                    round
                    :to="`/admin/user-manage/pa/pa-docadvice?pId=${data.pId}`"
                    >医生建议</van-button
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
            dId: null,
            pId: null,
            data: {},
            lastLoginTime: '',
        };
    },
    computed: {},
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
        this.pId = this.$route.query.pId;
        this.getData();
        this.getLoginTime();
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        NavBar,
    },
    methods: {
        getData() {
            this.$api
                .get(`/qkys/api/admin/getPatientSupByPId/${this.pId}`)
                .then(res => {
                    const { data } = res;
                    this.data = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getLoginTime() {
            this.$api
                .post(`/qkys/api/admin/getUserLastLogin`, {
                    id: this.pId,
                    role: 'Pa',
                })
                .then(res => {
                    const { data } = res;
                    this.lastLoginTime = data && data.lastLoginTime;
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
                            `/qkys/api/admin/clearPatientInfoByPId/${this.pId}/${this.adminId}`
                        )
                        .then(res => {
                            const { data } = res;
                            this.data = data;
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
