<template>
    <div class="login">
        <div class="password-login">
            <van-cell-group>
                <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-if="!smsLogin"
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                />
                <van-field
                    v-if="smsLogin"
                    v-model="smsCode"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                >
                    <template v-if="smsLogin" #button>
                        <van-button
                            size="small"
                            type="primary"
                            @click="sendSmsCode"
                            :disabled="sendDisable"
                            >{{ sendText }}</van-button
                        >
                    </template>
                </van-field>
            </van-cell-group>
        </div>

        <div class="btn-group">
            <van-button type="info" size="large" @click="login"
                >登录</van-button
            >
        </div>

        <div class="change-type">
            <span @click="changeType">{{
                !smsLogin ? '切换至验证码登录' : '切换至密码登录'
            }}</span>
        </div>
    </div>
</template>

<script>
// 登录
import { Button, Field, CellGroup } from 'vant';
import { Toast } from 'vant';
import { setToken } from '@/common/util.js';
export default {
    data() {
        return {
            smsLogin: true,
            phone: '',
            password: '',
            smsCode: '',
            sendText: '发送验证码',
            sendDisable: false,
        };
    },
    computed: {},
    mounted() {
        console.log(window);
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
    },
    methods: {
        changeSendText() {
            const that = this;
            let time = 60;
            this.sendDisable = true;
            let timeInt = setInterval(() => {
                that.sendText = time-- + '秒后重发';
                if (time === -1) {
                    that.sendText = '发送验证码';
                    that.sendDisable = false;
                    window.clearInterval(timeInt);
                }
            }, 1000);
        },
        changeType() {
            if (this.smsLogin) {
                this.smsCode = '';
                this.smsLogin = !this.smsLogin;
                return;
            }
            this.password = '';
            this.smsLogin = !this.smsLogin;
        },
        sendSmsCode() {
            const phoneReg = /(^1\d{10}$)/;
            if (!phoneReg.test(this.phone)) {
                Toast('请输入有效的手机号码！');
                return false;
            }
            this.$api
                .post(`/qkys/api/user/doc/sendsms?phone=${this.phone}&role=Doc`)
                .then(res => {
                    Toast('验证码发送成功');
                    this.changeSendText();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        login() {
            let data = encodeURIComponent(
                JSON.stringify({
                    phone: this.phone,
                    code: this.smsCode,
                    password: this.password,
                    mode: this.smsLogin ? 'sms' : 'password',
                })
            );
            this.$api
                .post(`/qkys/api/user/doc/login?param=${data}`)
                .then(res => {
                    const { newUser, token } = res.data || {};
                    if (newUser) {
                        this.$router.push(
                            `/doctor/registered?phone=${this.phone}`
                        );
                        return;
                    }
                    setToken(token);
                    this.$router.push('/doctor/home');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    padding: 30px 10px;
    .btn-group {
        padding: 0 10px;
        margin: 50px 0 0 0;
    }
    .change-type {
        margin: 20px 0 0 0;
        text-align: right;
        color: rgb(9, 54, 84);
    }
}
</style>
