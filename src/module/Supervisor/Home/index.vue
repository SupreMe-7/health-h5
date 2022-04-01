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
                    <van-icon name="comment-o" size="24" />
                </div>
            </van-badge>
        </div>
        <div class="home-page-swiper">
            <van-swipe
                :autoplay="2000"
                class="my-swipe"
                indicator-color="white"
                height="270"
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

        <div class="home-page-content">
            <div class="home-page-card">
                <div
                    class="card"
                    @click="toUrl('/supervisor/new-doctor-consult')"
                >
                    <img
                        src="http://cos.zhugaotech.com/firstPage/doctor_.pic.jpg"
                        alt=""
                    />
                    <div>全科医生咨询</div>
                </div>
                <div
                    class="card"
                    @click="toUrl('/supervisor/new-doctor-apply')"
                >
                    <img
                        src="https://cos.zhugaotech.com/logo/WechatIMG388.jpeg"
                        alt=""
                    />
                    <div>全科医生申请</div>
                </div>
                <div class="card" @click="toUrl('/supervisor/my-patients')">
                    <img
                        src="https://cos.zhugaotech.com/logo/WechatIMG389.jpeg"
                        alt=""
                    />
                    <div>我的患者</div>
                </div>
            </div>

            <div class="home-page-recommend">
                <div>推荐阅读</div>
                <div class="recommend-content">
                    <div
                        class="recommend-item"
                        v-for="(item, index) in recommend"
                        :key="index"
                        @click="jumpOutUrl(item.url)"
                    >
                        <div v-if="item.picNum === 1">
                            <div class="recommend-title">
                                <div class="title">{{ item.title }}</div>
                                <img :src="item.picUrl1" alt="" />
                            </div>
                            <div class="recommend-time">
                                <span class="webset"> {{ item.website }}</span>
                                {{ item.createTime }}
                            </div>
                        </div>
                        <div v-if="item.picNum === 2">
                            <div class="recommend-title-two">
                                <div class="title-img">
                                    <img :src="item.picUrl1" alt="" />
                                    <img :src="item.picUrl2" alt="" />
                                </div>
                                <div class="title">{{ item.title }}</div>
                            </div>
                            <div class="recommend-time">
                                <span class="webset"> {{ item.website }}</span>
                                {{ item.createTime }}
                            </div>
                        </div>
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
import { getToken, jumpOutUrl, jsBridge } from '@/common/util.js';
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
        this.uploadRegistrationId();
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
                            sessionStorage.clear();
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
                .get(`/qkys/api/getRecommandRead/Doc`)
                .then(res => {
                    const { data = [] } = res;
                    this.recommend = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        uploadRegistrationId() {
            if (navigator.userAgent.includes('xkysAndroidApp')) {
                let registrationId =
                    jsBridge.getRegisteId && jsBridge.getRegisteId();
                this.$api
                    .post(`/qkys/api/user/updateJiGuangId`, {
                        userId: this.pId,
                        role: 'Sup',
                        registrationId,
                    })
                    .then(() => {})
                    .catch(e => {
                        Toast(e.errMsg);
                    });
            }
        },
        jumpOutUrl,
    },
};
</script>

<style lang="less" scoped>
.home-page {
    min-height: 100%;
    background: #f8f8f8;
    .home-page-header {
        position: absolute;
        z-index: 9;
        width: 95%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px;
        padding-top: 10px;
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
        margin-bottom: 8px;
        .my-swipe .van-swipe-item {
            color: #fff;
            text-align: center;
        }
    }
    .home-page-content {
        padding: 10px;
    }
    .home-page-card {
        border-radius: 4px;
        margin-bottom: 20px;
        background: #fff;
        display: flex;
        justify-content: space-around;
        padding: 10px;
        .card {
            text-align: center;
            color: #000;
            font-size: 14px;
            img {
                margin-bottom: 8px;
                width: 60px;
                height: 60px;
            }
        }
    }
    .home-page-recommend {
        font-size: 22px;
        .recommend-content {
            margin-top: 18px;
            font-size: 14px;
            .recommend-item {
                border-radius: 4px;
                margin-bottom: 12px;
                background: #fff;
                padding: 10px;
            }
            .recommend-title {
                display: flex;
                font-size: 18px;
                margin-bottom: 4px;
                color: #222;
                .title {
                    flex-grow: 1;
                }
                img {
                    flex-shrink: 0;
                    margin-left: 18px;
                    border-radius: 4px;
                    width: 70px;
                    height: 70px;
                }
            }
            .recommend-title-two {
                margin-bottom: 4px;
                .title-img {
                    display: flex;
                    justify-content: space-between;
                    img {
                        object-fit: cover;
                        width: 48%;
                        border-radius: 4px;
                        height: 90px;
                    }
                }
                .title {
                    margin-top: 8px;
                    font-size: 18px;
                    color: #222;
                }
            }
            .recommend-time {
                .webset {
                    margin-right: 8px;
                }
                margin-top: 4px;
                font-size: 12px;
                color: #666;
            }
        }
    }
}
</style>
