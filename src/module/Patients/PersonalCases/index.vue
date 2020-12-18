<template>
    <div class="personal-cases">
        <NavBar title="个人病例" />
        <van-cell-group>
            <van-cell title="健康状况" label="健康" size="large" />
            <van-cell
                title="生活习惯"
                label="多喝水, 多睡觉, 好好休息, 天天身体棒棒,多喝水, 多睡觉, 好好休息, 天天身体棒棒,多喝水, 多睡觉, 好好休息, 天天身体棒棒"
                size="large"
            />
            <van-cell title="就诊记录" label="1998-22-22" size="large" />
        </van-cell-group>
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
.personal-cases {
}
</style>
