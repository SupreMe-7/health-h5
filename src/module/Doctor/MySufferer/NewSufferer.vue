<template>
    <div class="new-sufferer">
        <NavBar title="新患者申请" />
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div v-for="(item, index) in list" :key="index">
                <div class="item">
                    <div class="left">
                        <div class="name">{{ item.name }}</div>
                        <div class="address">
                            {{ item.province }}{{ item.city
                            }}{{ item.district }}
                        </div>
                        <div class="time">{{ item.selectTime }}</div>
                    </div>
                    <div v-if="item.expired === 1">已过期</div>
                    <div v-if="item.expired === 0 && item.confirmed === 0">
                        <van-button @click="viewMessage(item)">查看</van-button>
                    </div>
                    <div v-if="item.expired === 0 && item.confirmed === 1">
                        已通过
                    </div>
                </div>
                <van-divider />
            </div>
        </van-list>
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
                    <div>性别：{{ currentItem.sex }}</div>
                </div>
                <div class="birth">
                    出生日期：{{
                        currentItem.birth &&
                            new Date(+currentItem.birth).toJSON().slice(0, 10)
                    }}
                </div>
                <div class="dialog-address">
                    住址：{{ currentItem.province }}{{ currentItem.city
                    }}{{ currentItem.district }}
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { Button, Toast, List, Divider, Dialog } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            show: false,
            dId: null,
            list: [],
            loading: false,
            finished: false,
            currPage: 0,
            pageSize: 10,
            totalPage: null,
            currentItem: {},
            CONFIRMED_ENUM: {
                REFUSE: 0,
                ADOPT: 1,
            },
        };
    },
    watch: {},
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        [List.name]: List,
        [Dialog.Component.name]: Dialog.Component,
        NavBar,
    },
    methods: {
        onLoad() {
            this.currPage = this.currPage + 1;
            this.$api
                .get(`/qkys/api/doc/getNewSelectPatientsByDId/${this.dId}`)
                .then(res => {
                    this.list = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
            this.finished = true;
        },
        submit(confirmed) {
            this.$api
                .post(`/qkys/api/doc/updateNewSelectPatient`, {
                    dId: this.dId,
                    pId: this.currentItem.pId,
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
.new-sufferer {
    padding: 10px;
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    .time {
        font-size: 12px;
        color: #817b7b;
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
