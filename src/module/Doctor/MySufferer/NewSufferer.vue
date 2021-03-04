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
                        <div class="address">{{ item.address }}</div>
                        <div class="time">{{ item.time }}</div>
                    </div>
                    <div v-if="item.status === 3">
                        <van-button @click="viewMessage(item)">{{
                            statusList[item.status]
                        }}</van-button>
                    </div>
                    <div v-else-if="item.status === 2">
                        {{ statusList[item.status] }}
                    </div>
                    <div v-else-if="item.status === 1">
                        {{ statusList[item.status] }}
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
            @confirm="adopt"
            @cancel="refuse"
        >
            <div class="dialog">
                <div class="dialog-header" @click="show = false">
                    x
                </div>
                <div class="first-row">
                    <div>姓名：{{ currentItem.name }}</div>
                    <div>性别：{{ currentItem.sex }}</div>
                </div>
                <div class="birth">出生日期：{{ currentItem.time }}</div>
                <div class="dialog-address">
                    地址：{{ currentItem.address }}
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { Button, Toast, List, Divider, Dialog } from 'vant';
import NavBar from '@/components/NavBar.vue';
const statusList = {
    1: '已通过',
    2: '已拒绝',
    3: '查看',
};
export default {
    data() {
        return {
            show: false,
            pId: null,
            list: [
                {
                    time: '2021-03-03',
                    name: '张三',
                    address: '北京市海淀区',
                    status: 1,
                },
                {
                    time: '2021-03-03',
                    name: '张三',
                    address: '北京市海淀区',
                    status: 2,
                },
                {
                    time: '2021-03-03',
                    name: '张三',
                    address: '北京市海淀区',
                    status: 3,
                },
                {
                    time: '2021-03-03',
                    name: '张三',
                    address: '北京市海淀区',
                    status: 2,
                },
                {
                    time: '2021-03-03',
                    name: '张三',
                    address: '北京市海淀区',
                    status: 1,
                },
            ],
            loading: false,
            finished: false,
            currPage: 0,
            pageSize: 10,
            totalPage: null,
            statusList: statusList,
            currentItem: {},
        };
    },
    watch: {},
    computed: {},
    mounted() {
        this.pId = sessionStorage.getItem('PID');
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
            this.finished = true;
        },
        adopt() {
            Toast('我通过了');
        },
        refuse() {
            Toast('我拒绝了');
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
