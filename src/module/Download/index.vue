<template>
    <div class="download-page">
        <div class="logo">
            <img
                src="https://qkys.zhugaotech.com/pics/qkys_logo.jpeg"
                alt=""
                width="100px"
                height="100px"
            />
        </div>
        <div class="title">全科e管理</div>
        <div class="item">
            <div class="item-title">
                Android客户端
                <van-button
                    round
                    type="info"
                    size="small"
                    url="https://qkys.zhugaotech.com/downloads/Qkys_android_person.apk"
                    >立即下载</van-button
                >
            </div>
            <div class="qrcode">
                <img
                    src="https://qkys.zhugaotech.com/pics/qkys_android_person.png"
                    alt=""
                    width="100px"
                    height="100px"
                />
            </div>
            <div class="wangye">
                扫码下载
            </div>
        </div>
        <div class="item">
            <div>
                iphone手机用户请使用网页版客户端
            </div>
            <div class="wangye">
                <a href="https://qkys.zhugaotech.com/#/login"
                    >点击进入全科e管理网页版</a
                >
            </div>
        </div>
        <a href="https://qkys.zhugaotech.com/downloads/userGuide.pdf"
            >查看使用手册</a
        >
    </div>
</template>
<script>
import { Button } from 'vant';
export default {
    data() {
        return {};
    },
    components: {
        [Button.name]: Button,
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.download-page {
    text-align: center;
    .logo {
        text-align: center;
    }
    .title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
    }
    .item {
        margin: 10px 30px;
        background: #f8f8f8;
        border-radius: 8px;
        padding: 20px;
        margin-top: 30px;
        text-align: center;
        .item-title {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 6px;
            .van-button {
                margin-left: 4px;
            }
        }
    }

    .wangye {
        margin-top: 8px;
    }
}
</style>
