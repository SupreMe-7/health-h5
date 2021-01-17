<template>
    <div class="monitor-calendar">
        <van-tabs v-model="diaryMethod" sticky>
            <van-tab title="血糖" name="bloodSugar">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了~"
                        @load="onLoad"
                    >
                        <div
                            class="show-item"
                            v-for="(item, index) in list"
                            :key="index"
                        >
                            <div class="show-item-time">
                                {{ item.createTime }}
                            </div>
                            <div class="show-item-main">
                                <div class="show-item-info">
                                    早餐前: {{ item.beforeBreakfastSugar }}
                                </div>
                                <div class="show-item-info">
                                    早餐后: {{ item.afterBreakfastSugar }}
                                </div>
                                <div class="show-item-info">
                                    午餐前: {{ item.beforeLunchSugar }}
                                </div>
                                <div class="show-item-info">
                                    午餐后: {{ item.afterLunchSugar }}
                                </div>
                                <div class="show-item-info">
                                    晚餐前: {{ item.beforeDinnerSugar }}
                                </div>
                                <div class="show-item-info">
                                    晚餐后: {{ item.afterDinnerSugar }}
                                </div>
                                <div class="show-item-info">
                                    睡前: {{ item.beforeSleepSugar }}
                                </div>
                            </div>
                            <div
                                v-if="
                                    item.picPath1 ||
                                        item.picPath2 ||
                                        item.picPath3
                                "
                                class="show-item-img"
                            >
                                <img
                                    v-if="item.picPath1"
                                    :src="
                                        'https://qkys.zhugaotech.com/pics/' +
                                            item.picPath1
                                    "
                                    alt=""
                                />
                                <img
                                    v-if="item.picPath2"
                                    :src="
                                        'https://qkys.zhugaotech.com/pics/' +
                                            item.picPath2
                                    "
                                    alt=""
                                />
                                <img
                                    v-if="item.picPath3"
                                    :src="
                                        'https://qkys.zhugaotech.com/pics/' +
                                            item.picPath3
                                    "
                                    alt=""
                                />
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="血压">内容 2</van-tab>
            <van-tab title="运动/饮食">内容 3</van-tab>
            <van-tab title="辅助检查">内容 4</van-tab>
        </van-tabs>
        <TabBar :nowKey="1"></TabBar>
    </div>
</template>

<script>
//TODO:
import {
    Button,
    Tab,
    Tabs,
    ImagePreview,
    Toast,
    List,
    PullRefresh,
} from 'vant';
import TabBar from '@/components/TabBar.vue';
export default {
    data() {
        return {
            refreshing: false,
            loading: false,
            finished: false,
            pId: null,
            list: [],
            currPage: 0,
            pageSize: 10,
            diaryMethod: 'bloodSugar',
            totalPage: null,
        };
    },
    computed: {},
    mounted() {
        this.pId = sessionStorage.getItem('PID');
    },
    components: {
        [Button.name]: Button,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [ImagePreview.Component.name]: ImagePreview.Component,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
        TabBar,
    },
    methods: {
        getInfo() {
            return this.$api.post(`/qkys/api/getDiaryByPId`, {
                pId: this.pId,
                currPage: this.currPage,
                pageSize: this.pageSize,
                diaryMethod: this.diaryMethod,
            });
        },
        onRefresh() {
            this.currPage = 0;
            this.list = [];
            this.finished = false;
            this.loading = true;
            this.refreshing = false;
            this.onLoad();
        },
        onLoad() {
            this.currPage = this.currPage + 1;
            this.getInfo()
                .then(res => {
                    const { data } = res;
                    this.list = this.list.concat(data.data);
                    this.loading = false;
                    this.currPage = data.currPage;
                    if (this.currPage === data.totalPage) {
                        this.finished = true;
                    }
                })
                .catch(e => {
                    this.finished = true;
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.monitor-calendar {
    .show-item {
        border: 1px solid #e8e8e8;
        margin: 10px;
        padding: 10px;
        .show-item-time {
            margin: 0 0 10px 0;
        }
        .show-item-main {
            display: flex;
            flex-wrap: wrap;
            .show-item-info {
                flex: 1 1 50%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .show-item-img {
            margin: 10px 0 0 0;
            display: flex;
            justify-content: space-between;
            img {
                width: 30%;
            }
        }
    }
}
</style>
<style>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
</style>
