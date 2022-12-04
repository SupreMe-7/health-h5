<template>
    <div class="new-doctor-apply">
        <NavBar title="医生注册审核" />
        <van-tabs v-model="active" type="card" @click="onClickTab">
            <van-tab title="上级医生注册审核" name="Sup">
                <div
                    v-for="(item, index) in supervisorList"
                    :key="index"
                    class="item"
                >
                    <div>
                        <div>{{ item.name }}医生</div>
                        <div>{{ item.hospital }}</div>
                        <div>{{ item.createTime }}</div>
                    </div>
                    <div class="btn-group">
                        <div v-if="item.expired === 1">已拒绝</div>
                        <div
                            v-if="item.expired === 0 && item.isConfirmed === 0"
                        >
                            <van-button @click="viewMessage(item)" round
                                >查看</van-button
                            >
                        </div>
                        <div
                            v-if="item.expired === 0 && item.isConfirmed === 1"
                        >
                            已通过
                        </div>
                    </div>
                </div></van-tab
            >
            <van-tab title="全科医生注册审核" name="Doc"
                ><div
                    v-for="(item, index) in doctorList"
                    :key="index"
                    class="item"
                >
                    <div>
                        <div>{{ item.name }}医生</div>
                        <div>{{ item.hospital }}</div>
                        <div>{{ item.createTime }}</div>
                    </div>
                    <div class="btn-group">
                        <div v-if="item.expired === 1">已拒绝</div>
                        <div
                            v-if="item.expired === 0 && item.isConfirmed === 0"
                        >
                            <van-button @click="viewMessage(item)" round
                                >查看</van-button
                            >
                        </div>
                        <div
                            v-if="item.expired === 0 && item.isConfirmed === 1"
                        >
                            已通过
                        </div>
                    </div>
                </div></van-tab
            >
        </van-tabs>
        <van-dialog
            v-model="show"
            show-cancel-button
            confirmButtonText="通过"
            cancelButtonText="拒绝"
            @confirm="submit(CONFIRMED_ENUM.ADOPT)"
            @cancel="submit(CONFIRMED_ENUM.REFUSE)"
        >
            <div class="dialog">
                <div class="dialog-header" @click="show = false">
                    x
                </div>
                <div class="first-row">
                    <div>姓名：{{ currentItem.name }}</div>
                </div>
                <div class="birth">医院：{{ currentItem.hospital }}</div>
                <div class="birth">电话：{{ currentItem.phone }}</div>
                <div class="birth">科室：{{ currentItem.specialty }}</div>
                <div class="dialog-address">
                    职称：{{ currentItem.level || '-' }}
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Button, Dialog, Toast, Tab, Tabs } from 'vant';
export default {
    data() {
        return {
            active: 'Sup',
            show: false,
            currentItem: {},
            currentType: 'Sup',
            sId: null,
            supervisorList: [],
            doctorList: [],
            CONFIRMED_ENUM: {
                REFUSE: 0,
                ADOPT: 1,
            },
        };
    },
    components: {
        [Button.name]: Button,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Dialog.Component.name]: Dialog.Component,
        NavBar,
    },
    async mounted() {
        await this.getSupervisor();
        await this.getDoctor();
    },
    methods: {
        onClickTab(title) {
            this.currentType = title;
        },
        getSupervisor() {
            this.$api
                .get(`/qkys/api/admin/getNewRegesiteSups`)
                .then(res => {
                    this.supervisorList = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getDoctor() {
            this.$api
                .get(`/qkys/api/admin/getNewRegesiteDocs`)
                .then(res => {
                    this.doctorList = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        submit(flag) {
            this.$api
                .post(`/qkys/api/admin/updateNewRegesiteDoc`, {
                    id: this.currentItem.id,
                    confirmed: flag,
                    role: this.currentType,
                    phone: this.currentItem.phone,
                })
                .then(res => {
                    Toast('已提交');
                    if (this.currentType === 'Sup') {
                        this.getSupervisor();
                    }
                    if (this.currentType === 'Doc') {
                        this.getDoctor();
                    }
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        viewMessage(item) {
            this.currentItem = item;
            this.show = true;
        },
    },
};
</script>

<style lang="less" scoped>
.new-doctor-apply {
    padding: 5px 0 0 0;
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px 10px 10px;
        border-bottom: 1px solid rgb(120, 117, 117);
        .btn-group {
            padding: 0 10px;
            margin: 10px 0 0 0;
            text-align: right;
        }
    }
    .dialog {
        width: 80%;
        margin: 0 auto;
    }
    .birth {
        margin: 5px 0;
    }
    .first-row {
        display: flex;
        div {
            width: 50%;
        }
    }
    .dialog-header {
        margin: 15px 0 10px 0;
        text-align: right;
    }
    .dialog-address {
        margin-bottom: 15px;
    }
}
</style>
