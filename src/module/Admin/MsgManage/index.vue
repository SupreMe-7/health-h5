<template>
    <div class="admin-msg-manage">
        <NavBar title="系统消息管理" />
        <div class="btn-group">
            <van-button type="info" to="/admin/msg-manage-add"
                >添加系统消息</van-button
            >
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
                        {{ item.topic }}
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
import NavBar from '@/components/NavBar.vue';
import { Toast, Button, List, Divider } from 'vant';
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            currPage: 0,
            totalPage: null,
            notReadUserMsgNum: null,
        };
    },
    components: {
        NavBar,
        [Button.name]: Button,
        [List.name]: List,
        [Divider.name]: Divider,
    },
    mounted() {},
    methods: {
        onLoad() {
            this.currPage = this.currPage + 1;
            this.$api
                .get(`/qkys/api/admin/getSystemMsg/${this.currPage}`)
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
        },
        viewNotice(item) {
            this.$router.push(
                `/admin/msg-manage-detail?detail=${JSON.stringify(item)}`
            );
        },
    },
};
</script>

<style lang="less" scoped>
.admin-msg-manage {
    .btn-group {
        padding: 20px;
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
