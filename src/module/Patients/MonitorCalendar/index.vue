<template>
    <div class="monitor-calendar">
        <van-tabs v-model="diaryMethod" sticky>
            <van-tab title="血糖" name="blood_sugar">
                <van-pull-refresh
                    v-if="diaryMethod === 'blood_sugar'"
                    v-model="refreshing"
                    @refresh="onRefresh"
                >
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
                                <div class="show-item-sugar">
                                    早餐前
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.beforeBreakfastSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.beforeBreakfastDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    早餐后
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.afterBreakfastSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.afterBreakfastDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    午餐前
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.beforeLunchSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.beforeLunchDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    午餐后
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.afterLunchSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.afterLunchDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    晚餐前
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.beforeDinnerSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.beforeDinnerDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    晚餐后
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.afterDinnerSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.afterDinnerDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    睡前
                                    <div class="show-item-sugar-val">
                                        <div>
                                            血糖:
                                            {{ item.beforeSleepSugar }}
                                        </div>
                                        <div>
                                            饮食及运动:
                                            {{ item.beforeSleepDiet }}
                                        </div>
                                    </div>
                                </div>
                                <div class="show-item-sugar">
                                    随机血糖
                                    <div class="show-item-sugar-val">
                                        血糖:
                                        {{ item.randomSugar }}
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="item.pics && item.pics.length"
                                class="show-item-img"
                            >
                                <van-image
                                    v-for="(ele, index) in item.pics"
                                    :key="index"
                                    width="30%"
                                    :src="ele"
                                    @click="
                                        ImagePreview({
                                            images: item.pics,
                                            startPosition: index,
                                        })
                                    "
                                />
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="血压" name="blood_pressure">
                <van-pull-refresh
                    v-if="diaryMethod === 'blood_pressure'"
                    v-model="refreshing"
                    @refresh="onRefresh"
                >
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
                                    <div class="show-item-info-pressure">
                                        测量时间:
                                        {{ item.measureTime || '-' }}
                                    </div>
                                    <div
                                        :class="{
                                            'show-item-info-pressure': true,
                                            'red-text': item.lowPressure > 120,
                                        }"
                                    >
                                        低压:
                                        {{ item.lowPressure || '-' }}
                                    </div>
                                    <div
                                        :class="{
                                            'show-item-info-pressure': true,
                                            'red-text': item.highPressure > 160,
                                        }"
                                    >
                                        高压:
                                        {{ item.highPressure || '-' }}
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="item.pics && item.pics.length"
                                class="show-item-img"
                            >
                                <van-image
                                    v-for="(ele, index) in item.pics"
                                    :key="index"
                                    width="30%"
                                    :src="ele"
                                    @click="
                                        ImagePreview({
                                            images: item.pics,
                                            startPosition: index,
                                        })
                                    "
                                />
                            </div>
                        </div>
                    </van-list> </van-pull-refresh
            ></van-tab>
            <van-tab title="辅助检查" name="examination">
                <van-pull-refresh
                    v-if="diaryMethod === 'examination'"
                    v-model="refreshing"
                    @refresh="onRefresh"
                >
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
                                    辅助检查类型: {{ item.examType }}
                                </div>
                                <div class="show-item-info">
                                    辅助检查内容: {{ item.examValue }}
                                </div>
                            </div>
                            <div
                                v-if="item.pics && item.pics.length"
                                class="show-item-img"
                            >
                                <van-image
                                    v-for="(ele, index) in item.pics"
                                    :key="index"
                                    width="30%"
                                    :src="ele"
                                    @click="
                                        ImagePreview({
                                            images: item.pics,
                                            startPosition: index,
                                        })
                                    "
                                />
                            </div>
                        </div>
                    </van-list> </van-pull-refresh
            ></van-tab>
        </van-tabs>
        <TabBar type="patients" :nowKey="1"></TabBar>
    </div>
</template>

<script>
import {
    Tab,
    Tabs,
    ImagePreview,
    Toast,
    List,
    PullRefresh,
    Image as VanImage,
} from 'vant';
import TabBar from '@/components/TabBar.vue';
import { getPId } from '@/common/util.js';

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
            diaryMethod: 'blood_sugar',
            totalPage: null,
            picBaseUrl: '',
        };
    },
    computed: {},
    watch: {
        diaryMethod() {
            this.list = [];
            this.loading = false;
            this.totalPage = null;
            this.finished = false;
            this.currPage = 0;
        },
    },
    mounted() {
        this.pId = getPId();
    },
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
        [VanImage.name]: VanImage,
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
                    this.picBaseUrl = data.path;
                    data.data.forEach(item => {
                        item.pics = [];
                        item.picPath1 &&
                            item.pics.push(this.picBaseUrl + item.picPath1);
                        item.picPath2 &&
                            item.pics.push(this.picBaseUrl + item.picPath2);
                        item.picPath3 &&
                            item.pics.push(this.picBaseUrl + item.picPath3);
                    });
                    this.list = this.list.concat(data.data);
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
        ImagePreview: ImagePreview,
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
        .item-item-title {
            margin: 5px 0;
            font-size: 18px;
            font-weight: bold;
        }
        .show-item-main {
            .show-item-sugar {
                margin-bottom: 12px;
                .show-item-sugar-val {
                    margin-top: 6px;
                }
            }
            .show-item-info {
                display: flex;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .show-item-info-pressure {
                    flex-grow: 1;
                }
            }
        }
        .show-item-img {
            margin: 10px 0 0 0;
            display: flex;
            flex-wrap: wrap;
            .van-image {
                margin-right: 8px;
            }
        }
    }
    .red-text {
        color: red;
    }
}
</style>
<style>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
</style>
