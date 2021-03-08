<template>
    <div class="doc-chose-superior">
        <NavBar title="选择上级医生" />

        <van-cell-group>
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
                readonly
                clickable
                label="上级医生"
                :value="doctorObj.supName"
                placeholder="选择上级医生"
                @click="showtHospitaDoctorPicker = true"
            />
            <van-popup
                v-model="showtHospitaDoctorPicker"
                round
                position="bottom"
            >
                <van-picker
                    show-toolbar
                    :columns="hospitalDoctorList"
                    @cancel="showtHospitaDoctorPicker = false"
                    @confirm="confirmHospitalDoctor"
                    value-key="supName"
                />
            </van-popup>
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
// 注册
import { Button, Field, CellGroup, Popup, Toast, Picker } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            dId: null,
            showtHospitaPicker: false,
            showtHospitaDoctorPicker: false,
            hospitalList: [],
            hospitalDoctorList: [],
            hospital: '',
            doctorObj: '',
        };
    },
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
        this.getHospital();
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Popup.name]: Popup,
        [Picker.name]: Picker,
        NavBar,
    },
    methods: {
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
        getHospitalDoctor() {
            this.$api
                .get(
                    `/qkys/api/doc/getSupByHospital/${encodeURIComponent(
                        this.hospital
                    )}`
                )
                .then(res => {
                    this.hospitalDoctorList = res.data || [];
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirmHospital(item) {
            this.hospital = item;
            this.showtHospitaPicker = false;
            this.getHospitalDoctor();
        },
        confirmHospitalDoctor(item) {
            this.doctorObj = item;
            this.showtHospitaDoctorPicker = false;
        },
        submit() {
            this.$api
                .post(`/qkys/api/doc/insertSelectSup`, {
                    dId: this.dId,
                    supId: this.doctorObj.supId,
                })
                .then(res => {
                    Toast('申请成功');
                    this.$router.back();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.doc-chose-superior {
    .btn-group {
        padding: 15px 0;
        text-align: right;
    }
}
</style>
