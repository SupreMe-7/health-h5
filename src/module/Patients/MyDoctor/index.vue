<template>
    <div class="my-doctor">
        <div v-if="hasDoc || hasNewSelect" class="have-doctor">
            <van-cell
                title="您的全科医生"
                :label="`${doctor.hospital} ${doctor.docName}医生`"
                size="large"
            />
            <div v-if="hasNewSelect" class="apply-doctor">
                您已于{{ selectDoctor.selectTime }}日申请{{
                    `${selectDoctor.hospital}${selectDoctor.docName}`
                }}医生作为您的全科医生，请耐心等待医生确认。如需更换全科医生，请重新选择申请。
            </div>
            <van-cell
                v-for="(item, index) in superior"
                :key="index"
                title="您的专科主管医生"
                :label="
                    `${item.hospital}${item.specialty} ${item.level}${item.supName}医生`
                "
                size="large"
            />
            <div class="btn-group">
                <van-button
                    type="info"
                    @click="
                        hasNewSelect = false;
                        hasDoc = false;
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
                :value="applyDoc"
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
        <TabBar type="patients" :nowKey="2"></TabBar>
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
            hasDoc: true,
            doctor: {},
            hasNewSelect: false,
            selectDoctor: {},
            // 专科主管医生列表
            superior: [],

            areaList: areaList,
            address: '',
            applyDoc: '',
            dId: '',
            showDoctorPicker: false,
            showAddressPicker: false,
            // 医生列表
            hospitalDoctor: [],
        };
    },
    computed: {},
    mounted() {
        this.pId = sessionStorage.getItem('PID') || '';
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
        choseDoctor() {
            if (!this.applyDoc) {
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
                    this.getDoctor();
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
                    this.showDoctorPicker = true;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirmDoctor(value) {
            this.applyDoc = value?.text;
            this.dId = value?.dId;
            this.showDoctorPicker = false;
        },
        getDoctor() {
            this.$api
                .get(`/qkys/api/getDocsByPId/${this.pId}`)
                .then(res => {
                    const {
                        hasDoc,
                        doctor = {},
                        hasNewSelect,
                        selectDoctor = {},
                        superior = [],
                    } = res.data || {};
                    this.hasDoc = hasDoc;
                    this.doctor = doctor;
                    this.hasNewSelect = hasNewSelect;
                    this.selectDoctor = selectDoctor;
                    this.superior = superior;
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
