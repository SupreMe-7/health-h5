<template>
    <div class="personal-information">
        <NavBar title="患者信息" />
        <van-cell-group>
            <van-cell title="姓名" :label="name" size="large" />
            <van-cell title="性别" :label="sex" size="large" />
            <van-cell title="出生日期" :label="birth" size="large" />
            <van-cell
                title="所在地"
                :label="`${province}${city}${district}`"
                size="large"
            />
            <van-cell title="身份证号" :label="cardNum" size="large" />
            <van-cell title="手机" :label="phone" size="large" />
            <van-cell title="职业" :label="profession" size="large" />
        </van-cell-group>
    </div>
</template>

<script>
import { Button, Cell, CellGroup, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            pId: null,
            phone: '',
            name: '',
            cardNum: '',
            province: '',
            city: '',
            district: '',
            birth: '',
            sex: '',
            profession: '',
        };
    },
    computed: {},
    mounted() {
        this.pId = this.$route.query.pId;
        this.getPaBypId();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        getPaBypId() {
            this.$api
                .get(`/qkys/api/sup/getPatientByPId/${this.pId}`)
                .then(res => {
                    const {
                        phone,
                        name,
                        cardNum,
                        province,
                        city,
                        district,
                        birth,
                        sex,
                        profession,
                    } = res.data;
                    this.phone = phone;
                    this.name = name;
                    this.cardNum = cardNum;
                    this.province = province;
                    this.city = city;
                    this.district = district;
                    this.sex = sex;
                    this.profession = profession;
                    this.birth = new Date(+birth).toLocaleDateString();
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
    }
}
</style>
