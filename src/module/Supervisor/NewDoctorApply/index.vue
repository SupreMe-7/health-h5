<template>
    <div class="new-doctor-apply">
        <NavBar title="新全科医生申请" />
        <div v-for="(item, index) in list" :key="index" class="item">
            <div>
                <div>{{ item.name }}医生</div>
                <div>{{ item.hospital }}</div>
                <div>{{ item.selectTime }}</div>
            </div>
            <div class="btn-group">
                <div v-if="item.expired === 1">已拒绝</div>
                <div v-if="item.expired === 0 && item.confirmed === 0">
                    <van-button @click="viewMessage(item)" round
                        >查看</van-button
                    >
                </div>
                <div v-if="item.expired === 0 && item.confirmed === 1">
                    已通过
                </div>
            </div>
        </div>
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
import { Button, Dialog, Toast } from 'vant';
export default {
    data() {
        return {
            show: false,
            currentItem: {},
            sId: null,
            list: [],
            CONFIRMED_ENUM: {
                REFUSE: 0,
                ADOPT: 1,
            },
        };
    },
    components: {
        NavBar,
        [Button.name]: Button,
        [Dialog.Component.name]: Dialog.Component,
    },
    async mounted() {
        this.sId = sessionStorage.getItem('SID');
        await this.getApply();
    },
    methods: {
        getApply() {
            this.$api
                .get(`/qkys/api/sup/getNewSelectsDocsBySupId/${this.sId}`)
                .then(res => {
                    this.list = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        submit(confirmed) {
            this.$api
                .post(`/qkys/api/sup/updateNewSelectDoc`, {
                    supId: this.sId,
                    dId: this.currentItem.dId,
                    confirmed,
                })
                .then(res => {
                    if (confirmed === this.CONFIRMED_ENUM.ADOPT) {
                        Toast('已通过');
                    } else {
                        Toast('已拒绝');
                    }
                    location.reload();
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
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ebedf0;
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
