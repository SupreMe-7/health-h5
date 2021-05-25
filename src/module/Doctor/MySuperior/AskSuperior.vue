<template>
    <div class="ask-superior">
        <NavBar title="咨询上级医生" />
        <van-cell-group>
            <van-field
                readonly
                clickable
                label="选择患者"
                :value="patient"
                placeholder="请选择要咨询的患者"
                @click="chosePatientPicker = true"
            />
            <van-popup v-model="chosePatientPicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="patients"
                    @cancel="chosePatientPicker = false"
                    @confirm="confirmPatient"
                    value-key="name"
                />
            </van-popup>
            <van-field
                v-model="patientInform"
                rows="6"
                autosize
                label="患者情况"
                type="textarea"
                placeholder="请输入患者情况"
                show-word-limit
            />
            <van-field
                v-model="consult"
                rows="6"
                autosize
                label="咨询内容"
                type="textarea"
                placeholder="请输入咨询内容"
                show-word-limit
            />
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
import { Button, Divider, Toast, Picker, Field, Popup, CellGroup } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            dId: null,
            supId: null,
            pId: null,
            patient: '',
            chosePatientPicker: false,
            patients: [],
            consult: '',
            patientInform: '',
        };
    },
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
        this.supId = this.$route.query.supId;
        this.getPatients();
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        getPatients() {
            this.$api
                .get(`/qkys/api/doc/getPatientsByDId/${this.dId}`)
                .then(res => {
                    this.patients = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirmPatient(item) {
            this.patient = item.name;
            this.pId = item.pId;
            this.consult = '';
            this.patientInform = '';
            this.chosePatientPicker = false;
        },
        submit() {
            if (!this.patient) {
                Toast('请选择患者');
                return;
            }
            if (!this.consult || !this.patientInform) {
                Toast('请填写完整信息');
                return;
            }
            this.$api
                .post(`/qkys/api/doc/addDoctorConsult`, {
                    dId: this.dId,
                    supId: this.supId,
                    pId: this.pId,
                    patientInform: this.patientInform,
                    consult: this.consult,
                })
                .then(res => {
                    Toast('提交成功');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.ask-superior {
    .btn-group {
        padding: 10px;
        text-align: right;
    }
}
</style>
