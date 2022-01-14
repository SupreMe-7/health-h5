<template>
    <div class="home-page">
        <div class="home-page-header">
            <div
                class="header-name"
                @click="toUrl('/patients/personal-information')"
            >
                {{ name }}
            </div>
            <van-badge :content="notReadMsgNum" max="9">
                <div class="header-news" @click="toUrl('/patients/notice')">
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
                <div class="card" @click="toUrl('/patients/my-mediciner')">
                    {{ docName ? `我的全科医生` : '选择全科医生' }}
                </div>
                <div class="card" @click="toUrl('/patients/add-calendar')">
                    添加监测日历
                </div>
            </div>
            <div class="card-row">
                <div class="card" @click="toUrl('/patients/diagnosis-advice')">
                    查看诊疗建议
                </div>
                <div class="card" @click="toUrl('/patients/personal-cases')">
                    查看病例
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
        <TabBar
            type="patients"
            :nowKey="0"
            :unReadChatNum="unReadChatNum"
        ></TabBar>
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
import { getToken, jumpOutUrl, getPId } from '@/common/util.js';
export default {
    data() {
        return {
            name: '',
            notReadMsgNum: null,
            carouselList: [],
            recommend: [],
            docName: '',
            unReadChatNum: '',
        };
    },
    async mounted() {
        if (!getToken()) {
            this.$router.push('/login');
            return;
        }
        await this.getPaByToken();
        this.getUnReadChatNum();
        this.getSysMsg();
        this.getUrlPics();
        this.getRecommand();
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
        getPaByToken() {
            return this.$api
                .get(`/qkys/api/getPaByToken`)
                .then(res => {
                    const { id, docName, name } = res.data;
                    this.docName = docName;
                    this.name = name.slice(-2);
                    sessionStorage.setItem('PID', id);
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getUnReadChatNum() {
            const pId = getPId();
            return this.$api
                .get(`/qkys/api/getUnReadChatNum/${pId}/13`)
                .then(res => {
                    this.unReadChatNum = res.data + '';
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getSysMsg() {
            const pId = getPId();
            this.$api
                .get(`/qkys/api/getStartSysMsg/Pa/${pId}`)
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
        color: #fff;
        .card-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            .card {
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
                margin-bottom: 4px;
                color: #222;
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
