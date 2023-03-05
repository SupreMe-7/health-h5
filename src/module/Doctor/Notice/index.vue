<template>
    <div class="noticeList-page">
        <NavBar title="消息" />
        <div class="notice-type">
            <div
                class="notice-type-item"
                :class="activeType === MSG_TYPE_ENUM.Notification && 'active'"
                @click="() => (activeType = MSG_TYPE_ENUM.Notification)"
                @dblclick="clearAll()"
            >
                <van-icon name="chat-o" />
                <van-badge :content="notReadUserMsgNum" max="9"
                    >通知消息
                </van-badge>
            </div>
            <div
                class="notice-type-item"
                :class="activeType === MSG_TYPE_ENUM.System && 'active'"
                @click="() => (activeType = MSG_TYPE_ENUM.System)"
            >
                <van-icon name="volume-o" />系统消息
            </div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div
                v-for="(item, index) in list"
                :key="index"
                class="notice-list-item"
                @click="viewNotice(item)"
            >
                <van-swipe-cell>
                    <div class="notice-wrapper">
                        <div class="notice-item-topic">
                            <div class="topic-text">
                                <van-badge v-if="!item.isRead" dot />{{
                                    item.topic
                                }}
                            </div>
                            <div class="time">{{ item.createTime }}</div>
                        </div>
                        <div class="notice-item-content">
                            {{ item.message }}
                        </div>
                    </div>
                    <div class="line"></div>
                    <template #right>
                        <van-button
                            square
                            text="删除"
                            type="danger"
                            class="delete-button"
                            @click="deleteMsg(item)"
                        />
                    </template>
                </van-swipe-cell>
            </div>
        </van-list>
    </div>
</template>

<script>
import {
    Tab,
    Tabs,
    List,
    Icon,
    Badge,
    Dialog,
    Toast,
    SwipeCell,
    Button,
} from 'vant';
import NavBar from '@/components/NavBar.vue';
const MSG_TYPE_ENUM = {
    Notification: 'Notification',
    System: 'System',
};
export default {
    data() {
        return {
            MSG_TYPE_ENUM: MSG_TYPE_ENUM,
            dId: null,
            list: [],
            activeType: MSG_TYPE_ENUM.Notification,
            loading: false,
            finished: false,
            currPage: 0,
            pageSize: 10,
            totalPage: null,
            notReadUserMsgNum: null,
        };
    },
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
    },
    watch: {
        activeType() {
            this.finished = false;
            this.loading = true;
            this.totalPage = null;
            this.currPage = 0;
            this.list = [];
            this.onLoad();
        },
    },
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        [Icon.name]: Icon,
        [Badge.name]: Badge,
        [SwipeCell.name]: SwipeCell,
        [Button.name]: Button,
        NavBar,
    },
    methods: {
        viewNotice(item) {
            if (item.isRead === 0) {
                this.$api
                    .post(`/qkys/api/updateReadMsg`, {
                        role: 'Doc',
                        id: this.dId,
                        msgId: item.id,
                        msgType: item.msgType,
                    })
                    .then(() => {
                        item.isRead = 1;
                        this.notReadUserMsgNum = this.notReadUserMsgNum - 1;
                    })
                    .catch(e => {
                        Toast(e.errMsg);
                    });
            }
            if (item.topic === '患者监测日记更新') {
                this.$router.push(
                    `/doctor/sufferer-calendar?pId=${item.innerchain}`
                );
                return;
            }
            if (item.topic === '全科医生申请') {
                this.$router.push('/doctor/new-sufferer');
                return;
            }
            if (item.innerchain) {
                Dialog({ title: item.topic, message: item.innerchain });
            }
        },
        onLoad() {
            this.currPage = this.currPage + 1;
            if (this.activeType === MSG_TYPE_ENUM.Notification) {
                this.$api
                    .post(`/qkys/api/getUserMsg`, {
                        role: 'Doc',
                        id: this.dId,
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                    })
                    .then(res => {
                        const { data } = res;
                        this.notReadUserMsgNum = data.notReadUserMsgNum;
                        this.list = this.list.concat(data.list);
                        this.loading = false;
                        this.currPage = data.currPage;
                        if (this.currPage >= data.totalPage) {
                            this.finished = true;
                        }
                    })
                    .catch(e => {
                        this.finished = true;
                        Toast(e.errMsg);
                    });
            }
            if (this.activeType === MSG_TYPE_ENUM.System) {
                this.$api
                    .post(`/qkys/api/getAllSysMsg`, {
                        role: 'Doc',
                        id: this.dId,
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                    })
                    .then(res => {
                        const { data } = res;
                        this.list = this.list.concat(data.list);
                        this.loading = false;
                        this.currPage = data.currPage;
                        if (this.currPage >= data.totalPage) {
                            this.finished = true;
                        }
                    })
                    .catch(e => {
                        this.finished = true;
                        Toast(e.errMsg);
                    });
            }
        },
        clearAll() {
            this.$api
                .post(`/qkys/api/doc/updateAllReadMsg`, {
                    role: 'Doc',
                    id: this.dId,
                    msgType: 'userMsg',
                })
                .then(() => {
                    location.reload();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        deleteMsg(item) {
            this.$api
                .post(`/qkys/api/deleteUserMsg`, {
                    role: 'Doc',
                    id: this.dId,
                    msgs: [item.id],
                })
                .then(() => {
                    location.reload();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.noticeList-page {
    .notice-type {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
        .notice-type-item {
            padding: 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
        }
        .active {
            color: #1989fa;
        }
        .van-icon {
            font-size: 24px;
        }
    }
    .notice-list-item {
        font-size: 18px;
        .notice-wrapper {
            padding: 12px 0;
            margin: 0 8px;
        }
        .notice-item-topic {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 0 5px 0;
            .topic-text {
                margin-right: 5px;
                flex-grow: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .time {
                flex-shrink: 0;
                font-size: 14px;
                color: #969799;
            }
        }
        .delete-button {
            height: 100%;
        }
        .notice-item-content {
            font-size: 14px;
            color: #969799;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .line {
        border-bottom: 1px solid rgb(242, 230, 230);
    }
}
</style>
