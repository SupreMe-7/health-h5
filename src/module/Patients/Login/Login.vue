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
import { Button, Field, CellGroup } from 'vant';
import { Toast } from 'vant';
export default {
    data() {
        return {
            smsLogin: false,
            phone: '',
            password: '',
            smsCode: '',
            sendText: '发送验证码',
            sendDisable: false,
        };
    },
    computed: {},
    mounted() {},
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        // [Icon.name]: Icon,
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
                .post(`/qkys/api/user/pa/sendsms?phone=${this.phone}`)
                .then(res => {
                    Toast('验证码发送成功');
                    this.changeSendText();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
            console.log('sendCOde');
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
                .post(`/qkys/api/user/pa/login?param=${data}`)
                .then(res => {
                    const { newUser, token } = res.data || {};
                    sessionStorage.setItem('USER_PHONE', this.phone);
                    if (newUser) {
                        this.$router.push('/patients/registered');
                        return;
                    }
                    sessionStorage.setItem('TOKEN', token);
                    // TODO: 调取bridge存储token
                    this.$router.push('/patients/home');
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
