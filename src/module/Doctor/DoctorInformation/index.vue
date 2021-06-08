<template>
    <div class="personal-information">
        <NavBar title="个人信息" />
        <van-cell-group>
            <van-cell title="姓名" :label="name" size="large" />
            <van-cell title="身份证号" :label="cardNum" size="large" />
            <van-cell title="医院" :label="hospital" size="large" />
            <van-cell title="手机" :label="phone" size="large" />
            <van-cell title="职称" :label="level" size="large" />
            <van-cell title="专业" :label="specialty" size="large" />
        </van-cell-group>
        <div class="btn-group">
            <van-button
                type="info"
                @click="jumpUrl('/doctor/personal-edit-phone-password')"
                >修改手机号及密码</van-button
            >
            <van-button
                type="info"
                @click="jumpUrl('/doctor/personal-edit-information')"
                >修改个人信息</van-button
            >
        </div>
    </div>
</template>

<script>
import { Button, Cell, CellGroup, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            phone: '',
            name: '',
            cardNum: '',
            hospital: '',
            level: '',
            specialty: '',
        };
    },
    computed: {},
    mounted() {
        this.getPaByPhone();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        jumpUrl(url) {
            this.$router.push(url);
        },
        getPaByPhone() {
            this.$api
                .get(`/qkys/api/doc/getDocByToken`)
                .then(res => {
                    const {
                        phone,
                        name,
                        cardNum,
                        hospital,
                        specialty,
                        level,
                    } = res.data;
                    this.phone = phone;
                    this.name = name;
                    this.cardNum = cardNum;
                    this.hospital = hospital;
                    this.specialty = specialty;
                    this.level = level;
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
