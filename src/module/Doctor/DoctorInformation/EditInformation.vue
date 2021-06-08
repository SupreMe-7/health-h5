<template>
    <div>
        <NavBar title="修改个人信息" />
        <van-cell-group>
            <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
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
            <van-field v-model="level" label="职称" placeholder="职称" />
            <van-field v-model="specialty" label="专业" placeholder="专业" />
        </van-cell-group>

        <div class="btn-group">
            <van-button type="info" @click="updateInformation"
                >修改信息</van-button
            >
        </div>
    </div>
</template>

<script>
import { Button, Field, CellGroup, Toast, Popup, Picker } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            dId: null,
            name: null,
            hospital: null,
            level: null,
            specialty: null,
            hospitalList: [],
            showtHospitaPicker: false,
        };
    },
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
        updateInformation() {
            this.$api
                .post(`/qkys/api/doc/updateDoctor`, {
                    id: this.dId,
                    name: this.name || null,
                    level: this.level || null,
                    specialty: this.specialty || null,
                    hospital: this.hospital || null,
                })
                .then(res => {
                    Toast({
                        message: '修改成功',
                        duration: 1000,
                        onClose: () =>
                            this.$router.replace(
                                '/doctor/personal-information'
                            ),
                    });
                })
                .catch(e => {
                    Toast(e.errMsg);
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
            this.getHospitalDoctor();
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
