<template>
    <div class="login-page">
        <div class="login-title">
            <div class="login-title-left"></div>
            <div class="login-title-name">选择您登录的身份</div>
            <div class="login-title-right"></div>
        </div>
        <div class="login-item" @click="jumpUrl('/patients/login')">
            <div class="login-item-label">
                <img
                    width="40px"
                    src="https://i.52112.com/icon/256/20160609/2171/118512.png"
                    alt=""
                />
                <span class="login-item-name">患者登录</span>
            </div>
            <van-icon name="arrow" />
        </div>
        <div class="login-item" @click="jumpUrl('/doctor/login')">
            <div class="login-item-label">
                <img
                    width="40px"
                    src="https://tse2-mm.cn.bing.net/th/id/OIP.ihhgzDlrGRKHugGZYrDlWQHaHa?pid=ImgDet&rs=1"
                    alt=""
                />
                <span class="login-item-name">全科医生登录</span>
            </div>
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant';

export default {
    methods: {
        jumpUrl(url) {
            this.$router.push(url);
        },
    },
    components: {
        [Icon.name]: Icon,
    },
};
</script>

<style lang="less" scoped>
.login-page {
    padding: 10vh 0 0 0;
    .login-title {
        margin: 0 0 19px;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-title-left {
            width: 47px;
            height: 20px;
            margin-right: 9px;
            background-image: url(//ali-ec.static.yximgs.com/udata/pkg/ks-merchant/kwaishop-seller-login/left.png);
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: 100%;
        }
        .login-title-name {
            height: 28px;
            font-size: 20px;
            font-weight: 600;
            color: #222;
            line-height: 28px;
        }
        .login-title-right {
            width: 47px;
            height: 20px;
            margin-left: 9px;
            background-image: url(//ali-ec.static.yximgs.com/udata/pkg/ks-merchant/kwaishop-seller-login/right.png);
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: 100%;
        }
    }
    .login-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        margin: 40px 40px;
        text-align: center;
        background: rgba(255, 106, 50, 0.07);
        border-radius: 4px;
        .login-item-label {
            display: flex;
            align-items: center;
        }
        .login-item-name {
            margin-left: 10px;
        }
    }
}
</style>
