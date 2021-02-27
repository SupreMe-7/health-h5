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
        <div class="title">全科e医生</div>
        <div class="item">
            <div class="identity">个人用户</div>
            <div>
                Android客户端
                <a
                    href="https://qkys.zhugaotech.com/downloads/Qkys_android_person.apk"
                    >下载</a
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
                <a href="https://qkys.zhugaotech.com/#/patients"
                    >全科e医生网页版</a
                >
            </div>
        </div>
        <div class="item">
            <div class="identity">医生用户</div>
            <div>
                Android客户端
                <a
                    href="https://qkys.zhugaotech.com/downloads/Qkys_android_doctor.apk"
                    >下载</a
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
                <a href="https://qkys.zhugaotech.com/#/patients"
                    >全科e医生网页版</a
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.download-page {
    .logo {
        text-align: center;
    }
    .title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
    }
    .item {
        padding: 20px;
        border: 1px solid rgb(186,198,212);
        margin-top: 30px;
        text-align: center;
    }
    .identity {
        margin-bottom: 10px;
    }
    .wangye {
        margin-top: 10px;
    }
}
</style>
