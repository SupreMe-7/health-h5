<template>
    <div class="home-page">
        <div class="wrapper1">Home</div>
        <van-button type="primary" @click="jumpUrl('general')"
            >general</van-button
        >
        <van-button type="info" @click="jumpUrl('patients')"
            >patients</van-button
        >
        <van-button type="warning" @click="jumpUrl('supervisor')"
            >supervisor</van-button
        >
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
    components: {
        [Button.name]: Button,
    },
    methods: {
        jumpUrl(name) {
            this.$router.push(`/${name}`);
        },
    },
};
</script>

<style lang="less" scoped>
.home-page {
    .wrapper1 {
        width: 100px;
        height: 100px;
        background: chartreuse;
    }
}
</style>
