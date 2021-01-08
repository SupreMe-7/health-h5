<template>
    <div class="home-page">
        <div class="home-page-header">
            <div class="header-address">{{ address }}</div>
            <van-badge :content="unreadNotice" max="9">
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
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <van-image fit="contain" :src="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="home-page-card">
            <div class="card-row">
                <div class="card" @click="toUrl('/patients/my-doctor')">
                    {{ docName ? `我的全科医生` : '选择全科医生' }}
                </div>
                <div class="card">添加监测日历</div>
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
// 首页
import {
    Button,
    Uploader,
    Swipe,
    SwipeItem,
    Badge,
    Image as VanImage,
    NoticeBar,
    Toast,
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
            recommend: [
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
                'fbtb个人股热狗收发文Greg而给第三方士大夫违法微服务是的冯绍峰发为',
            ],
            docName: '',
        };
    },
    mounted() {
        this.getPaByPhone();
    },
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
        getPaByPhone() {
            const phone = sessionStorage.getItem('USER_PHONE');
            this.$api
                .get(`/qkys/api/getPaByPhone/${phone}`)
                .then(res => {
                    const { id, docName } = res.data;
                    this.docName = docName;
                    sessionStorage.setItem('PATIENT_ID', id);
                    console.log(res);
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        toUrl(url) {
            this.$router.push(url);
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
