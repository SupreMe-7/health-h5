<template>
    <div class="personal-cases">
        <NavBar title="添加就诊记录" />
        <van-cell-group>
            <van-field
                label="就诊时间"
                v-model="diagnoseTime"
                size="large"
                placeholder="请输入内容"
            />
            <van-field
                label="主诉"
                v-model="zhuSu"
                size="large"
                placeholder="请输入内容"
            />
            <van-field
                label="现病史"
                v-model="xianbingshi"
                size="large"
                placeholder="请输入内容"
            />
            <van-field
                label="查体及辅助检查"
                v-model="chaTi"
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
                label="门诊诊断"
                v-model="zhenDuan"
                size="large"
                placeholder="请输入内容"
            />
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
// 个人病例
import { Button, Field, CellGroup, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            pId: null,
            dId: null,
            diagnoseTime: '',
            zhuSu: '',
            xianbingshi: '',
            chaTi: '',
            chuZhi: '',
            zhenDuan: '',
        };
    },
    computed: {},
    mounted() {
        this.pId = this.$route.query.pId;
        this.dId = sessionStorage.getItem('DID');
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
                .post(`/qkys/api/doc/addPatientDiagnosisRecord`, {
                    pId: this.pId,
                    dId: this.dId,
                    zhuSu: this.zhuSu,
                    xianbingshi: this.xianbingshi,
                    chaTi: this.chaTi,
                    chuZhi: this.chuZhi,
                    zhenDuan: this.zhenDuan,
                    diagnoseTime: this.diagnoseTime,
                })
                .then(res => {
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
