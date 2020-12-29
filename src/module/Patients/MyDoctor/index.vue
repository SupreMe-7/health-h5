<template>
    <div class="my-doctor">
        <div v-if="haveDoctor" class="have-doctor">
            <div>
                您已选择XXX医生, 请等待XXX通过您的申请,
            </div>
            <van-cell title="您的全科医生" label="XX医院XX医生" size="large" />
            <van-cell
                title="您的专科主管医生"
                label="XX医院XX科室XX医生"
                size="large"
            />
            <div class="btn-group">
                <van-button type="info" @click="haveDoctor = false"
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
            <div>
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
import { Button, Cell, CellGroup, Picker, Field, Popup, Area } from 'vant';
import TabBar from '@/components/TabBar.vue';
export default {
    data() {
        return {
            haveDoctor: true,
            areaList: areaList,
            address: '',
            doctor: '',
            showDoctorPicker: false,
            showAddressPicker: false,
            // 医生列表
            hospitalDoctor: [
                '杭州',
                '宁波',
                '温州',
                '绍兴',
                '湖州',
                '嘉兴',
                '金华',
                '衢州',
            ],
        };
    },
    computed: {},
    mounted() {},
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Area.name]: Area,
        TabBar,
        // [Icon.name]: Icon,
    },
    methods: {
        choseDoctor() {
            // TODO: 申请选择全科医生
        },
        confirmAddress(value) {
            let temp = '';
            value.forEach(ele => {
                console.log(ele);
                ele && (temp = temp + ele.name);
            });
            this.address = temp;
            this.showAddressPicker = false;
            // TODO: 地址选择后调接口 获取医生列表
        },
        confirmDoctor(value) {
            this.doctor = value;
            this.showDoctorPicker = false;
        },
    },
};
</script>

<style lang="less" scoped>
.my-doctor {
    padding: 10px;
    .have-doctor {
    }
    .btn-group {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
