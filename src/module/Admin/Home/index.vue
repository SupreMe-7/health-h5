<template>
    <div class="admin">
        <div class="fun-content">
            <div
                v-for="(item, index) in funList"
                :key="index"
                class="fun-item"
                @click="toFun(item.url)"
            >
                <van-badge :content="item.num || null">
                    {{ item.label }}
                </van-badge>
            </div>
        </div>

        <TabBar type="admin" :nowKey="0"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';
import { Badge, Toast } from 'vant';
export default {
    data() {
        return {
            funList: [
                {
                    label: '医生注册审核',
                    url: '/admin/audit',
                    num: 5,
                },
                {
                    label: '用户管理',
                    url: '/admin/user-manage',
                },
                {
                    label: '机构管理',
                    url: '',
                },
                {
                    label: '推荐阅读管理',
                    url: '/admin/recommend-manage',
                },
                {
                    label: '系统消息管理',
                    url: '/admin/msg-manage',
                },
                {
                    label: '数据统计',
                    url: '/admin/data-statistics',
                },
            ],
        };
    },
    components: {
        TabBar,
        [Badge.name]: Badge,
    },
    mounted() {
        this.getAdminIdByToken();
        this.getAuditNum();
    },
    methods: {
        getAdminIdByToken() {
            return this.$api
                .get(`/qkys/api/admin/getAdminByToken`)
                .then(res => {
                    const { id } = res.data || {};
                    sessionStorage.setItem('adminId', id);
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getAuditNum() {
            this.$api
                .get(`/qkys/api/admin/getNewRegesiteNum`)
                .then(res => {
                    this.funList[0].num = res.data;
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
.admin {
    padding: 10px 20px;
    .fun-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .fun-item {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0 20px 0;
            width: 45%;
            height: 100px;
            background-color: #59a7e7;
            color: #fff;
            font-size: 24px;
        }
    }
}
</style>
