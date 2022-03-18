<template>
    <div class="registered">
        <div class="password-login">
            <van-cell-group>
                <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    disabled
                />
                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                />
                <van-field
                    v-model="password2"
                    type="password"
                    label="确认密码"
                    placeholder="请确认密码"
                />
                <van-field
                    v-model="name"
                    label="姓名"
                    placeholder="请输入姓名"
                />
                <van-field
                    readonly
                    clickable
                    label="医院"
                    :value="hospital"
                    placeholder="选择医院"
                    @click="showtHospitaPicker = true"
                />
                <van-popup v-model="showtHospitaPicker" round position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="hospitalList"
                        @cancel="showtHospitaPicker = false"
                        @confirm="confirmHospital"
                    />
                </van-popup>
                <van-field
                    v-model="idNumber"
                    label="身份证号"
                    placeholder="请输入身份证号"
                />
                <div class="idnumber-extra">
                    身份证号将用于密码找回及更换手机号码, 请谨慎填写
                </div>
                <van-field
                    v-model="specialty"
                    label="专业"
                    placeholder="请输入专业"
                />
                <van-field
                    v-model="level"
                    label="职称"
                    placeholder="请输入职称"
                />
            </van-cell-group>
        </div>
        <div class="register-agreement">
            <!-- TODO: -->
            注册即代表同意<router-link to="/patient/agreement"
                >用户协议</router-link
            >和<router-link to="/patient/agreement">隐私政策</router-link>
        </div>
        <div class="btn-group">
            <van-button type="info" size="large" @click="register" round
                >注册</van-button
            >
        </div>
    </div>
</template>

<script>
// 注册
import { Button, Field, CellGroup, Popup, Toast, Picker, Dialog } from 'vant';
import { setToken } from '@/common/util.js';

export default {
    data() {
        return {
            showtHospitaPicker: false,
            hospitalList: [],
            phone: '',
            password: '',
            password2: '',
            name: '',
            hospital: '',
            idNumber: '',
            level: '',
            specialty: '',
        };
    },
    computed: {},
    mounted() {
        this.phone = this.$route.query.phone;
        this.getHospital();
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Popup.name]: Popup,
        [Picker.name]: Picker,
    },
    methods: {
        register() {
            if (!this.idNumber || !this.name) {
                Toast('请将信息填写完整');
                return;
            }
            if (this.password !== this.password2 || !this.password) {
                Toast('两次密码输入不一致');
                return;
            }
            Dialog.confirm({
                title: '确认信息',
                message: '个人信息提交后不可修改, 请确认信息准确后提交',
            })
                .then(() => {
                    let data = encodeURIComponent(
                        JSON.stringify({
                            phone: this.phone,
                            name: this.name,
                            password: this.password,
                            cardNum: this.idNumber,
                            level: this.level,
                            specialty: this.specialty,
                            hospital: this.hospital,
                        })
                    );
                    this.$api
                        .post(`/qkys/api/user/sup/registe?param=${data}`)
                        .then(res => {
                            const { token } = res.data;
                            setToken(token);
                            this.$router.push('/supervisor/home');
                        })
                        .catch(e => {
                            Toast(e.errMsg);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
        getHospital() {
            this.$api
                .get(`/qkys/api/user/getHospital`)
                .then(res => {
                    this.hospitalList = res.data || [];
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirmHospital(item) {
            this.hospital = item;
            this.showtHospitaPicker = false;
        },
    },
};
</script>

<style lang="less" scoped>
.registered {
    padding: 30px 10px;
    .btn-group {
        padding: 0 10px;
        margin: 50px 0 0 0;
    }
    .idnumber-extra {
        margin: 5px 0 0 0;
        text-align: center;
        color: #ff976a;
        font-size: 14px;
    }
    .register-agreement {
        margin: 20px 0 0 0;
        text-align: center;
        font-size: 14px;
        .blue {
            color: #3e89f2;
        }
    }
}
</style>
