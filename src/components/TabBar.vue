<template>
    <van-tabbar v-model="activeKey" placeholder>
        <van-tabbar-item
            v-for="(item, index) in nowTabbarList"
            :key="index"
            :to="item.url"
            :icon="item.icon"
        >
            {{ item.label }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import {
    patientsNavBar,
    generalNavBar,
    supervisorNavBar,
} from '@/const/index.js';
export default {
    props: {
        nowKey: Number,
    },
    data() {
        return {
            nowTabbarList: [],
            type: 1,
        };
    },
    computed: {
        activeKey: {
            get() {
                return this.nowKey;
            },
            set() {},
        },
    },
    mounted() {
        if (this.type === 1) {
            this.nowTabbarList = patientsNavBar;
        }
        if (this.type === 2) {
            this.nowTabbarList = generalNavBar;
        }
        if (this.type === 3) {
            this.nowTabbarList = supervisorNavBar;
        }
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
};
</script>
