<template>
    <div class="home-page">
        <div class="home-page-header">
            <div
                class="header-name"
                @click="toUrl('/doctor/personal-information')"
            >
                {{ name }}
            </div>
            <van-badge :content="notReadMsgNum" max="9">
                <div class="header-news" @click="toUrl('/supervisor/notice')">
                    消息
                </div>
            </van-badge>
        </div>
        <div class="home-page-swiper">
            <van-swipe
                :autoplay="2000"
                class="my-swipe"
                indicator-color="white"
            >
                <van-swipe-item
                    v-for="(item, index) in carouselList"
                    :key="index"
                    @click="jumpOutUrl(item.url)"
                >
                    <van-image fit="contain" :src="item.pic" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="home-page-card">
            <div class="card-row">
                <div
                    class="card"
                    @click="toUrl('/supervisor/new-doctor-consult')"
                >
                    新全科医生咨询
                </div>
                <div
                    class="card"
                    @click="toUrl('/supervisor/new-doctor-apply')"
                >
                    新全科医生申请
                </div>
            </div>
        </div>
        <div class="home-page-recommend">
            <div>推荐</div>
            <div class="recommend-content">
                <div
                    class="recommend-item"
                    v-for="(item, index) in recommend"
                    :key="index"
                    @click="jumpOutUrl(item.url)"
                >
                    <div class="recommend-title">{{ item.title }}</div>
                    <div class="recommend-desc">{{ item.introduction }}</div>
                    <div class="recommend-time">
                        {{ item.website }} {{ item.createTime }}
                    </div>
                </div>
            </div>
        </div>
        <TabBar type="supervisor" :nowKey="0"></TabBar>
    </div>
</template>

<script>
// 首页
import {
    Swipe,
    SwipeItem,
    Badge,
    Toast,
    Image as VanImage,
    Dialog,
    Icon,
} from 'vant';
import TabBar from '@/components/TabBar.vue';
import { getToken, jumpOutUrl } from '@/common/util.js';
export default {
    data() {
        return {
            sId: null,
            name: '',
            notReadMsgNum: null,
            carouselList: [],
            recommend: [],
        };
    },
    async mounted() {
        if (!getToken()) {
            this.$router.push('/login');
            return;
        }
        await this.getSupByToken();
        this.getSysMsg();
        // this.getUrlPics();
        // this.getRecommand();
    },
    components: {
        TabBar,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Badge.name]: Badge,
        [VanImage.name]: VanImage,
        [Icon.name]: Icon,
    },
    methods: {
        getSupByToken() {
            return this.$api
                .get(`/qkys/api/sup/getSupByToken`)
                .then(res => {
                    const { id, name, isConfirmed } = res.data;
                    if (isConfirmed === 0) {
                        Dialog.alert({
                            title: '通知',
                            message:
                                '您的注册申请需要管理员确认，请耐心等待申请通过',
                            confirmButtonText: '退出',
                        }).then(() => {
                            localStorage.clear();
                            this.$router.push('/login');
                        });
                    }
                    this.sId = id;
                    this.name = name.slice(-2);
                    sessionStorage.setItem('SID', id);
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getSysMsg() {
            const sId = sessionStorage.getItem('SID');
            this.$api
                .get(`/qkys/api/sup/getStartSysMsg/Sup/${sId}`)
                .then(res => {
                    const { notReadMsgNum = 0, sysMsgs = [] } = res.data;
                    this.notReadMsgNum = notReadMsgNum;
                    sysMsgs.length &&
                        sysMsgs.forEach(item => {
                            this.viewNotice(item);
                        });
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        toUrl(url) {
            this.$router.push(url);
        },
        viewNotice(item) {
            Dialog({ title: item.topic, message: item.message });
        },
        getUrlPics() {
            this.$api
                .get(`/qkys/api/getUrlPics`)
                .then(res => {
                    const { data = [] } = res;
                    this.carouselList = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getRecommand() {
            this.$api
                .get(`/qkys/api/getRecommandRead/Pa`)
                .then(res => {
                    const { data = [] } = res;
                    this.recommend = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        jumpOutUrl,
    },
};
</script>

<style lang="less" scoped>
.home-page {
    padding: 10px 8px;
    .home-page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 0 6px;
        .header-name {
            color: #fff;
            background: rgb(56, 137, 230);
            width: 30px;
            height: 30px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
    }
    .home-page-swiper {
        margin-bottom: 24px;
        .my-swipe .van-swipe-item {
            color: #fff;
            text-align: center;
        }
    }
    .home-page-card {
        padding: 0 10px;
        .card-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            .card {
                color: #fff;
                width: 45%;
                height: 80px;
                line-height: 80px;
                font-size: 20px;
                background-color: #39a9ed;
                text-align: center;
            }
        }
    }
    .home-page-recommend {
        font-size: 24px;
        .recommend-content {
            font-size: 14px;
            .recommend-item {
                padding: 15px 5px;
                border-bottom: 1px solid #e8e8e8;
            }
            .recommend-title {
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 4px;
            }
            .recommend-desc {
                color: rgb(59, 56, 56);
            }
            .recommend-time {
                margin-top: 4px;
                font-size: 12px;
                color: #666;
            }
        }
    }
}
</style>
