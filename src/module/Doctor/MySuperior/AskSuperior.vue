<template>
    <div class="ask-superior">
        <NavBar title="咨询上级医生" />
        <van-cell-group>
            <van-field
                readonly
                clickable
                label="患者姓名"
                :value="patient"
                placeholder="请选择要咨询的患者"
            />
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
            <van-button type="info" @click="submit" round>提交</van-button>
        </div>
    </div>
</template>

<script>
import { Button, Divider, Toast, Field, CellGroup } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            dId: null,
            supId: null,
            pId: null,
            patient: '',
            consult: '',
            patientInform: '',
        };
    },
    computed: {},
    mounted() {
        this.pId = this.$route.query.pId;
        this.patient = this.$route.query.name;
        this.dId = sessionStorage.getItem('DID');
        this.supId = this.$route.query.supId;
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        submit() {
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
                .then(() => {
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
