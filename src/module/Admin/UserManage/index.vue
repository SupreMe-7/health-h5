<template>
    <div class="user-manage">
        <NavBar title="用户管理" />
        <div class="fun-content">
            <div
                v-for="(item, index) in funList"
                :key="index"
                class="fun-item"
                @click="toFun(item.url)"
            >
                {{ item.label }}
                <div class="num">当前有效用户数量：{{ item.num }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Badge, Toast } from 'vant';
export default {
    data() {
        return {
            funList: [
                {
                    label: '患者用户',
                    url: '/admin/user-manage/pa',
                    num: '',
                },
                {
                    label: '全科医生用户',
                    url: '/admin/user-manage/doc',
                    num: '',
                },
                {
                    label: '上级医生用户',
                    url: '/admin/user-manage/sup',
                    num: '',
                },
            ],
        };
    },
    components: {
        NavBar,
        [Badge.name]: Badge,
    },
    mounted() {
        this.getUserNum();
    },
    methods: {
        getUserNum() {
            this.$api
                .get(`/qkys/api/admin/getUserNumberAdmin`)
                .then(res => {
                    const { data } = res;
                    this.funList[0].num = data.patinetNum;
                    this.funList[1].num = data.docNum;
                    this.funList[2].num = data.supNum;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        toFun(url) {
            this.$router.push(url);
        },
    },
};
</script>

<style lang="less" scoped>
.user-manage {
    padding: 10px 20px;
    .fun-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .fun-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin: 0 0 20px 0;
            width: 45%;
            height: 100px;
            background-color: #59a7e7;
            color: #fff;
            font-size: 24px;
        }
        .num {
            font-size: 14px;
        }
    }
}
</style>
