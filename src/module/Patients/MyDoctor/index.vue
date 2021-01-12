<template>
    <div class="my-doctor">
        <div v-if="isHasSelection || currentDoc" class="have-doctor">
            <van-cell title="您的全科医生" :label="currentDoc" size="large" />
            <div v-if="isHasSelection" class="apply-doctor">
                您已于{{ selectedTime }}日申请{{
                    docName
                }}医生作为您的全科医生，请耐心等待医生确认。如需更换全科医生，请重新选择申请。
            </div>
            <van-cell
                title="您的专科主管医生"
                label="XX医院XX科室XX医生"
                size="large"
            />
            <div class="btn-group">
                <van-button
                    type="info"
                    @click="
                        isHasSelection = false;
                        currentDoc = '';
                    "
                    >申请变更全科医生</van-button
                >
            </div>
        </div>
        <div v-else>
            <van-field
                readonly
                clickable
                label="选择地址"
                :value="address"
                placeholder="选择地址"
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
                label="选择全科医生"
                :value="doctor"
                placeholder="选择全科医生"
                @click="showDoctorPicker = true"
            />
            <van-popup v-model="showDoctorPicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="hospitalDoctor"
                    @cancel="showDoctorPicker = false"
                    @confirm="confirmDoctor"
                />
            </van-popup>
            <div class="extra" v-if="address && !hospitalDoctor.length">
                您选择的地区, 暂无符合条件的医院, 请选择附近的地址
            </div>
            <div class="btn-group">
                <van-button type="info" @click="choseDoctor">申请</van-button>
            </div>
        </div>
        <TabBar :nowKey="2"></TabBar>
    </div>
</template>

<script>
import areaList from '@/const/area.js';
import { Button, Cell, Picker, Field, Popup, Area, Toast } from 'vant';
import TabBar from '@/components/TabBar.vue';
export default {
    data() {
        return {
            pId: '',
            isHasSelection: true,
            docName: '',
            selectedTime: '',

            areaList: areaList,
            address: '',
            doctor: '',
            dId: '',
            showDoctorPicker: false,
            showAddressPicker: false,
            // 医生列表
            hospitalDoctor: [],

            currentDoc: '',
            isConfirmed: false,
        };
    },
    computed: {},
    mounted() {
        this.pId = sessionStorage.getItem('PID') || '';
        this.getSelectedDocByPId();
        this.getDoctor();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Area.name]: Area,
        TabBar,
    },
    methods: {
        getSelectedDocByPId() {
            this.$api
                .get(`/qkys/api/getSelectedDocByPId/${this.pId}`)
                .then(res => {
                    const { isHasSelection, docName, selectedTime } = res.data;
                    this.isHasSelection = isHasSelection;
                    this.docName = docName;
                    this.selectedTime = (selectedTime || '').slice(0, 10);
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        choseDoctor() {
            if (!this.doctor) {
                Toast('请选择医生');
                return;
            }
            this.$api
                .post(`/qkys/api/insertSelectDoc`, {
                    pId: this.pId,
                    dId: this.dId,
                })
                .then(res => {
                    Toast('申请成功');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirmAddress(value) {
            const province = value[0]?.name;
            const city = value[1]?.name;
            const district = value[2]?.name;
            let temp = '';
            value.forEach(ele => {
                if (ele) {
                    temp = temp + ele.name;
                }
            });
            this.address = temp;
            this.showAddressPicker = false;
            // 地址选择后 获取医生列表
            this.$api
                .post(`/qkys/api/getDocByArea`, {
                    province: province || null,
                    city: city || null,
                    district: district || null,
                })
                .then(res => {
                    this.hospitalDoctor = res.data;
                    this.hospitalDoctor.forEach(item => {
                        item.text = item?.hospital + item?.docName + '医生';
                    });
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirmDoctor(value) {
            this.doctor = value?.text;
            this.dId = value?.dId;
            this.showDoctorPicker = false;
        },
        getDoctor() {
            this.$api
                .get(`/qkys/api/getDocByPId/${this.pId}`)
                .then(res => {
                    const { name = '', hospital = '' } = res.data || {};
                    this.currentDoc = name + hospital;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-doctor {
    padding: 10px;
    .have-doctor {
        .apply-doctor {
            font-size: 12px;
            text-align: center;
            color: rgb(9, 54, 84);
        }
    }
    .extra {
        text-align: center;
        font-size: 14px;
        color: rgb(9, 54, 84);
    }
    .btn-group {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
