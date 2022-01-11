<template>
    <div>
        <NavBar title="修改个人信息" />
        <van-cell-group>
            <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
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
            <van-popup v-model="showBirthDatePicker" round position="bottom">
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
                v-model="profession"
                label="职业"
                placeholder="请输入职业"
            />
        </van-cell-group>

        <div class="btn-group">
            <van-button type="info" @click="updateInformation"
                >修改信息</van-button
            >
        </div>
    </div>
</template>

<script>
import {
    Button,
    Field,
    CellGroup,
    Toast,
    Popup,
    Area,
    DatetimePicker,
    Picker,
} from 'vant';
import NavBar from '@/components/NavBar.vue';
import areaList from '@/const/area.js';
import { getPid } from '@/common/util.js';

export default {
    data() {
        return {
            pId: null,
            areaList: areaList,
            name: null,
            sex: null,
            sexPicker: false,
            showAddressPicker: false,
            address: null,
            province: null,
            city: null,
            district: null,
            addressCode: null,
            birthDate: new Date(),
            birthDateTime: null,
            birthDateShow: null,
            showBirthDatePicker: false,
            profession: null,
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2030, 10, 1),
        };
    },
    mounted() {
        this.pId = getPid();
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Popup.name]: Popup,
        [Area.name]: Area,
        [DatetimePicker.name]: DatetimePicker,
        [Picker.name]: Picker,
        NavBar,
    },
    methods: {
        updateInformation() {
            this.$api
                .post(`/qkys/api/updatePatient`, {
                    id: this.pId,
                    name: this.name || null,
                    sex: this.sex || null,
                    birth: this.birthDateTime,
                    province: this.province,
                    city: this.city,
                    district: this.district,
                    profession: this.profession || null,
                })
                .then(res => {
                    Toast({
                        message: '修改成功',
                        duration: 1000,
                        onClose: () =>
                            this.$router.replace(
                                '/patients/personal-information'
                            ),
                    });
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
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
.btn-group {
    padding: 0 10px;
    margin: 10px 0 0 0;
    text-align: right;
}
</style>
