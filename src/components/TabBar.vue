<template>
    <van-tabbar v-model="activeKey" placeholder>
        <van-tabbar-item
            v-for="(item, index) in nowTabbarList"
            :key="index"
            :to="item.url"
            :icon="item.icon"
            :badge="item.badge ? item.badge : null"
        >
            {{ item.label }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    props: {
        nowKey: Number,
        type: String,
        unReadChatNum: String,
    },
    data() {
        return {
            nowTabbarList: [],
            patientsNavBar: [
                {
                    label: '首页',
                    icon: 'wap-home-o',
                    url: '/patients/home',
                },
                {
                    label: '监测日历',
                    icon: 'notes-o',
                    url: '/patients/monitor-calendar',
                },
                {
                    label: '医生留言',
                    icon: 'chat-o',
                    url: '/patients/mediciner-chat',
                    badge: null,
                },
                {
                    label: '我的',
                    icon: 'user-o',
                    url: '/patients/mine',
                },
            ],
            doctorNavBar: [
                {
                    label: '首页',
                    icon: 'wap-home-o',
                    url: '/doctor/home',
                },
                {
                    label: '我的患者',
                    icon: 'user-circle-o',
                    url: '/doctor/my-sufferer',
                },
                {
                    label: '留言',
                    icon: 'chat-o',
                    url: '/doctor/chat-list',
                },
                {
                    label: '我的',
                    icon: 'user-o',
                    url: '/doctor/mine',
                },
            ],
            supervisorNavBar: [
                {
                    label: '首页',
                    icon: 'wap-home-o',
                    url: '/supervisor/home',
                },
                {
                    label: '全科医生',
                    icon: 'description',
                    url: '/supervisor/my-doctor',
                },
                {
                    label: '我的',
                    icon: 'user-o',
                    url: '/supervisor/mine',
                },
            ],
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
    watch: {
        unReadChatNum(newVal) {
            this.patientsNavBar[2].badge = +newVal;
        },
    },
    mounted() {
        if (this.type === 'patients') {
            this.nowTabbarList = this.patientsNavBar;
        }
        if (this.type === 'doctor') {
            this.nowTabbarList = this.doctorNavBar;
        }
        if (this.type === 'supervisor') {
            this.nowTabbarList = this.supervisorNavBar;
        }
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
};
</script>
