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
                    v-model="sex"
                    label="性别"
                    placeholder="请选择性别"
                    @click="sexPicker = true"
                />
                <van-popup v-model="sexPicker" round position="bottom">
                    <van-picker
                        title="选择性别"
                        show-toolbar
                        :columns="['男', '女']"
                        @confirm="
                            value => {
                                sex = value;
                                sexPicker = false;
                            }
                        "
                        @cancel="sexPicker = false"
                    />
                </van-popup>
                <van-field
                    readonly
                    clickable
                    label="居住地"
                    :value="address"
                    placeholder="选择居住地"
                    @click="showAddressPicker = true"
                />
                <van-popup v-model="showAddressPicker" round position="bottom">
                    <van-area
                        title="选择地址"
                        :area-list="areaList"
                        :columns-placeholder="['请选择', '请选择', '请选择']"
                        @cancel="showAddressPicker = false"
                        @confirm="confirmAddress"
                    />
                </van-popup>
                <van-field
                    readonly
                    clickable
                    label="出生日期"
                    :value="birthDateShow"
                    placeholder="选择出生日期"
                    @click="showBirthDatePicker = true"
                />
                <van-popup
                    v-model="showBirthDatePicker"
                    round
                    position="bottom"
                >
                    <van-datetime-picker
                        v-model="birthDate"
                        type="date"
                        title="选择出生日期"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :formatter="formatter"
                        @confirm="choseBirthDate"
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
                    v-model="profession"
                    label="职业"
                    placeholder="请输入职业"
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
            <van-button type="info" size="large" @click="register"
                >注册</van-button
            >
        </div>
    </div>
</template>

<script>
// 注册
import areaList from '@/const/area.js';
import {
    Button,
    Field,
    CellGroup,
    Popup,
    Area,
    DatetimePicker,
    Toast,
    Picker,
    Dialog,
} from 'vant';
export default {
    data() {
        return {
            areaList: areaList,
            phone: '',
            password: '',
            password2: '',
            name: '',
            sex: '',
            sexPicker: false,
            showAddressPicker: false,
            address: '',
            province: '',
            city: '',
            district: '',
            addressCode: '',
            birthDate: new Date(),
            birthDateTime: '',
            birthDateShow: '',
            showBirthDatePicker: false,
            idNumber: '',
            profession: '',
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2030, 10, 1),
        };
    },
    computed: {},
    mounted() {
        this.phone = sessionStorage.getItem('USER_PHONE');
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Popup.name]: Popup,
        [Area.name]: Area,
        [DatetimePicker.name]: DatetimePicker,
        [Picker.name]: Picker,
    },
    methods: {
        confirmAddress(value) {
            this.province = value[0]?.name;
            this.city = value[1]?.name;
            this.district = value[2]?.name;
            let temp = '';
            value.forEach(ele => {
                if (ele) {
                    temp = temp + ele.name;
                }
            });
            this.address = temp;
            this.showAddressPicker = false;
        },
        register() {
            if (
                !this.idNumber ||
                !this.name ||
                !this.birthDateShow ||
                !this.sex
            ) {
                Toast('请将信息填写完整');
                return;
            }
            if (!this.province || !this.city || !this.district) {
                Toast('请选择省市区');
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
                            sex: this.sex,
                            password: this.password,
                            cardNum: this.idNumber,
                            birth: this.birthDateTime,
                            province: this.province,
                            city: this.city,
                            district: this.district,
                            profession: this.profession,
                        })
                    );
                    this.$api
                        .post(`/qkys/api/user/pa/registe?param=${data}`)
                        .then(res => {
                            const { token, phone } = res.data;
                            // TODO: 调取bridge存储token
                            sessionStorage.setItem('TOKEN', token);
                            sessionStorage.setItem('USER_PHONE', phone);
                            this.$router.push('/patients/home');
                        })
                        .catch(e => {
                            Toast(e.errMsg);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
        choseBirthDate(value) {
            this.birthDate = value;
            this.birthDateTime = value.getTime() + '';
            this.birthDateShow = value.toLocaleDateString();
            this.showBirthDatePicker = false;
        },
        formatter(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            return val;
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
