<template>
    <div class="personal-information">
        <NavBar title="全科医生信息" />
        <div>
            <van-cell-group>
                <van-cell title="姓名" :label="data.name" size="large" />
                <van-cell title="医院" :label="data.hospital" size="large" />
                <van-cell title="手机" :label="data.phone" size="large" />
                <van-cell title="职称" :label="data.level" size="large" />
                <van-cell title="专业" :label="data.specialty" size="large" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Button, Cell, CellGroup, Toast, Empty } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            dId: '',
            data: {},
        };
    },
    computed: {},
    mounted() {
        this.dId = this.$route.query.dId;
        this.getInfo();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Empty.name]: Empty,
        NavBar,
    },
    methods: {
        getInfo() {
            if (!this.dId) {
                return;
            }
            this.$api
                .get(`/qkys/api/sup/getDocByDId/${this.dId}`)
                .then(res => {
                    this.data = res.data || {};
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
