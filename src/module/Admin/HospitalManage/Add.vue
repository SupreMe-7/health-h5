<template>
    <div class="add">
        <NavBar title="添加机构" />
        <van-cell-group>
            <van-field
                v-model="hospital"
                label="医院名称"
                placeholder="请输入医院名称"
            />
            <van-field
                readonly
                clickable
                label="医院地址"
                :value="address"
                placeholder="请选择医院所在地址"
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
                v-model="level"
                label="医院级别"
                placeholder="请输入医院级别"
            />
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" @click="addMsg">提交</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import areaList from '@/const/area.js';
import { Field, Toast, Popup, CellGroup, Button, Area } from 'vant';
export default {
    data() {
        return {
            areaList: areaList,
            hospital: '',
            showAddressPicker: false,
            address: '',
            province: '',
            city: '',
            level: '',
        };
    },
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
    },
    components: {
        NavBar,
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Popup.name]: Popup,
        [Area.name]: Area,
    },
    methods: {
        addMsg() {
            this.$api
                .post(`/qkys/api/admin/addHospital`, {
                    hospital: this.hospital,
                    province: this.province,
                    city: this.city,
                    district: this.district,
                    level: this.level,
                })
                .then(() => {
                    this.$router.back();
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
    },
};
</script>

<style lang="less" scoped>
.btn-group {
    text-align: right;
    padding: 20px;
}
</style>
