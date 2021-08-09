<template>
    <div class="new-doctor-consult">
        <NavBar title="新全科医生咨询" />
        <div v-for="(item, index) in list" :key="index" class="item">
            <van-row>
                <van-col span="12">{{ item.doctorName }}医生</van-col>
                <van-col span="12">{{ item.createTime }}</van-col>
            </van-row>
            <div>
                患者情况说明:
                <span class="text">{{ item.patientInformation }}</span>
            </div>
            <div>
                咨询内容: <span class="text">{{ item.consult }}</span>
            </div>
            <div class="btn-group">
                <van-button type="info" size="small" @click="check(item)"
                    >查看</van-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Col, Row, Button, Toast } from 'vant';
export default {
    data() {
        return {
            sId: null,
            list: [],
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
        [Button.name]: Button,
    },
    async mounted() {
        this.sId = sessionStorage.getItem('SID');
        await this.getConsult();
    },
    methods: {
        getConsult() {
            this.$api
                .get(`/qkys/api/sup/getNewDoctorConsultBySupId/${this.sId}`)
                .then(res => {
                    this.list = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        check(item) {
            sessionStorage.setItem('new-doctor-consult', JSON.stringify(item));
            this.$router.push('/supervisor/answer-doctor-consult');
        },
    },
};
</script>

<style lang="less" scoped>
.new-doctor-consult {
    .item {
        padding: 10px;
        border-bottom: 1px solid rgb(120, 117, 117);
        .btn-group {
            padding: 0 10px;
            margin: 10px 0 0 0;
            text-align: right;
        }
    }
}
</style>
