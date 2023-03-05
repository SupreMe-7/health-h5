<template>
    <div class="mine-page">
        <div class="mine-page-title">
            全科e管理
        </div>
        <div class="mine-page-content">
            <van-cell-group>
                <van-cell
                    title="退出登录"
                    size="large"
                    is-link
                    @click="logOut"
                    icon="revoke"
                />
            </van-cell-group>
        </div>
        <TabBar type="admin" :nowKey="1"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';
import { Cell, CellGroup, Badge, Dialog, Field } from 'vant';
import { jsBridge } from '@/common/util.js';
export default {
    data() {
        return {
            pId: null,
            version: {
                hasNewVersion: false,
            },
            cardNum: null,
            show: false,
        };
    },
    mounted() {},
    methods: {
        logOut() {
            jsBridge.logOut && jsBridge.logOut();
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push('/admin/login');
        },
        openUpdateModal() {
            if (this.version.hasNewVersion) {
                Dialog.confirm({
                    title: '检查更新',
                    message: `有新版本v${this.version.version} ${this.version.size} ${this.version.updateAppTime}`,
                    confirmButtonText: '下载',
                })
                    .then(() => {
                        window.open('https://qkys.zhugaotech.com/#/download');
                    })
                    .catch(() => {});
            } else {
                Dialog({ title: '检查更新', message: '已是最新版本' });
            }
        },
    },
    components: {
        TabBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Badge.name]: Badge,
        [Field.name]: Field,
        [Dialog.Component.name]: Dialog.Component,
    },
};
</script>

<style lang="less" scoped>
.mine-page {
    padding: 10px 8px;
    .mine-page-title {
        margin-bottom: 24px;
        font-size: 22px;
        text-align: center;
    }
    .mine-page-content {
        .item-btn {
            border-bottom: 1px solid #9e9e9e;
            padding: 10px 5px;
            font-size: 22px;
        }
    }
    .deleteDialog {
        .box {
            margin: 10px;
        }
    }
}
</style>
