<template>
    <div class="personal-cases">
        <NavBar title="添加就诊记录" />
        <van-cell-group>
            <van-field
                label="门诊诊断"
                v-model="zhenDuan"
                size="large"
                placeholder="请输入内容"
            />
            <van-field
                label="病情分析"
                v-model="bingQingFenXi"
                size="large"
                placeholder="请输入内容"
            />
            <van-field
                label="处置"
                v-model="chuZhi"
                size="large"
                placeholder="请输入内容"
            />
            <van-field
                label="就诊时间"
                v-model="diagnoseTime"
                size="large"
                placeholder="请输入内容"
            />
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" round @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
// 添加就诊记录
import { Button, Field, CellGroup, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            pId: null,
            sId: null,
            diagnoseTime: '',
            bingQingFenXi: '',
            chuZhi: '',
            zhenDuan: '',
        };
    },
    computed: {},
    mounted() {
        this.pId = this.$route.query.pId;
        this.sId = sessionStorage.getItem('SID');
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        submit() {
            this.$api
                .post(`/qkys/api/sup/addPatientDiagnosisRecord`, {
                    pId: this.pId,
                    dId: this.sId,
                    bingQingFenXi: this.bingQingFenXi,
                    chuZhi: this.chuZhi,
                    zhenDuan: this.zhenDuan,
                    diagnoseTime: this.diagnoseTime,
                })
                .then(() => {
                    Toast('添加成功');
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
.personal-cases {
    .btn-group {
        margin: 10px;
        text-align: right;
    }
}
</style>
