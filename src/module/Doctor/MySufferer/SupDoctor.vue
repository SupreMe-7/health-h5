<template>
    <div class="personal-information">
        <NavBar title="上级医生信息" />
        <div v-if="supId">
            <van-cell-group>
                <van-cell title="姓名" :label="name" size="large" />
                <van-cell title="医院" :label="hospital" size="large" />
                <van-cell title="手机" :label="phone" size="large" />
                <van-cell title="职称" :label="level" size="large" />
                <van-cell title="专业" :label="specialty" size="large" />
            </van-cell-group>
        </div>
        <van-empty v-else description="暂无上级医生" />
        <div class="btn-group">
            <van-button round type="info" @click="getSup"
                >更改上级医生</van-button
            >
        </div>
        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                title="选择上级医生"
                :columns="supList"
                value-key="supName"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>

<script>
import { Button, Cell, CellGroup, Toast, Picker, Popup, Empty } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            dId: '',
            pId: '',
            supId: '',
            phone: '',
            name: '',
            hospital: '',
            level: '',
            specialty: '',
            supList: [],
            showPicker: false,
        };
    },
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
        this.supId = this.$route.query.supId;
        this.pId = this.$route.query.pId;
        this.getPaByPhone();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Empty.name]: Empty,
        NavBar,
    },
    methods: {
        getPaByPhone() {
            if (!this.supId) {
                return;
            }
            this.$api
                .get(`/qkys/api/doc/getSupBySupId/${this.supId}`)
                .then(res => {
                    const {
                        phone,
                        name,
                        hospital,
                        specialty,
                        level,
                    } = res.data;
                    this.phone = phone;
                    this.name = name;
                    this.hospital = hospital;
                    this.specialty = specialty;
                    this.level = level;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getSup() {
            this.$api
                .get(`/qkys/api/doc/getSupsByDId/${this.dId}`)
                .then(res => {
                    const { data } = res;
                    this.supList = data.superior || [];
                    this.supList.forEach(item => {
                        item.supName = item.hospital + item.supName;
                    });
                    this.showPicker = true;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        onConfirm(data) {
            this.$api
                .post(`/qkys/api/doc/updatePatientSuperior`, {
                    pId: this.pId,
                    dId: this.dId,
                    supId: data.supId,
                })
                .then(() => {
                    this.showPicker = false;
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
.personal-information {
    .personal-cases {
        padding: 10px 10px;
        text-align: right;
    }
    .btn-group {
        padding: 0 10px;
        margin: 10px 0 0 0;
        text-align: right;
        .van-button--normal {
            margin-left: 10px;
        }
    }
}
</style>
