<template>
    <div class="personal-cases">
        <NavBar title="个人病例" />
        <van-cell-group title="健康状况">
            <van-cell title="确诊疾病" label="健康" size="large" />
            <van-cell title="服药情况" label="健康" size="large" />
            <van-cell title="外伤及手术史" label="健康" size="large" />
            <van-cell title="家族史" label="健康" size="large" />
        </van-cell-group>
        <van-cell-group title="生活习惯">
            <van-cell title="嗜烟史" label="有, 3年" size="large" />
            <van-cell title="嗜酒史" label="有, 3年" size="large" />
            <van-cell title="月经史" label="有, 3年" size="large" />
            <van-cell title="体育锻炼" label="有, 3年" size="large" />
            <van-cell title="日照情况" label="有, 3年" size="large" />
            <van-cell title="饮食情况" label="1998-22-22" size="large" />
            <van-cell title="生活规律" label="1998-22-22" size="large" />
        </van-cell-group>
    </div>
</template>

<script>
// 个人病例
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
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.personal-cases {
}
</style>
