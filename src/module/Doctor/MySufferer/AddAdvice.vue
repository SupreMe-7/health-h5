<template>
    <div class="personal-cases">
        <NavBar title="添加诊疗建议" />
        <van-field
            v-model="advice"
            rows="8"
            autosize
            label="诊疗建议"
            type="textarea"
            maxlength="200"
            placeholder="请输入诊疗建议"
            show-word-limit
        />
        <div class="btn-group">
            <van-button type="info" round @click="submit">提交</van-button>
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
            advice: '',
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
                .post(`/qkys/api/doc/addDoctorAdvice`, {
                    pId: this.pId,
                    doctorId: this.dId,
                    role: 'Doc',
                    advice: this.advice,
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
