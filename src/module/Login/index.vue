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
                    src="https://cos.zhugaotech.com/logo/WechatIMG389.jpeg"
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
                    src="https://cos.zhugaotech.com/firstPage/doctor_pic.jpg"
                    alt=""
                />
                <span class="login-item-name">全科医生登录</span>
            </div>
            <van-icon name="arrow" />
        </div>
        <div class="login-item" @click="jumpUrl('/supervisor/login')">
            <div class="login-item-label">
                <img
                    width="40px"
                    src="https://cos.zhugaotech.com/firstPage/superiorDoctor_pic.jpg"
                    alt=""
                />
                <span class="login-item-name">上级医生登录</span>
            </div>
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant';
import { getToken } from '@/common/util.js';
import { Toast } from 'vant';
export default {
    data() {
        return {};
    },
    methods: {
        jumpUrl(url) {
            this.$router.push(url);
        },
    },
    components: {
        [Icon.name]: Icon,
    },
    mounted() {
        if (getToken()) {
            this.$api
                .get(`/qkys/api/user/getRoleByToken`)
                .then(res => {
                    let userType = res.data;
                    if (userType === 'Pa') {
                        this.$router.push('/patients/home');
                        return;
                    }
                    if (userType === 'Doc') {
                        this.$router.push('/doctor/home');
                        return;
                    }
                    if (userType === 'Sup') {
                        this.$router.push('/supervisor/home');
                        return;
                    }
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        }
    },
};
</script>

<style lang="less" scoped>
.login-page {
    background: #f8f8f8;
    padding: 10vh 0 0 0;
    height: 100%;
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
        background: #fff;
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
