<template>
    <div class="monitor-calendar">
        <van-nav-bar
            left-text="返回"
            placeholder
            title="患者监测日记"
            left-arrow
            fixed
            @click-left="onClickLeft"
            @click-right="onClickRight"
            right-text="添加诊疗建议"
        />
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
                                        早晨
                                    </div>
                                    <div class="show-item-info-pressure">
                                        低压:
                                        {{ item.morningLowPressure || '-' }}
                                    </div>
                                    <div class="show-item-info-pressure">
                                        高压:
                                        {{ item.morningHighPressure || '-' }}
                                    </div>
                                </div>
                                <div class="show-item-info">
                                    <div class="show-item-info-pressure">
                                        中午
                                    </div>
                                    <div class="show-item-info-pressure">
                                        低压:
                                        {{ item.afternoonLowPressure || '-' }}
                                    </div>
                                    <div class="show-item-info-pressure">
                                        高压:
                                        {{ item.afternoonHighPressure || '-' }}
                                    </div>
                                </div>
                                <div class="show-item-info">
                                    <div class="show-item-info-pressure">
                                        晚间
                                    </div>
                                    <div class="show-item-info-pressure">
                                        低压:
                                        {{ item.eveningLowPressure || '-' }}
                                    </div>
                                    <div class="show-item-info-pressure">
                                        高压:
                                        {{ item.eveningHighPressure || '-' }}
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
            <van-tab title="运动/饮食" name="sport_diet">
                <van-pull-refresh
                    v-if="diaryMethod === 'sport_diet'"
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
                            <div class="item-item-title">运动</div>
                            <div class="show-item-main">
                                <div class="show-item-info">
                                    早晨: {{ item.morningSport }}
                                </div>
                                <div class="show-item-info">
                                    中午: {{ item.afternoonSport }}
                                </div>
                                <div class="show-item-info">
                                    晚间: {{ item.eveningSport }}
                                </div>
                            </div>
                            <div class="item-item-title">饮食</div>
                            <div class="show-item-main">
                                <div class="show-item-info">
                                    早餐: {{ item.breakfast }}
                                </div>
                                <div class="show-item-info">
                                    午餐: {{ item.lunch }}
                                </div>
                                <div class="show-item-info">
                                    晚餐: {{ item.dinner }}
                                </div>
                                <div class="show-item-info">
                                    间食: {{ item.betweenMeals }}
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
    NavBar,
} from 'vant';

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
            picBaseUrl: 'https://qkys.zhugaotech.com/pics/',
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
        this.pId = this.$route.query.pId;
    },
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
        [VanImage.name]: VanImage,
        [NavBar.name]: NavBar,
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {
            this.$router.push(`/supervisor/add-advice?pId=${this.pId}`);
        },
        getInfo() {
            return this.$api.post(`/qkys/api/sup/getPatientDiary`, {
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
}
</style>
<style>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
</style>
