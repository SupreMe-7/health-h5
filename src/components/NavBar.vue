<template>
    <van-nav-bar
        left-text="返回"
        placeholder
        :title="title"
        left-arrow
        fixed
        @click-left="onClickLeft"
    />
</template>

<script>
// 网页上方通用导航栏
import { NavBar } from 'vant';
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    components: {
        [NavBar.name]: NavBar,
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
    },
};
</script>
