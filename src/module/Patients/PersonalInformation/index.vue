<template>
    <div class="personal-information">
        <NavBar title="个人信息" />
        <van-cell-group>
            <van-cell title="姓名" label="张三" size="large" />
            <van-cell title="性别" label="男" size="large" />
            <van-cell title="出生日期" label="1998-22-22" size="large" />
            <van-cell title="所在地" label="北京市-海淀区" size="large" />
            <van-cell title="身份证号" label="2435345345345345" size="large" />
            <van-cell title="手机" label="13445454543333" size="large" />
            <van-cell title="职业" label="码农" size="large" />
        </van-cell-group>
        <van-button type="info">修改</van-button>
    </div>
</template>

<script>
import { Button, Cell, CellGroup } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        NavBar,
        // [Icon.name]: Icon,
    },
    methods: {},
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
