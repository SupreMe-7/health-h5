<template>
    <div class="personal-information">
        <NavBar title="医生个人信息" />
        <van-cell-group>
            <van-cell title="姓名" :label="name" size="large" />
            <van-cell title="医院" :label="hospital" size="large" />
            <van-cell title="手机" :label="phone" size="large" />
            <van-cell title="职称" :label="level" size="large" />
            <van-cell title="专业" :label="specialty" size="large" />
        </van-cell-group>
    </div>
</template>

<script>
import { Button, Cell, CellGroup, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            dId: null,
            phone: '',
            name: '',
            hospital: '',
            level: '',
            specialty: '',
        };
    },
    computed: {},
    mounted() {
        this.dId = this.$route.query.dId;
        this.getPaByPhone();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        NavBar,
    },
    methods: {
        getPaByPhone() {
            this.$api
                .get(`/qkys/api/sup/getDocByDId/${this.dId}`)
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
    },
};
</script>

<style lang="less" scoped>
.personal-information {
    .personal-cases {
        padding: 10px 10px;
        text-align: right;
    }
}
</style>
