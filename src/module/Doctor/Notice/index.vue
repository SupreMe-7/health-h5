<template>
    <div class="noticeList-page">
        <NavBar title="消息" />
        <div class="notice-type">
            <div
                class="notice-type-item"
                :class="activeType === MSG_TYPE_ENUM.Notification && 'active'"
                @click="() => (activeType = MSG_TYPE_ENUM.Notification)"
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
                <div class="notice-item-topic">
                    <div class="topic-text">
                        <van-badge v-if="!item.isRead" dot />{{ item.topic }}
                    </div>
                    <div class="time">{{ item.createTime }}</div>
                </div>
                <div class="notice-item-content">{{ item.message }}</div>
                <van-divider />
            </div>
        </van-list>
    </div>
</template>

<script>
import { Tab, Tabs, List, Icon, Badge, Divider, Dialog, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
const MSG_TYPE_ENUM = {
    Notification: 'Notification',
    System: 'System',
};
export default {
    data() {
        return {
            MSG_TYPE_ENUM: MSG_TYPE_ENUM,
            pId: null,
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
        this.pId = sessionStorage.getItem('PID');
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
        [Divider.name]: Divider,
        NavBar,
    },
    methods: {
        viewNotice(item) {
            if (item.innerchain) {
                Dialog({ title: item.topic, message: item.innerchain });
            } else {
                if (item.topic === '全科医生申请') {
                    this.$router.push('/patients/my-mediciner');
                }
                if (item.topic === '个人病例更新') {
                    this.$router.push('/patients/personal-cases');
                }
            }
            this.$api
                .post(`/qkys/api/updateReadMsg`, {
                    role: 'Pa',
                    id: this.pId,
                    msgId: item.id,
                    msgType: item.msgType,
                })
                .then(res => {
                    item.isRead = 1;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        onLoad() {
            this.currPage = this.currPage + 1;
            if (this.activeType === MSG_TYPE_ENUM.Notification) {
                this.$api
                    .post(`/qkys/api/getUserMsg`, {
                        role: 'Pa',
                        id: this.pId,
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
                        role: 'Pa',
                        id: this.pId,
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
            color: #5274f6;
        }
        .van-icon {
            font-size: 24px;
        }
    }
    .notice-list-item {
        margin: 10px 0;
        padding: 0 10px;
        font-size: 18px;
        .notice-item-topic {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px 0;
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
        .notice-item-content {
            font-size: 14px;
            color: #969799;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
