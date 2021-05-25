<template>
    <div>
        <NavBar title="修改手机号及密码" />
        <van-cell-group>
            <van-field
                size="large"
                v-model="cardNum"
                label="身份证号"
                placeholder="请输入身份证号"
            />
            <van-field
                size="large"
                v-model="phone"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                size="large"
                v-model="password"
                label="密码"
                placeholder="请输入密码"
            />
        </van-cell-group>

        <div class="btn-group">
            <van-button type="info" @click="updatePhone">修改手机号</van-button>
        </div>
        <div class="btn-group">
            <van-button type="info" @click="updatePassword"
                >修改密码</van-button
            >
        </div>
    </div>
</template>

<script>
import { Button, Field, CellGroup, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            pId: '',
            cardNum: '',
            phone: '',
            password: '',
        };
    },
    mounted() {
        this.pId = sessionStorage.getItem('PID');
    },
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        updatePhone() {
            if (!this.cardNum) {
                Toast('请输入有效的身份证号！');
                return;
            }
            const phoneReg = /(^1\d{10}$)/;
            if (!phoneReg.test(this.phone)) {
                Toast('请输入有效的手机号码！');
                return false;
            }
            this.$api
                .post(`/qkys/api/updatePhone`, {
                    id: this.pId,
                    role: 'Pa',
                    cardNum: this.cardNum,
                    phone: this.phone,
                })
                .then(res => {
                    Toast({
                        message: '修改成功',
                        duration: 1000,
                        onClose: () => this.$router.push('/patients/login'),
                    });
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        updatePassword() {
            if (!this.cardNum) {
                Toast('请输入有效的身份证号！');
                return;
            }
            this.$api
                .post(`/qkys/api/updatePassword`, {
                    id: this.pId,
                    role: 'Pa',
                    cardNum: this.cardNum,
                    password: this.password,
                })
                .then(res => {
                    Toast({
                        message: '修改成功',
                        duration: 1000,
                        onClose: () => this.$router.push('/patients/login'),
                    });
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
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
