<template>
    <div class="home-page">
        <div class="home-page-header">
            <div class="header-address">{{ address }}</div>
            <van-badge :content="unreadNotice" max="9">
                <div class="header-news">消息</div>
            </van-badge>
        </div>
        <div class="home-page-swiper">
            <van-swipe
                :autoplay="2000"
                class="my-swipe"
                indicator-color="white"
            >
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <van-image fit="contain" :src="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="home-page-card">
            <div class="card-row">
                <div class="card" @click="choseDocter">选择全科医生</div>
                <div class="card">添加监测日历</div>
            </div>
            <div class="card-row">
                <div class="card">查看诊疗建议</div>
                <div class="card">查看病例</div>
            </div>
        </div>
        <div class="home-page-notice">
            <div>通知</div>
            <div class="notice-content">
                <div
                    class="notice-item"
                    v-for="(notice, index) in notices"
                    :key="index"
                >
                    {{ notice }}
                </div>
            </div>
        </div>
        <div class="home-page-recommend">
            <div>推荐</div>
            <div class="recommend-content">
                <div
                    class="recommend-item"
                    v-for="(notice, index) in recommend"
                    :key="index"
                >
                    {{ notice }}
                </div>
            </div>
        </div>
        <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            :before-read="beforeRead"
        />
        <TabBar :nowKey="0"></TabBar>
    </div>
</template>

<script>
import {
    Button,
    Uploader,
    Swipe,
    SwipeItem,
    Badge,
    Image as VanImage,
    NoticeBar,
} from 'vant';
import TabBar from '@/components/TabBar.vue';
export default {
    data() {
        return {
            address: '北京市海淀区上地西路6号',
            fileList: [],
            unreadNotice: 20,
            images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
                'https://img.yzcdn.cn/vant/cat.jpeg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
            ],
            notices: [
                '来来来, 来来来法第三方士大夫反对违法维A酸多按收费方式发生的发送到水电费谁都防守打法水电费',
                '来来来, 来来来法第三方士大夫反对违法维A酸多按收费方式发生的发送到水电费谁都防守打法水电费',
                '来来来, 来来来法第三方士大夫反对违法维A酸多按收费方式发生的发送到水电费谁都防守打法水电费',
            ],
            recommend: [
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
            ],
        };
    },
    mounted() {},
    components: {
        [Button.name]: Button,
        [Uploader.name]: Uploader,
        TabBar,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Badge.name]: Badge,
        [VanImage.name]: VanImage,
        [NoticeBar.name]: NoticeBar,
        // [Icon.name]: Icon,
    },
    methods: {
        jumpUrl(name) {
            this.$router.push(`/${name}`);
        },
        afterRead(file) {
            console.log('----', file);
        },
        beforeRead(file) {
            console.log('====', file);
            let img = new File([file], 'bar.jpg', {
                type: 'image/jpeg',
            });
            return img;
        },
        choseDocter() {
            this.$api
                .get('/sss/xxxxxx')
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.home-page {
    padding: 10px 8px;
    .home-page-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 0 6px;
        .header-address {
            width: 50%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
                width: 45%;
                height: 80px;
                line-height: 80px;
                font-size: 20px;
                background-color: #39a9ed;
                text-align: center;
            }
        }
    }
    .home-page-notice {
        margin-bottom: 14px;
        font-size: 24px;
        .notice-content {
            font-size: 14px;
            border: 1px solid #000;
            max-height: 100px;
            overflow: auto;
            .notice-item {
                padding: 2px 0 2px 2px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .home-page-recommend {
        font-size: 24px;
        .recommend-content {
            font-size: 14px;
            border: 1px solid #000;
            max-height: 100px;
            overflow: auto;
            .recommend-item {
                padding: 2px 0 2px 2px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>
